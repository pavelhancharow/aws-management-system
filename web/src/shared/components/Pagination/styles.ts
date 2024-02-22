import styled from 'styled-components';
import { FlexBoxContainer } from '../../styles';

export const PaginationWrapper = styled(FlexBoxContainer)`
  gap: 10px;
  align-items: center;
  
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: var(--darkBlueGray);
    background-color: var(--white);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }

    &.active {
      color: var(--white);
      background-color: var(--olympicBlue);
    }
  }
`;