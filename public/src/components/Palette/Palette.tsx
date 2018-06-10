import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import * as React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#1a0018',
      light: '#652d67',
      main: '#38003C',
    },
    secondary: {
      dark: '#af002a',
      light: '#ff577e',
      main: '#E90052',
    },
  },
});

const Palette = (props?: any) => (
  <MuiThemeProvider theme={theme}>
    {props.children}
  </MuiThemeProvider>
);

export default Palette;
