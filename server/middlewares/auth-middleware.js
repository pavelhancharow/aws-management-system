const jwt = require('jsonwebtoken');

module.exports = (options) => {
  return {
    before: async (handler) => {
      const { headers } = handler.event;

      if (!headers || !headers.authorization) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Unauthorized' }),
        };
      }

      const token = headers.authorization.split(' ')[1];

      try {
        handler.event.user = jwt.verify(token, 'SECRET_KEY');
      } catch (error) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Invalid token' }),
        };
      }
    },
  };
};