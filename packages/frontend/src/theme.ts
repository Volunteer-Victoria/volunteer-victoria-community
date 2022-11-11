import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#FAFAFA",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 34,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 8,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      fontStyle: "italic",
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 500,
      color: "#757575",
    },
  },
});
