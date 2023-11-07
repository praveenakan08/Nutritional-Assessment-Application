import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      background: {
        paper: "#fff",
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
      },
      action: {
        active: "#001E3C",
      },
    },
    typography: {
        fontFamily: ["tinos"].join(","),
        fontSize: 15,
        button: {
          textTransform: "none",
        },
      },
  });

  export {theme};