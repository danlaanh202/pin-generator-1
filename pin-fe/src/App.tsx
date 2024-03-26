import "./styles/app.scss";
import Routing from "./routes/Routing";
import { ThemeProvider, createTheme } from "@mui/material";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(0, 0, 0, 0.87)",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
};

export default App;
