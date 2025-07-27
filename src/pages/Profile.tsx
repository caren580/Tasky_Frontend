import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, CameraAlt } from "@mui/icons-material";
import { useUserStore } from "../store/userStore";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.emailAddress,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async () => {
    try {
      const res = await axiosInstance.patch("/user", formData);
      setUser(res.data.updatedUser);
      setSuccess("Profile updated successfully");
      setError("");
    } catch (err) {
      setError("Failed to update profile");
      setSuccess("");
    }
  };

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axiosInstance.patch("/user/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setSuccess("Password updated successfully.");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError("Incorrect current password or failed to update.");
    }
  };

  const handleLogout = async () => {
    await axiosInstance.get("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <Box maxWidth={600} mx="auto" px={2} py={4}>
      <Stack alignItems="center" spacing={2}>
        <Box position="relative">
          <Avatar
            sx={{ width: 100, height: 100, fontSize: 36 }}
            src={user?.avatarUrl || undefined}
          >
            {!user?.avatarUrl && `${user?.firstName?.[0] || "U"}${user?.lastName?.[0] || ""}`}
          </Avatar>
          <IconButton
            color="primary"
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            component="label"
          >
            <CameraAlt />
            <input hidden accept="image/*" type="file" />
          </IconButton>
        </Box>

        <Typography variant="h5">Update Profile</Typography>

        {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
        {success && <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>}

        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} fullWidth />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} fullWidth />
        <TextField label="Username" name="username" value={formData.username} onChange={handleInputChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
        <Button 
        sx={{background: "linear-gradient(to right, #dd5e89, #f7bb97)",
                boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',}}
        variant="contained" 
        onClick={handleUpdateInfo}
         fullWidth>Update Info</Button>

        <Typography variant="h5" mt={4}>Update Password</Typography>

        <TextField
          label="Current Password"
          name="currentPassword"
          type={showPassword.current ? "text" : "password"}
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}>
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="New Password"
          name="newPassword"
          type={showPassword.new ? "text" : "password"}
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}>
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm New Password"
          name="confirmPassword"
          type={showPassword.confirm ? "text" : "password"}
          value={passwords.confirmPassword}
          onChange={handlePasswordChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}>
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button 
        sx={{background: "linear-gradient(to right, #dd5e89, #f7bb97)",
                boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',}}
        variant="contained" 
        onClick={handleUpdatePassword} 
        fullWidth>Update Password</Button>

        <Button onClick={handleLogout} color="error" fullWidth sx={{ mt: 2 }}>Logout</Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
