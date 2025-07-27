import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { useUserStore } from "../store/userStore";

function stringToInitials(name: string = "") {
  if (!name) return ""; 

  const words = name.trim().split(" ");
  const first = words[0]?.[0] || "";
  const second = words[1]?.[0] || "";

  return (first + second).toUpperCase();
}

function Header() {
  const { user, logout } = useUserStore();

  return (
    <AppBar position="sticky" sx={{ 
      
              background: "linear-gradient(115deg, #dd5e89, #f5622dff)",
      
      // backgroundColor: "#1976d2"
       }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <FaTasks />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user ? `Welcome, ${user.firstName}` : "Tasky"}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {user ? (
            <>
            <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button><Button color="inherit" component={RouterLink} to="/tasks">
                Tasks
              </Button>
              {/* <Button color="inherit" component={RouterLink} to="/new-task">
                New Task
              </Button> */}
              {/* <Button color="inherit" component={RouterLink} to="/update">
                Update
              </Button> */}
              {/* <Button color="inherit" component={RouterLink} to="/tasks/completed">
                Complete
              </Button> */}
              <Button color="inherit" component={RouterLink} to="/trash">
                Trash
              </Button>
              <IconButton component={RouterLink} to="/profile" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "#AB886D" }}>
                {stringToInitials(user?.firstName)}
                  </Avatar>
                   </IconButton>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
