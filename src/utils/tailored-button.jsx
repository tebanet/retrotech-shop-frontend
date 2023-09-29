import { createTheme, useTheme } from "@mui/material/styles";
import { Button, ThemeProvider } from "@mui/material";

const buttonTheme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans Condensed", sans-serif',
  },
  palette: {
    primary: {
      main: "#ecf8f9",
    },
    secondary: {
      main: "#068da9",
    },
    error: {
      main: "#7e1717",
    },
    warning: {
      main: "#e55807",
    },
  },
});

export const TailoredButton = ({ children }) => {
  const theme = useTheme();
  return (
    <Button
      style={{
        width: "25%",
        backgroundColor: "#068da9",
        fontSize: "16px",
        color: "#FFFFFF",
        padding: theme.spacing(1.5, 4),
        textTransform: "none",
        borderRadius: "9999px",
        transition: "background-color 0.3s", // Transition effect for hover
        "&:hover": {
          backgroundColor: "#999999", // Hover background color
        },
      }}
    >
      {children}
    </Button>
  );
};

<ThemeProvider theme={buttonTheme}>
  <TailoredButton />
</ThemeProvider>;
