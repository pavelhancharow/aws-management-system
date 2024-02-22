import routes from '../shared/routes';

const searchValue = `${routes.auth.basename}/`;

const AuthPath = {
  Any: '*',
  Login: routes.auth.login.replace(searchValue, ''),
  Register: routes.auth.register.replace(searchValue, ''),
  Unauthorized: routes.auth.unauthorized.replace(searchValue, ''),
};

export default AuthPath