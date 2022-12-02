import { blue, green, pink, purple } from "@mui/material/colors";
const { createTheme } = require("@mui/material/styles");
// Or Create your Own theme:
export const theme = createTheme({
  palette: {
    primary: {
      main: pink[300],
    },
    secondary: {
      main: blue[200],
    },
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
});
