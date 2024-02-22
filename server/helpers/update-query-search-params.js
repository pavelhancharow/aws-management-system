const reservedNamesData = {
  role: '#role',
};

/**
 * Updates query search parameters based on provided query details and index names.
 * @param {object} query - Query details (orderBy, order, searchBy, searchValue).
 * @param {object} queryParams - Parameters for the query search to modify.
 * @param {object} IndexNames - Mapping of index names for different search criteria.
 * @returns {object} Updated query search parameters.
 */
module.exports = (query, queryParams, IndexNames) => {
  const _queryParams = { ...queryParams };
  const { orderBy, order, searchBy, searchValue } = query

  /* order and direction */
  _queryParams.IndexName = IndexNames[orderBy] || IndexNames.default;
  _queryParams.ScanIndexForward = order !== 'desc';

  /* sort by column and value  */
  const rangeKey = searchValue;

  if (!IndexNames[searchBy] || !rangeKey) return _queryParams;

  if (!orderBy) {
    _queryParams.IndexName = IndexNames[searchBy];
  }

  if (_queryParams.IndexName === IndexNames[searchBy]) {
    _queryParams.KeyConditionExpression += ` and begins_with(${reservedNamesData[searchBy] || searchBy}, :rangeKey)`;
  } else {
    _queryParams.FilterExpression = `begins_with(${reservedNamesData[searchBy] || searchBy}, :rangeKey)`;
  }

  _queryParams.ExpressionAttributeValues[":rangeKey"] = rangeKey;

  return _queryParams;
};