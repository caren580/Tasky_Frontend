import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface NewTaskData {
  title: string;
  description: string;
}

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  }
    }, [successMessage]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (taskData: NewTaskData) => {
      const res = await axiosInstance.post("/tasks", taskData);
      return res.data;
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setSuccessMessage("Task created successfully!"); 
      setFormError(null); 
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); 
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    mutate({ title, description });
  }

  return (
    <Box sx={{ backgroundColor: "#F6F6F6", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Create New Task
        </Typography>
        {successMessage && (
        <Typography color="success.main" align="center">
        {successMessage}
          </Typography>
         )}

        <Paper sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            {formError && (
              <Typography color="error" align="center">
                {formError}
              </Typography>
            )}

            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3,
                 background: "linear-gradient(to right, #dd5e89, #f7bb97)",
                boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',
                  color: "white" }}
              disabled={isPending}
            >
              {isPending ? "Creating Task..." : "Create Task"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default NewTask;
