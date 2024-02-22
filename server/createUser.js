'use strict';

const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const validator = require('@middy/validator');
const { transpileSchema } = require('@middy/validator/transpile');
const { authMiddleware, roleMiddleware } = require('./middlewares');
const { v4: uuidv4 } = require('uuid');

const requestSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 2 }
      }
    }
  }
}

const createUser = async (event) => {
  try {
    const body = event.body;

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const currentDate = new Date().getTime();
    const userId = uuidv4();

    await dynamoDB.transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.DYNAMODB_UNIQUES_TABLE,
            ConditionExpression: "attribute_not_exists(primary_key)",
            Item: {
              primary_key: body.email,
              search_key: userId,
              type: 'email',
            },
          },
        },
        {
          Put: {
            TableName: process.env.DYNAMODB_USERS_TABLE,
            ConditionExpression: "attribute_not_exists(primary_key)",
            Item: {
              primary_key: userId,
              email: body.email,
              username: body.username,
              role: body.role,
              createdAt: currentDate,
              updatedAt: currentDate,
              password: passwordHash,
              query_key: 'exist',
            },
          },
        },
      ]
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User is successfully created' }),
    };
  } catch (error) {
    const message = error.message && error.message.endsWith('[ConditionalCheckFailed, None]') && 'User email already exist';

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: message || error.message || 'Something wrong' }),
    };
  }
};

module.exports.createUser = middy()
  .use(httpJsonBodyParser())
  .use(validator({
    eventSchema: transpileSchema(requestSchema)
  }))
  .use(authMiddleware())
  .use(roleMiddleware())
  .handler(createUser);