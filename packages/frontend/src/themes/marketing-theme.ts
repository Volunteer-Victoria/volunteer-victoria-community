import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { baseTheme } from "./base-theme";

export const marketingTheme = responsiveFontSizes(
  createTheme(baseTheme, {
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      allVariants: {
        color: "rgba(55, 71, 79, 1)",
      },
      h1: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 64,
        lineHeight: 1.22,
      },
      h2: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 48,
        lineHeight: 1.22,
      },
      h3: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 36,
        lineHeight: 1.22,
      },
      h4: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 1.22,
      },
      h5: {
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1.22,
      },
      body1: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 36,
        lineHeight: 1.22,
      },
      body2: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 30,
        lineHeight: 1.22,
      },
      subtitle1: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 26,
        lineHeight: 1.22,
      },
      subtitle2: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 22,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: 20,
            lineHeight: 1.2,
            margin: 0,
            padding: "8px 18px",
            [baseTheme.breakpoints.up("md")]: {
              padding: "14px 26px",
            },
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
          },
          outlined: {
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            textDecorationColor: "#294493",
          },
        },
      },
    },
  } as ThemeOptions),
  {
    factor: 4,
  }
);
