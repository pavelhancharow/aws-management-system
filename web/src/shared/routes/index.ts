const routes = {
  basename: '/',
  auth: {
    basename: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    unauthorized: '/auth/unauthorized',
  },
  app: {
    basename: '/app',
    users: '/app/users',
    files: '/app/files',
  },
};

export default routes;
