import {
  Paper,
  TextField,
  Container,
  Box,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useUserStore } from "../store/userStore";

interface LoginDetails {
  identifier: string;
  password: string;
}

function LogIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {  login } = useUserStore();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("/auth/login", loginDetails);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("login response", data);
      login(data);
      navigate("/");
    },
    onError: (err: any) => {
      if (err.response?.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
  });

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    mutate({ identifier, password });
  }

  return (
    <Box sx={{ backgroundColor: "#E4E0E1", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Login to Your Tasky Account
        </Typography>

        <Paper sx={{ p: 5, flex: 1 }}>
          <Box component="form" onSubmit={handleLogin}>
            {formError && (
              <Typography color="error" align="center">
                {formError}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              margin="normal"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 4, backgroundColor: "#AB886D", color: "white" }}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Log in"}
            </Button>
          </Box>
        </Paper>

        <Box>
          <Typography>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              color="primary"
              underline="hover"
              variant="body1"
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LogIn;