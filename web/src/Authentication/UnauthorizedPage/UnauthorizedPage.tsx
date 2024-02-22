import { NavLink } from 'react-router-dom';
import routes from '../../shared/routes';
import UnauthorizedPNG from '../../shared/assets/images/unauthorized.png';
import { UnauthorizedWrapper } from './styles';

const UnauthorizedPage = () => {
  return (
    <UnauthorizedWrapper>
      <img src={UnauthorizedPNG} height={500} alt="Unauthorized :("/>

      <span>
        <NavLink to={routes.auth.login}>Login</NavLink> to gain access
      </span>
    </UnauthorizedWrapper>
  );
};

export default UnauthorizedPage;