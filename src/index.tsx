import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    {/* <ThemeProvider theme={darkTheme}> */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
