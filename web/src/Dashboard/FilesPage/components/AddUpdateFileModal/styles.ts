import styled from 'styled-components';

export const AddUpdateFileForm = styled.form`
  display: flex;
  flex-direction: column;

  & > div {
    position: relative;
    display: flex;

    & > label {
      display: grid;
      grid-template-columns: 15% 1fr;
      width: 100%;
      margin-bottom: 25px;
      border: 1px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s;

      &.danger {
        border-color: var(--danger);

        &::after {
          content: attr(data-error);
          position: absolute;
          bottom: 3px;
          left: calc(15% + 10px);
          display: inline-block;
          font-size: 15px;
          color: var(--danger);
        }
      }

      & span {
        grid-column: 1 / 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 10px;
        background-color: var(--olympicBlue);
        cursor: pointer;
      }

      & div {
        grid-column: 2 / 3;
        width: inherit;
        padding: 10px;
        color: var(--darkBlueGray);
        background-color: var(--titanWhite);
      }

      & input[type="file"] {
        display: none;
      }
    }
  }
`;