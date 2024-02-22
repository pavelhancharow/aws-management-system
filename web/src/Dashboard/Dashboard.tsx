import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Tooltip from '../shared/components/Tooltip/Tooltip';
import { TooltipPropsIds } from '../shared/enums';
import { authActions } from '../shared/redux/auth/slice';
import { useAppDispatch } from '../shared/redux/store';
import routes from '../shared/routes';
import DashboardPath from './constants';
import FilesPage from './FilesPage/FilesPage';
import DashboardStyles from './styles';
import UsersPage from './UsersPage/UsersPage';
import { ReactComponent as LogoutIcon } from '../shared/assets/icons/logout-icon.svg';
import { Logo } from '../shared/components';

const {
  DashboardWrapper,
  DashboardNav,
  DashboardContainer,
  LogoutButton,
  DashboardNavContainer
} = DashboardStyles;

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <DashboardContainer>
      <DashboardNav>
        <Logo />

        <DashboardNavContainer>
          <NavLink to={routes.app.users}>Users Page</NavLink>
          <NavLink to={routes.app.files}>Files Page</NavLink>
          <LogoutButton
            onClick={() => dispatch(authActions.logout())}
            data-tooltip-id={TooltipPropsIds.NavLogoutButton}
            data-tooltip-content="Logout"
          >
            <LogoutIcon width={25} height={35} />
            <Tooltip id={TooltipPropsIds.NavLogoutButton} />
          </LogoutButton>
        </DashboardNavContainer>
      </DashboardNav>

      <DashboardWrapper>
        <Routes>
          <Route element={<Outlet />}>
            <Route path={DashboardPath.Users} element={<UsersPage />} />
            <Route path={DashboardPath.Files} element={<FilesPage />} />

            <Route path={DashboardPath.Any} element={<Navigate to={DashboardPath.Users} />} />
          </Route>
        </Routes>
      </DashboardWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;