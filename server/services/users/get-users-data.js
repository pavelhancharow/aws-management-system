const { format } = require('date-fns');

module.exports = (user) => ({
    userId: user.primary_key,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: format(new Date(user.createdAt), "yyyy-MM-dd HH:mm"),
    updatedAt: format(new Date(user.updatedAt), "yyyy-MM-dd HH:mm"),
});