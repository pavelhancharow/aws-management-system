module.exports = (options) => {
  return {
    before: async (handler) => {
      const { user } = handler.event;

      if (user && user.userRole !== 'admin') {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: 'You do not have access to this action' }),
        };
      }
    },
  };
};