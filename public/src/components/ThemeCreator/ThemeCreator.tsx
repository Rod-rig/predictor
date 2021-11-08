import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";

const theme = createTheme({
  overrides: {
    MuiAvatar: {
      img: {
        objectFit: "contain",
      },
      root: {
        borderRadius: 0,
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: 0,
      },
    },
  },
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
});

export const ThemeCreator = (props?: any) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
