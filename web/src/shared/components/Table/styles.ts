import styled, { css } from 'styled-components';
import { FlexBoxContainer } from '../../styles';

export const TableMain = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 9px 3px rgba(0,0,0,0.35);
`;

export const TBody = styled.div<{ center: string }>`
  scrollbar-color: var(--smokyWhiteDark) var(--smokyWhiteDark);
  scrollbar-width: thin;
  height: 450px;
  background-color: var(--white);
  overflow-y: scroll;

  ${(props) => props.center === 'true' && css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

export const THead = styled.div`
  background-color: var(--smokyWhiteDark);
  font-weight: bold;
`;

export const TR = styled.div<{hover?: string}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  margin: 10px 0;
  
  &:hover {
    ${(props) => props.hover && css`
      background-color: var(--titanWhite);
    `}
  }
`;

export const TH = styled.div<{ order?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: var(--smokyWhiteDark);
  
  &:not(:last-of-type) {
    border-right: 2px solid var(--brightGray);
  }
  
  & > button {
    position: relative;
    display: flex;
    
    &[data-active=true] {
      color: var(--olympicBlue);
      
      &::after {
        ${(props) => props.order === 'asc' ? 'content: "↑";' : 'content: "↓"'};        
        position: absolute;
        top: 0;
        right: -15px;
      }
    }
    
    &:disabled {
      color: var(--darkBlueGray);
      pointer-events: none;
    }
  }
  
  & > div {
    position: relative;
    display: flex;
    cursor: pointer;
  }
`;

export const TD = styled(FlexBoxContainer)`
  height: 100%;
  padding: 10px 20px;
  
  & > div {
    align-self: center;
    
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    text-overflow: ellipsis;
    overflow: hidden;

    & > button {
      color: var(--darkBlueGray);
      
      &:hover {
        color: var(--primaryColor)
      }
    }
  }

  &:not(:last-of-type) {
    border-right: 2px solid var(--brightGray);
  }
`;

export const PaginationBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--white);
  margin-top: 10px;
  box-shadow: 0 0 9px 3px rgba(0,0,0,0.35);
  border-radius: 15px;
`;

export const ToolBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--white);
`;

export const ButtonsContainer = styled.div`
  grid-column: 2 / 3;
  justify-self: flex-end;

  & > button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 8px;
    background-color: var(--olympicBlue);
    color: var(--white);
    opacity: 0.9;
  }
`;

export const InfoContainer = styled.div`
  grid-column: 1 / 2;
  display: inline-flex;
  gap: 20px;
`;

export const EmptyDataContent = styled.div`
  display: flex;
  position: relative;
  
  & > img {
    width: 450px;
    height: 450px;
    object-fit: contain;
  }
  
  & > span {
    position: absolute;
    bottom: 44%;
    left: 31%;
    background-color: var(--white);
    color: var(--olympicBlue);
    font-weight: bold;
  }
`;