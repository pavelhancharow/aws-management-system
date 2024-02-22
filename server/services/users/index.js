const getUsersData = require('./get-users-data');
const UsersConstants = require('./constants');

module.exports = {
  getUsersData,
  ...UsersConstants,
}