import styled from 'styled-components';

export const FileVersionsBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const FileVersionsItem = styled.div`
  display: grid;
  grid-template-columns: 2% 52% 30% 4%;
  gap: 4%;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 85%
  }
`;