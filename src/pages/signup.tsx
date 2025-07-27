// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   InputAdornment,
//   FormControlLabel,
//   Checkbox,
//   Link,
//   Container,
//   Grid,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Lock,
//   Person,
//   ArrowForward,
// } from '@mui/icons-material';
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "../api/axios";
// import axios from "axios";

// interface RegisterUser {
//   firstName: string;
//   lastName: string;
//   username: string;
//   emailAddress: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPass, setConfirmPass] = useState("");
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [formError, setFormError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const { isPending, mutate } = useMutation({
//     mutationKey: ["register-user"],
//     mutationFn: async (registeredUser: RegisterUser) => {
//       const response = await axiosInstance.post("/auth/register", registeredUser);
//       return response.data;
//     },
//     onSuccess: () => {
//       navigate("/login"); 
//     },
//     onError: (err) => {
//       if (axios.isAxiosError(err)) {
//         setFormError(err.response?.data.message || "An error occurred");
//       } else {
//         setFormError("Something went wrong");
//       }
//     },
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name === 'firstName') setFirstName(value);
//     else if (name === 'lastName') setLastName(value);
//     else if (name === 'username') setUsername(value);
//     else if (name === 'emailAddress') setEmailAddress(value);
//     else if (name === 'password') setPassword(value);
//     else if (name === 'confirmPassword') setConfirmPass(value);
//     else if (name === 'agreeToTerms') setAgreeToTerms(checked);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(null);

//     if (password !== confirmPass) {
//       setFormError("Passwords do not match");
//       return;
//     }

//     if (!agreeToTerms) {
//       setFormError("Please agree to the terms and conditions");
//       return;
//     }

//     const registeredUser: RegisterUser = {
//       firstName: firstname,
//       lastName: lastname,
//       username,
//       emailAddress,
//       password,
//     };

//     mutate(registeredUser);
//   };

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleToggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const passwordsMatch = password === confirmPass && confirmPass !== '';

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: 'white',
//         py: 8,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <Container maxWidth="sm">
//         <Box sx={{ textAlign: 'center', mb: 6 }}>
//           <Typography
//             variant="h2"
//             component="h1"
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               background: "linear-gradient(135deg, #dd5e89, #f7bb97)",
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//               fontSize: { xs: '2.5rem', md: '3rem' }
//             }}
//           >
//             Join Us Today
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               color: '#666',
//               fontWeight: 300,
//               mb: 4
//             }}
//           >
//             Create your account and start your journey
//           </Typography>
//         </Box>

//         <Card
//           sx={{
//             borderRadius: 4,
//             boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
//             border: '1px solid #e0e0e0',
//             overflow: 'hidden',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
//             }
//           }}
//         >
//           <CardContent sx={{ p: 6 }}>
//             <Box component="form" onSubmit={handleSubmit}>
//               {formError && (
//                 <Box
//                   sx={{
//                     p: 2,
//                     mb: 3,
//                     borderRadius: 2,
//                     backgroundColor: '#ffebee',
//                     border: '1px solid #ffcdd2'
//                   }}
//                 >
//                   <Typography 
//                     color="error" 
//                     align="center"
//                     sx={{ fontSize: '0.95rem' }}
//                   >
//                     {formError}
//                   </Typography>
//                 </Box>
//               )}
//               {/* Name Fields */}
//               <Grid container spacing={2} sx={{ mb: 3 }}>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="First Name"
//                     name="firstName"
//                     value={firstname}
//                     onChange={handleInputChange}
//                     required
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 3,
//                         transition: 'all 0.3s ease',
//                         '&:hover fieldset': {
//                           borderColor: '#dd5e89',
//                         },
//                         '&.Mui-focused fieldset': {
//                           borderColor: '#dd5e89',
//                         },
//                       },
//                       '& .MuiInputLabel-root.Mui-focused': {
//                         color: '#dd5e89',
//                       },
//                     }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Person sx={{ color: '#757575' }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Last Name"
//                     name="lastName"
//                     value={lastname}
//                     onChange={handleInputChange}
//                     required
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 3,
//                         transition: 'all 0.3s ease',
//                         '&:hover fieldset': {
//                           borderColor: '#dd5e89',
//                         },
//                         '&.Mui-focused fieldset': {
//                           borderColor: '#dd5e89',
//                         },
//                       },
//                       '& .MuiInputLabel-root.Mui-focused': {
//                         color: '#dd5e89',
//                       },
//                     }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Person sx={{ color: '#757575' }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//               </Grid>

//               {/* Username */}
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 value={username}
//                 onChange={handleInputChange}
//                 required
//                 sx={{
//                   mb: 3,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease',
//                     '&:hover fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#dd5e89',
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person sx={{ color: '#757575' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Email */}
//               <TextField
//                 fullWidth
//                 label="Email address"
//                 name="emailAddress"
//                 type="email"
//                 value={emailAddress}
//                 onChange={handleInputChange}
//                 required
//                 sx={{
//                   mb: 3,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease',
//                     '&:hover fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#dd5e89',
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Email sx={{ color: '#757575' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Password */}
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={handleInputChange}
//                 required
//                 sx={{
//                   mb: 3,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease',
//                     '&:hover fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#dd5e89',
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock sx={{ color: '#757575' }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleTogglePasswordVisibility}
//                         edge="end"
//                         sx={{
//                           color: '#757575',
//                           '&:hover': { color: '#dd5e89' },
//                         }}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Confirm Password */}
//               <TextField
//                 fullWidth
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPass}
//                 onChange={handleInputChange}
//                 required
//                 error={confirmPass !== '' && !passwordsMatch}
//                 helperText={
//                   confirmPass !== '' && !passwordsMatch
//                     ? 'Passwords do not match'
//                     : ''
//                 }
//                 sx={{
//                   mb: 4,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease',
//                     '&:hover fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#dd5e89',
//                     },
//                   },
//                   '& .MuiInputLabel-root.Mui-focused': {
//                     color: '#dd5e89',
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock sx={{ color: '#757575' }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleToggleConfirmPasswordVisibility}
//                         edge="end"
//                         sx={{
//                           color: '#757575',
//                           '&:hover': { color: '#dd5e89' },
//                         }}
//                       >
//                         {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Terms and Conditions */}
//               <Box sx={{ mb: 4 }}>
//                 <FormControlLabel
//                   control={
//                   <Checkbox
//                       name="agreeToTerms"
//                       checked={agreeToTerms}
//                       onChange={handleInputChange}
//                       required
//                       sx={{
//                         color: '#dd5e89',
//                         '&.Mui-checked': {
//                           color: '#dd5e89',
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <Typography variant="body2" sx={{ color: '#666' }}>
//                       I agree to the{' '}
//                       <Link
//                         href="#"
//                         sx={{
//                           color: '#dd5e89',
//                           textDecoration: 'none',
//                           fontWeight: 600,
//                           '&:hover': { textDecoration: 'underline' },
//                         }}
//                       >
//                         Terms of Service
//                       </Link>{' '}
//                       and{' '}
//                       <Link
//                         href="#"
//                         sx={{
//                           color: '#dd5e89',
//                           textDecoration: 'none',
//                           fontWeight: 600,
//                           '&:hover': { textDecoration: 'underline' },
//                         }}
//                       >
//                         Privacy Policy
//                       </Link>
//                     </Typography>
//                   }
//                 />
//               </Box>

//               {/* Signup Button */}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 disabled={!passwordsMatch || !agreeToTerms || isPending}
//                 sx={{
//                   py: 1.5,
//                   px: 4,
//                   borderRadius: 3,
//                   background: "linear-gradient(to right, #dd5e89, #f7bb97)",
//                   boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',
//                   textTransform: 'none',
//                   fontSize: '1.1rem',
//                   fontWeight: 600,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 12px 35px rgba(234, 102, 232, 0.4)',
//                   },
//                   '&:disabled': {
//                     background: '#ccc',
//                     transform: 'none',
//                     boxShadow: 'none',
//                   }
//                 }}
//                 endIcon={<ArrowForward />}
//               >
//                 {isPending ? "Creating Account..." : "Create Account"}
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Login link */}
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Typography sx={{ color: '#666' }}>
//             Already have an account?{' '}
//             <Link
//               component={RouterLink}
//               to="/login"
//               sx={{
//                 color: '#dd5e89',
//                 textDecoration: 'none',
//                 fontWeight: 600,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   textDecoration: 'underline',
//                   color: '#f7bb97'
//                 }
//               }}
//             >
//               Sign In
//             </Link>
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };
// export default SignupPage;

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  Container,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  ArrowForward,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
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

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setLastName(value);
    else if (name === 'username') setUsername(value);
    else if (name === 'emailAddress') setEmailAddress(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPass(value);
    else if (name === 'agreeToTerms') setAgreeToTerms(checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPass) {
      setFormError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setFormError("Please agree to the terms and conditions");
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
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordsMatch = password === confirmPass && confirmPass !== '';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
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
            Join Us Today
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              fontWeight: 300,
              mb: 4
            }}
          >
            Create your account and start your journey
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            }
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Box component="form" onSubmit={handleSubmit}>
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

              {/* Name Fields - Using Flexbox */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={firstname}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover fieldset': {
                        borderColor: '#dd5e89',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dd5e89',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#dd5e89',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#757575' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={lastname}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover fieldset': {
                        borderColor: '#dd5e89',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#dd5e89',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#dd5e89',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#757575' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Username */}
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={handleInputChange}
                required
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
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#dd5e89',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email address"
                name="emailAddress"
                type="email"
                value={emailAddress}
                onChange={handleInputChange}
                required
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
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#dd5e89',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange}
                required
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
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#dd5e89',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: '#757575',
                          '&:hover': { color: '#dd5e89' },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPass}
                onChange={handleInputChange}
                required
                error={confirmPass !== '' && !passwordsMatch}
                helperText={
                  confirmPass !== '' && !passwordsMatch
                    ? 'Passwords do not match'
                    : ''
                }
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
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#dd5e89',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#757575' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        sx={{
                          color: '#757575',
                          '&:hover': { color: '#dd5e89' },
                        }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Terms and Conditions */}
              <Box sx={{ mb: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeToTerms"
                      checked={agreeToTerms}
                      onChange={handleInputChange}
                      required
                      sx={{
                        color: '#dd5e89',
                        '&.Mui-checked': {
                          color: '#dd5e89',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      I agree to the{' '}
                      <Link
                        href="#"
                        sx={{
                          color: '#dd5e89',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="#"
                        sx={{
                          color: '#dd5e89',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Box>

              {/* Signup Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!passwordsMatch || !agreeToTerms || isPending}
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
                endIcon={<ArrowForward />}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Login link */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography sx={{ color: '#666' }}>
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
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
              Sign In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupPage;