'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const bcrypt = require('bcrypt');
const { generateAuthToken, getDataByPrimaryKey } = require('./helpers');

const loginUser = async (event) => {
  try {
    const body = event.body;

    if (!body.email) {
      throw { statusCode: 400, message: 'Missing user email' };
    }

    const uniqueParams = {
      TableName: process.env.DYNAMODB_UNIQUES_TABLE,
      Key: { primary_key: body.email },
      ProjectionExpression: 'primary_key, search_key'
    };

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const uniqueData = await getDataByPrimaryKey(uniqueParams, dynamoDB);

    const params = {
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Key: { primary_key: uniqueData.search_key },
      ExpressionAttributeNames: { '#role': 'role' },
      ProjectionExpression: 'primary_key, username, password, #role'
    };

    const currentUser = await getDataByPrimaryKey(params, dynamoDB);

    const { password, ...user} = currentUser;

    const isPasswordMatch = await bcrypt.compare(body.password, password);

    if (!isPasswordMatch) {
      throw { statusCode: 400, message: 'Incorrect password' };
    }

    const token = generateAuthToken(user.primary_key, user.role, user.username)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Authorization successful',
        access_token: token,
        userId: user.primary_key,
        role: user.role,
        username: user.username,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.loginUser = middy()
  .use(httpJsonBodyParser())
  .handler(loginUser);