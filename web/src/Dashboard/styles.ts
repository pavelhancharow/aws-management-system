import styled from 'styled-components';
import { FlexBoxCenterContainer, FlexColumnContainer } from '../shared/styles';

const DashboardContainer = styled(FlexColumnContainer)`
  width: 100%;
`;

const DashboardWrapper = styled(FlexBoxCenterContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 150px 100px 240px;
`;

const DashboardNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;
  padding-right: 50px;
  color: var(--darkBlueGray);
  background-color: var(--white);
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
  z-index: 100
`;

const DashboardNavContainer = styled.div`
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  a.active {
    color: var(--olympicBlue);
  }
`;

const LogoutButton = styled.button`
  display: flex;
`;

const DashboardStyles = {
  DashboardContainer,
  DashboardWrapper,
  DashboardNav,
  LogoutButton,
  DashboardNavContainer
}

export default DashboardStyles;
