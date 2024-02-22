import styled from 'styled-components';

export const TableSearchSection = styled.label`
    display: flex;
    align-items: center;
    width: 200px;
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
        left: 45px;
        display: inline-block;
        font-size: 15px;
        color: var(--danger);
      }
    }

    & button {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 10px;
      background-color: var(--olympicBlue);
    }
  
    input[type="text"] {
      width: 100%;
      padding: 10px;
      background-color: var(--titanWhite);
      color: var(--darkBlueGray);
      font-weight: normal;

      &::placeholder {
        color: var(--darkBlueGray);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-text-fill-color: var(--darkBlueGray) !important;
      }
    }
`;