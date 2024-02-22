import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LogoNavLink = styled(NavLink)`
  position: relative;
  grid-column: 1 / 2;
  width: 200px;
  display: flex;
  color: var(--olympicBlue);
`

export const LogoCircle = styled.span`
  position: absolute;
  top: 50%;
  left: 7px;
  width: 65px;
  height: 65px;
  border: 2px solid var(--olympicBlue);
  border-radius: 50%;
  transform: translateY(-50%);
`;

export const LogoName = styled.span`
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  z-index: 1;
  background-color: var(--white);
`;
export const LogoSlogan = styled.span`
  position: absolute;
  top: 5px;
  left: 50%;
  width: max-content;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  transform: translateX(-50%);
  background-color: var(--white);
  
  & > span {
    display: inline-block;
    height: 1px;
    width: 34px;
    background-color: var(--olympicBlue);
  }
  
  & > b {
    display: inline-block;
    font-weight: normal;
    text-transform: uppercase;
    padding-left: 2px;
    letter-spacing: 6px;
    margin-right: -4px;
  }
`;