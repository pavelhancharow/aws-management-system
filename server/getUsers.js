'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { paginateRecords, updateQuerySearchParams } = require('./helpers');
const { authMiddleware } = require('./middlewares');
const { getUsersData, UsersTableIndexNames, UsersTableQuerySearchParams } = require('./services/users');

const getUsers = async (event) => {
  try {
    const query = event.queryStringParameters;

    const defaultSearchParams = { ...UsersTableQuerySearchParams };

    const querySearchParams = updateQuerySearchParams(query, defaultSearchParams, UsersTableIndexNames)

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const scannedData = await dynamoDB.query(querySearchParams).promise();

    const queriedData = paginateRecords(scannedData.Items, scannedData.Count, +query.page, +query.limit);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...queriedData.pagination,
        items: queriedData.Items.map(getUsersData),
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.getUsers = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .handler(getUsers);
