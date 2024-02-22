import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity: 0; bottom: -500px}
  100% { opacity: 1; bottom: 0 }
`;

export const LoginPageWrapper = styled.div`
  position: relative;
  bottom: -500px;
  display: flex;
  opacity: 0;
  animation: ${fadeIn} 1.3s linear .1s forwards;
  
  & > .radius {
    position: absolute;
    top: -65px;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    background-color: var(--olympicBlue);
    border-radius: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    z-index: 15;
  }
`;