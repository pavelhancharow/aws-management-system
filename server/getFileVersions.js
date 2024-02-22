'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const { format } = require('date-fns');
const { authMiddleware } = require('./middlewares');
const { getFilename } = require('./helpers');

const getFileVersions = async (event) => {
  try {
    const query = event.queryStringParameters;

    const s3 = new AWS.S3();

    const fileVersions = await s3.listObjectVersions({
      Bucket: process.env.S3_BUCKET,
      Prefix: query.fileId
    }).promise();

    let versions = []

    if (fileVersions.Versions) {
      versions = await Promise.all(fileVersions.Versions
        .filter((file) => !file.IsLatest)
        .map(async ({ VersionId }) => {
          const fileMetadata = await s3.headObject({
            Bucket: process.env.S3_BUCKET,
            Key: query.fileId,
            VersionId }
          ).promise();

          return {
            versionId: fileMetadata.VersionId,
            filename: getFilename(fileMetadata.Metadata['content-disposition']),
            lastModified: format(new Date(fileMetadata.LastModified), "yyyy-MM-dd HH:mm"),
          }
        })
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify(versions),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message || 'Something wrong' }),
    };
  }
};

module.exports.getFileVersions = middy()
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .handler(getFileVersions);