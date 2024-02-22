'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware, roleMiddleware } = require('./middlewares');
const { v4: uuidv4 } = require('uuid');
const parser = require('lambda-multipart-parser');

const addFile = async (req) => {
  try {
    const query = req.queryStringParameters;
    const body = await parser.parse(req);

    if (!body.files.length) {
      throw { statusCode: 404, message: 'File not found' };
    }

    const fileData = body.files[0];
    const currentDate = new Date().getTime();
    const fileId = uuidv4();

    const s3 = new AWS.S3();
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileId,
      Body: fileData.content,
      Metadata: {
        'content-type': `${query.fileMime}`,
        'content-disposition': `attachment; filename="${fileData.filename}"`
      }
    };

    const dbParams = {
      TableName: process.env.DYNAMODB_FILES_TABLE,
      Item: {
        primary_key: fileId,
        createdAt: currentDate,
        updatedAt: currentDate,
        filename: fileData.filename,
        fileType: query.fileType,
        userId: req.user.userId,
        username: req.user.userName,
        versionId: '-',
        versions: false,
        query_key: 'exist',
      },
      ConditionExpression: 'attribute_not_exists(primary_key)',
    };

    const [uploadResult] = await Promise.all([
      await s3.putObject(s3Params).promise(),
      await dynamoDB.put(dbParams).promise()
    ]);

    const updatedParams = {
      TableName: process.env.DYNAMODB_FILES_TABLE,
      Key: { primary_key: fileId },
      UpdateExpression: "set versionId = :versionId",
      ExpressionAttributeValues: { ":versionId": uploadResult?.VersionId || '-' }
    };

    await dynamoDB.update(updatedParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'File is successfully added' }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.addFile = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(roleMiddleware())
  .handler(addFile);