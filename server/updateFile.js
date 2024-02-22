'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware, roleMiddleware } = require('./middlewares');
const parser = require('lambda-multipart-parser');

const updateFile = async (req) => {
  try {
    const query = req.queryStringParameters;
    const body = await parser.parse(req);

    if (!body.files.length) {
      throw { statusCode: 404, message: 'File not found' };
    }

    const fileData = body.files[0];
    const currentDate = new Date().getTime();

    const s3 = new AWS.S3();
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: query.fileId,
      Body: fileData.content,
      Metadata: {
        'content-type': `${query.fileMime}`,
        'content-disposition': `attachment; filename="${fileData.filename}"`
      }
    };

    const dbParams = {
      TableName: process.env.DYNAMODB_FILES_TABLE,
      Key: { primary_key: query.fileId },
    };

    const updateParams = {
      ...dbParams,
      UpdateExpression: "set updatedAt = :updateAt, filename = :filename, fileType = :fileType, userId = :userId, username = :username",
      ExpressionAttributeValues: {
        ":updateAt": currentDate,
        ":filename": fileData.filename,
        ":fileType": query.fileType,
        ":userId": req.user.userId,
        ":username": req.user.userName,
      }
    };

    const [uploadResult, fileUpdateResult] = await Promise.all([
      await s3.upload(s3Params).promise(),
      await dynamoDB.update(updateParams).promise()
    ]);

    updateParams.UpdateExpression = 'set versionId = :versionId, versions = :versions';
    updateParams.ExpressionAttributeValues = {
      ":versionId": uploadResult?.VersionId || '-',
      ":versions": Boolean(uploadResult?.VersionId)
    };

    await dynamoDB.update(updateParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File is successfully updated' }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.updateFile = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(roleMiddleware())
  .handler(updateFile);