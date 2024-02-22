import styled from 'styled-components';

export const AddUserFormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  & > div {
    position: relative;
    display: flex;

    & > label {
      display: flex;
      align-items: center;
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
          left: 45px;
          display: inline-block;
          font-size: 15px;
          color: var(--danger);
        }
      }

      & span {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        background-color: var(--olympicBlue);
      }

      & input[type="password"],
      input[type="email"],
      input[type="text"] {
        width: inherit;
        padding: 10px;
        background-color: var(--titanWhite);
        color: var(--darkBlueGray);

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

      & select {
        padding: 10px;
        width: inherit;
        background-color: var(--titanWhite);
        color: var(--darkBlueGray);
      }
    }
  }
`;