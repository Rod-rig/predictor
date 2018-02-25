import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import * as React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#38003C',
    },
    secondary: {
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
