import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/TaskBoard";

const customTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#fca311" },
      background: { default: mode === "dark" ? "#14213d" : "#e5e5e5", paper: mode === "dark" ? "#1e1e1e" : "#ffffff" },
      text: { primary: mode === "dark" ? "#ffffff" : "#000000" },
    },
    typography: { fontFamily: "Inter, sans-serif" },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, textTransform: "none", fontWeight: "bold" },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 8, padding: 16 },
        },
      },
    },
  });

const App = () => {
  const [mode, setMode] = useState("dark");
  const [openForm, setOpenForm] = useState(false);

  return (
    <ThemeProvider theme={customTheme(mode)}>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode} setOpenForm={setOpenForm} />
      <TaskBoard openForm={openForm} setOpenForm={setOpenForm} />
    </ThemeProvider>
  );
};

export default App;
