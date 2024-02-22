import styled from 'styled-components';

export const UnauthorizedWrapper = styled.div`
  position: relative;
  
  & > span {
    position: absolute;
    bottom: 22%;
    left: 15%;
    font-size: 1.3rem;
    
    & > a {
      color: #4F7AF6;
    }
  }
`;