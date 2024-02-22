import routes from '../../routes';
import { LogoCircle, LogoName, LogoNavLink, LogoSlogan } from './styles';

const Logo = () => {
  return (
    <LogoNavLink to={routes.app.users}>
      <LogoCircle />
      <LogoName>
        AWS Management
      </LogoName>
      <LogoSlogan>
        <span></span>
        <b>System</b>
        <span></span>
      </LogoSlogan>
    </LogoNavLink>
  )
};

export default Logo;