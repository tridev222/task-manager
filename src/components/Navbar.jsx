import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { Brightness4, Brightness7, FilterList, Add } from "@mui/icons-material";

const Navbar = ({ mode, setMode, setOpenForm }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: mode === "dark" ? "#14213d" : "#fca311" }}>
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "lg", margin: "auto", width: "100%" }}>
        <IconButton color="inherit" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Task Manager
        </Typography>

        <Box>
          <IconButton color="inherit"><FilterList /></IconButton>
          <Button
            variant="contained"
            sx={{ ml: 2, backgroundColor: "#fca311", color: "#14213d", "&:hover": { backgroundColor: "#d68502" } }}
            startIcon={<Add />}
            onClick={() => setOpenForm(true)}
          >
            Add Task
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
