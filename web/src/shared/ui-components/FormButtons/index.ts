import styled from 'styled-components';
import { FlexBoxContainer } from '../../styles';

export const FormButtons = styled(FlexBoxContainer)`
  gap: 5%;

  input[type="submit"],
  input[type="reset"] {
    width: 100%;
    margin-left: auto;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
  }

  input[type="submit"] {
    background-color: var(--olympicBlue);
    color: var(--white);
  }

  input[type="reset"] {
    background-color: var(--smokyWhiteDark);
    color: var(--olympicBlue);
  }
`