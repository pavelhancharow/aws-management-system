import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Authentication from '../Authentication/Authentication';
import Dashboard from '../Dashboard/Dashboard';
import { ProtectedRoute } from '../shared/components';
import { authActions } from '../shared/redux/auth/slice';
import { useAppDispatch } from '../shared/redux/store';
import routes from '../shared/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './styles';

function  App() {
  const dispatch = useAppDispatch();
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const auth_user = localStorage.getItem('auth_user');

    if (auth_user && JSON.parse(auth_user)?.access_token) {
      dispatch(authActions.setCredentials(JSON.parse(auth_user)));

      const path = location.pathname === routes.basename || location.pathname.includes(routes.auth.basename)
        ? routes.app.users
        : location.pathname;

      navigate(path);
    } else {
      navigate(routes.auth.login);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppContainer>
        <Routes>
          <Route path={`${routes.auth.basename}/*`} element={<Authentication />} />

          <Route element={<ProtectedRoute />}>
            <Route path={`${routes.app.basename}/*`} element={<Dashboard />} />
          </Route>
        </Routes>
      </AppContainer>
      <ToastContainer />
    </>
  );
}

export default App;
