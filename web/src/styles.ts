import { createGlobalStyle } from 'styled-components';
import MontserratItalicVariableFont from './shared/assets/fonts/Montserrat-Italic-VariableFont_wght.ttf';
import MontserratVariableFont from './shared/assets/fonts/Montserrat-VariableFont_wght.ttf';

export const globalColors = {
  mainPurple: '#9B608E',
  smokyWhiteDark: '#F2F2F2',
  white: '#FFFFFF',
  darkBlueGray: '#444549',
  carolinaBlue: '#56A5D2',
  raisinBlack: '#212121',
  danger: '#F44336',
  silver: '#C0C0C0',
  brightGray: '#E8E9EB',
  olympicBlue: '#5899E2',
  titanWhite: '#E9F0FD'
};

export default createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url(${MontserratVariableFont}) format('truetype');
  }
  
  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: normal;
    font-display: swap;
    src: url(${MontserratItalicVariableFont}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: bold;
    font-display: swap;
    src: url(${MontserratVariableFont}) format('truetype');
  }
  
  :root {
    --primaryColor: ${globalColors.mainPurple};
    --white: ${globalColors.white};
    --smokyWhiteDark: ${globalColors.smokyWhiteDark};
    --darkBlueGray: ${globalColors.darkBlueGray};
    --carolinaBlue: ${globalColors.carolinaBlue};
    --raisinBlack: ${globalColors.raisinBlack};
    --danger: ${globalColors.danger};
    --silver: ${globalColors.silver};
    --brightGray: ${globalColors.brightGray};
    --olympicBlue: ${globalColors.olympicBlue};
    --titanWhite: ${globalColors.titanWhite};
    
    --primaryFont: 'Montserrat', sans-serif;
    --primarySize: 16px;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--primaryFont);
    font-weight: normal;
    font-style: normal;
    font-size: var(--primarySize);
    color: var(--darkBlueGray);
    background-color: var(--white);
    background-image: linear-gradient(315deg, var(--white) 0%, var(--olympicBlue) 74%);
  }

  input {
    :focus {
      outline: none;
    }
  }
  
  button {
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
    line-height: inherit;
  }

  input,
  select {
    outline: none;
    border: none;
  }

  input::placeholder {
    font-size: inherit;
    line-height: inherit;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &[aria-disabled="true"] {
      pointer-events: none;
    }
  }
  
  a,
  input,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`;