/**
 * Retrieves an item from DynamoDB.
 * @param {Object} params - Parameters for fetching the item.
 * @param {AWS.DynamoDB.DocumentClient} dynamoDB - DynamoDB DocumentClient instance.
 * @param {string} [errorMessage='User not found'] - Custom error message if the item is not found.
 * @returns {Object} Retrieved item from DynamoDB.
 * @throws {Object} If the item is not found, it throws an error.
 */
module.exports = async (params, dynamoDB, errorMessage = 'User not found') => {
  const data = await dynamoDB.get(params).promise();

  if (!data || !data.Item) {
    throw {
      statusCode: 404,
      message: errorMessage,
    };
  }

  return data.Item;
}