const FilesTableIndexNames = {
  filename: 'QueryKeyFilenameIndex',
  fileType: 'QueryKeyFileTypeIndex',
  username: 'QueryKeyUsernameIndex',
  updatedAt: 'QueryKeyUpdatedAtIndex',
  default: 'QueryKeyUpdatedAtIndex'
};

const FilesTableQuerySearchParams = {
  TableName: process.env.DYNAMODB_FILES_TABLE,

  /* default attributes */
  ProjectionExpression: 'primary_key, filename, fileType, versionId, username, updatedAt, versions', /* attributes */

  /* default search */
  KeyConditionExpression: `query_key = :hashKey`,
  ExpressionAttributeValues: { ':hashKey': 'exist' },
  IndexName: FilesTableIndexNames.updatedAt,
};

const FilesConstants = {
  FilesTableIndexNames,
  FilesTableQuerySearchParams
}

module.exports = FilesConstants;