import styled, { css } from 'styled-components';
import { FlexBoxContainer } from '../../styles';

export const TableFilterButtonWrap = styled(FlexBoxContainer)<{ open: boolean }>`
  position: relative;
  
  ${(props) => props.open && css`
    & > svg > path {
      stroke: var(--olympicBlue);
    }
  `}
`;

export const TableFilterModal = styled.div`
  position: absolute;
  top: 25px;
  right: -80px;
  display: flex;
  padding: 10px 15px;
  border-radius: 12px;
  box-shadow: 0 0 9px 4px rgba(0,0,0,0.35);
  background-color: var(--white);
`;