import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

function Header() {
  return (
    <AppBar position="sticky"  sx={{ backgroundColor: "#493628" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <FaTasks />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tasky
        </Typography>

        <Stack direction="row" spacing={2}>
        <Button color="inherit" component ={RouterLink} to= "/">
            Home
          </Button>   
          <Button color="inherit"  component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/signup">
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Header;