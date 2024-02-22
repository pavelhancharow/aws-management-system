import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authUserSelector } from '../../redux/auth/selector';
import routes from '../../routes';

const ProtectedRoute = () => {
  const authUser = useSelector(authUserSelector);
  const location = useLocation();

  return (
    !authUser?.access_token
      ? <Navigate to={routes.auth.unauthorized} state={{ from: location }} replace />
      : <Outlet />
  );
}
export default ProtectedRoute