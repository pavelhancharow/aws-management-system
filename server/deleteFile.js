'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { getDataByPrimaryKey: isFileExist } = require('./helpers');
const { authMiddleware, roleMiddleware } = require('./middlewares');

const deleteFile = async (event) => {
  try {
    const query = event.queryStringParameters;

    if (!query.fileId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing file id' }),
      };
    }

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const s3 = new AWS.S3();

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: query.fileId,
    };

    const dbParams = {
      TableName: process.env.DYNAMODB_FILES_TABLE,
      Key: { primary_key: query.fileId },
    };

    await Promise.all([
      await s3.headObject(s3Params).promise(),
      await isFileExist(dbParams, dynamoDB, 'File not found'),
      await s3.deleteObject(s3Params).promise(),
      await dynamoDB.delete(dbParams).promise()
    ]);

    return {
      statusCode: 204,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.deleteFile = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(roleMiddleware())
  .handler(deleteFile);