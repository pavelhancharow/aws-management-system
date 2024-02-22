const getFilesData = require('./get-files-data');
const FilesConstants = require('./constants');

module.exports = {
  getFilesData,
  ...FilesConstants,
}