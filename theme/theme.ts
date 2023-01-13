import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#1b2330",
      default: "#0d1218",
    },
    primary: {
      main: "rgba(2, 106, 167, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgba(78, 151, 194, 1)",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["Rajdhani", "sans-serif"].join(","),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1,
      color: "#fff",
    },
    h2: {
      letterSpacing: "-.025em",
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      color: "#fff",
    },
    h3: {
      color: "#fff",
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.75,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#d1d5db",
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#9CA3AF",
    },
  },
});

export default responsiveFontSizes(theme);
