import styled from 'styled-components';

export const PaginationInfoWrapper = styled.div`
  & span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
    &.totalCount {
      width: fit-content;
    }

    &.currentCount {
      width: fit-content;
    }
  }
`;