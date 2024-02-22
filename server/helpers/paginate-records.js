/**
 * Paginates an array of records.
 * @param {Array} records - The array of records to paginate.
 * @param {number} countOfRecords - The total count of records.
 * @param {number} [page=1] - The current page number.
 * @param {number} [pageSize=25] - The number of records per page.
 * @returns {Object} Pagination information and the paginated records.
 */
module.exports = (records, countOfRecords, page = 1, pageSize = 25) => {
  if (countOfRecords === 0) {
    return { pagination: { page: 1, pages: 1 }, Items: [] };
  }

  const pages = Math.ceil(countOfRecords / pageSize);

  const endIndex = page * pageSize
  const startIndex = endIndex - pageSize;

  const _records = [];

  let iterator = startIndex;

  while(iterator < endIndex && iterator < countOfRecords) {
    _records.push(records[iterator]);
    iterator += 1;
  }

  return {
    pagination: {
      page,
      pages,
      totalCount: countOfRecords,
      startCount: startIndex + 1,
      endCount: iterator
    },
    Items: _records
  };
};