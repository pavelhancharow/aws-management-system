import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import UnauthorizedPage from './UnauthorizedPage/UnauthorizedPage';
import AuthPath from './constants';
import AuthenticationStyles from './styles';

const { AuthenticationWrapper } = AuthenticationStyles;

const Authentication = () => {
  return (
    <AuthenticationWrapper>
        <Routes>
          <Route element={<Outlet />}>
            <Route path={AuthPath.Login} element={<LoginPage />} />
            <Route path={AuthPath.Unauthorized} element={<UnauthorizedPage />} />

            <Route path={AuthPath.Any} element={<Navigate to={AuthPath.Login} />} />
          </Route>
        </Routes>
    </AuthenticationWrapper>
  );
};

export default Authentication;