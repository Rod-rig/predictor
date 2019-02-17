import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f2f2f2",
    },
    primary: {
      dark: "#1a0018",
      light: "#652d67",
      main: "#38003C",
    },
    secondary: {
      dark: "#af002a",
      light: "#ff577e",
      main: "#E90052",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export const Palette = (props?: any) => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);
