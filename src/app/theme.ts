import { createTheme } from "@mui/material/styles";

const PRIMARY_MAIN = "#02316a";
const PRIMARY_LIGHT = "#415a99";
const PRIMARY_DARK = "#00093f";
const PRIMARY_CONTRAST_TEXT = "#fff";

const theme = createTheme({
  palette: {
    primary: {
      light: PRIMARY_LIGHT,
      main: PRIMARY_MAIN,
      dark: PRIMARY_DARK,
      contrastText: PRIMARY_CONTRAST_TEXT,
    },
    secondary: {
      light: PRIMARY_CONTRAST_TEXT,
      main: PRIMARY_CONTRAST_TEXT,
      dark: PRIMARY_CONTRAST_TEXT,
      contrastText: PRIMARY_MAIN,
    },
    background: {
      default: "#EDF8F8",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: PRIMARY_MAIN,
        },
      },
    },
  },
});

export default theme;
