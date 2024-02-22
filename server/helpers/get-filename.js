/**
 * Extracts the filename from metadata.
 * @param {string} metadataValue - String containing file metadata.
 * @returns {string} The extracted filename.
 */
module.exports = (metadataValue) => {
  const matchedValues = metadataValue.match(/filename="([^"]+)"/);

  return matchedValues ? matchedValues[1] : 'unknown';
};