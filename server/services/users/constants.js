const UsersTableIndexNames = {
  username: 'QueryKeyUsernameIndex',
  role: 'QueryKeyRoleIndex',
  email: 'QueryKeyEmailIndex',
  createdAt: 'QueryKeyCreatedAtIndex',
  default: 'QueryKeyCreatedAtIndex'
};

const UsersTableQuerySearchParams = {
  TableName: process.env.DYNAMODB_USERS_TABLE,

  /* default attributes */
  ExpressionAttributeNames: { '#role': 'role' }, /* specify reserve name */
  ProjectionExpression: 'primary_key, username, email, #role, createdAt, updatedAt', /* attributes */

  /* default search */
  KeyConditionExpression: `query_key = :hashKey`,
  ExpressionAttributeValues: { ':hashKey': 'exist' },
  IndexName: UsersTableIndexNames.createdAt,
};

const UsersConstants = {
  UsersTableIndexNames,
  UsersTableQuerySearchParams
}

module.exports = UsersConstants;