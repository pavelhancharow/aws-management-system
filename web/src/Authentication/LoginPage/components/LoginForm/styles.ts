import styled, { keyframes } from 'styled-components';
import { globalColors } from '../../../../styles';
import { convertHexToRgb } from '../../../../shared/helpers';

const formBGOpacity = convertHexToRgb(globalColors.smokyWhiteDark, 1);
const formBG = convertHexToRgb(globalColors.smokyWhiteDark, 0.5);
const inputBG = convertHexToRgb(globalColors.olympicBlue, 0.25);
const inputBoxShadow = convertHexToRgb(globalColors.olympicBlue, 0.51);

const fadeInBtn = keyframes`
  0% { bottom: 0; opacity: 0; }
  50% { opacity: 1 }
  70% { bottom: -59px; background-color: ${formBGOpacity}; }
  100% { bottom: -59px;  background-color: ${formBG}; }
`;

const bgOpacity = keyframes`
  from { background-color: ${formBGOpacity}; }
  to { background-color: ${formBG}; }
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 105px 50px 45px;
  background-color: ${formBGOpacity};
  border-radius: 20px;
  box-shadow: 0 7px 25px 1px rgba(0,0,0,0.75);
  overflow: hidden;
  z-index: 10;
  animation: ${bgOpacity} .3s linear 1.3s forwards;
  
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
      input[type="email"] {
        width: inherit;
        padding: 10px;
        background-color: ${inputBG};
        color: var(--white);
        font-size: inherit;

        &::placeholder {
          color: var(--white);
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          -webkit-text-fill-color: var(--white) !important;
          -webkit-box-shadow: 0 0 0 30px ${inputBoxShadow} inset !important;
        }
      }
    }
  }
  
   input[type="reset"] {
     margin-top: 20px;
     margin-left: auto;
     cursor: pointer;
     background-color: transparent;
     font-style: italic;
     color: var(--darkBlueGray);
     transition: color 0.3s;

     &:hover {
       color: var(--olympicBlue);
     }
   }
  
  & ~ input[type="submit"] {
    position: absolute;
    bottom: -59px;
    left: 50%;
    color: var(--white);
    font-size: 1.2rem;
    text-transform: uppercase;
    transform: translateX(-50%);
    padding: 15px 50px 20px;
    width: 75%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow-y: auto;
    box-shadow: 0 7px 25px 1px rgba(0,0,0,0.75);
    cursor: pointer;
    letter-spacing: 5px;
    z-index: 5;
    background-color: ${formBG};
    animation: ${fadeInBtn} .8s linear .7s backwards;
    transition: all 0.3s;
    
    &:hover {
      background-color: ${inputBG};
    }
  }
`;

export const LoginFormSubmit = styled.input`
  
`