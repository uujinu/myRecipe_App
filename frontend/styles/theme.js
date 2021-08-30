import { createTheme } from "@material-ui/core";
import { purple, orange, red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#fad5c4",
      dark: "#e2dcd8",
      contrastText: "#3e2723",
    },
    secondary: {
      light: "#fff9da",
      main: "#ffc6a8",
      dark: "#cb9579",
      contrastText: "#4e342e",
    },
    status: {
      error: orange,
      warning: red,
      info: purple,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 992,
        xl: 1500,
      },
    },
  },
});

export default theme;
