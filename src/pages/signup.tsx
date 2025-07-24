import {
  TextField,
  Container,
  Box,
  Button,
  Link,
  Typography,
  Paper,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";


interface RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  password: string;
}

function SignUp() {
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (registeredUser: RegisterUser) => {
      const response = await axiosInstance.post("/auth/register", registeredUser);
      return response.data;
    },
    onSuccess: () => {
      navigate("/login"); 
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message || "An error occurred");
      } else {
        setFormError("Something went wrong");
      }
    },
  });


  function handleSignUp() {
    setFormError(null);


    if (password !== confirmPass) {
      setFormError("Passwords do not match");
      return;
    }

    const registeredUser: RegisterUser = {
      firstName: firstname,
      lastName: lastname,
      username,
      emailAddress,
      password,
    };

    mutate(registeredUser);
  }

  return (
    <Box
      sx={{
        backgroundColor: "#E4E0E1",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Start Managing Tasks with Tasky 
        </Typography>

  
        {formError && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {formError}
          </Typography>
        )}

        <Paper sx={{ p: 5 }}>
          <Box component="form">
            <TextField
              fullWidth
              label="First Name"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              label="UserName"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 4, backgroundColor: "#AB886D", color: "white" }}
              onClick={handleSignUp}
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </Button>
          </Box>
        </Paper>

        <Box mt={2}>
          <Typography align="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" color="primary">
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;