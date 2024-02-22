import styled from 'styled-components';

export const ClearButtonWrap = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: max-content;
  height: 40px;
  padding: 0 15px;
  color: var(--olympicBlue);
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
`