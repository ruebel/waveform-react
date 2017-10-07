import { injectGlobal } from 'styled-components';

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 12px;
  }
  body {
    font-size: 12px;
    font-family: monospace;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
