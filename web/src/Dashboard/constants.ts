import routes from '../shared/routes';

const searchValue = `${routes.app.basename}/`;

const DashboardPath = {
  Any: '*',
  Users: routes.app.users.replace(searchValue, ''),
  Files: routes.app.files.replace(searchValue, ''),
};

export default DashboardPath;