const jwt = require('jsonwebtoken');

/**
 * Generates a JWT with user information.
 * @param {string} userId - User ID.
 * @param {string} userRole - User role.
 * @param {string} userName - User name.
 * @returns {string} JWT token.
 */
module.exports = (userId, userRole, userName) => {
  return jwt.sign(
    { userId, userRole, userName },
    'SECRET_KEY',
    { expiresIn: '1h' }
  );
};