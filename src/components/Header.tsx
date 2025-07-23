import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { FaTasks } from "react-icons/fa";

function Header() {
  return (
    <AppBar position="sticky"  sx={{ backgroundColor: "#211C84" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <FaTasks />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tasky
        </Typography>

        {/* NavLinks */}
        <Stack direction="row" spacing={2}>
        <Button color="inherit" href="https://github.com">
            Home
          </Button>   
          <Button color="inherit" href="https://github.com">
            Login
          </Button>
          <Button color="inherit" href="https://github.com">
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Header;