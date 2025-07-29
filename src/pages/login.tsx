
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
  const { login } = useUserStore();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post(`/auth/login`, loginDetails);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("login response", data);
      login(data.user);
      navigate("/tasks");
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
    <Box 
      sx={{ 
        minHeight: "100vh", 
        backgroundColor: "white",
        py: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #dd5e89, #f7bb97)",
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              fontWeight: 300,
              mb: 4
            }}
          >
            Sign in to your account to continue
          </Typography>
        </Box>

        <Paper 
          sx={{ 
            p: 6,
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            }
          }}
        >
          <Box component="form" onSubmit={handleLogin}>
            {formError && (
              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2'
                }}
              >
                <Typography 
                  color="error" 
                  align="center"
                  sx={{ fontSize: '0.95rem' }}
                >
                  {formError}
                </Typography>
              </Box>
            )}
            
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              margin="normal"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#dd5e89',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd5e89',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#dd5e89',
                }
              }}
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
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#dd5e89',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#dd5e89',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#dd5e89',
                }
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isPending}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 3,
                background: "linear-gradient(to right, #dd5e89, #f7bb97)",
                boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(234, 102, 232, 0.4)',
                },
                '&:disabled': {
                  background: '#ccc',
                  transform: 'none',
                  boxShadow: 'none',
                }
              }}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography sx={{ color: '#666' }}>
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                color: '#dd5e89',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#f7bb97'
                }
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LogIn;
