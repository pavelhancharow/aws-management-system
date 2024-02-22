'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { getDataByPrimaryKey: isUserExist } = require('./helpers');
const { authMiddleware, roleMiddleware } = require('./middlewares');

const deleteUser = async (req) => {
  try {
    const query = req.queryStringParameters;

    if (!query.userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing user ID' }),
      };
    }

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Key: { primary_key: query.userId },
    };

    const user = await isUserExist(params, dynamoDB);

    await dynamoDB.transactWrite({
      TransactItems: [
        {
          Delete: {
            TableName: process.env.DYNAMODB_UNIQUES_TABLE,
            Key: { primary_key: user.email },
          },
        },
        {
          Delete: {
            TableName: process.env.DYNAMODB_USERS_TABLE,
            Key: { primary_key: query.userId },
          },
        },
      ]
    }).promise();

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

module.exports.deleteUser = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(roleMiddleware())
  .handler(deleteUser);