'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware } = require('./middlewares');
const { getDataByPrimaryKey } = require('./helpers');

const downloadFile = async (event) => {
  try {
    const query = event.queryStringParameters;

    if (!query.fileId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing file id' }),
      };
    }

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: query.fileId,
    };

    const dbParams = {
      TableName: process.env.DYNAMODB_FILES_TABLE,
      Key: { primary_key: query.fileId },
    };

    if (query.fileVersionId) {
      s3Params.VersionId = query.fileVersionId;
    }

    const s3 = new AWS.S3();
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const [fileMetadata, fileFromS3] = await Promise.all([
      await s3.headObject(s3Params).promise(),
      await s3.getObject(s3Params).promise(),
      await getDataByPrimaryKey(dbParams, dynamoDB, 'File not found'),
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': fileMetadata.Metadata['content-type'],
        'Content-Disposition': fileMetadata.Metadata['content-disposition'],
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
      body: fileFromS3.Body.toString("base64"),
      isBase64Encoded: true,
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.downloadFile = middy({ streamifyResponse: false })
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .handler(downloadFile);