'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { authMiddleware } = require('./middlewares');
const { getFilesData, FilesTableIndexNames, FilesTableQuerySearchParams } = require('./services/files');
const { updateQuerySearchParams, paginateRecords } = require('./helpers');

const getFiles = async (event) => {
  try {
    const query = event.queryStringParameters;

    const defaultSearchParams = { ...FilesTableQuerySearchParams };

    const querySearchParams = updateQuerySearchParams(query, defaultSearchParams, FilesTableIndexNames)

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const scannedData = await dynamoDB.query(querySearchParams).promise();

    const queriedData = paginateRecords(scannedData.Items, scannedData.Count, +query.page, +query.limit);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...queriedData.pagination,
        items: queriedData.Items.map(getFilesData),
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.getFiles = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .handler(getFiles);