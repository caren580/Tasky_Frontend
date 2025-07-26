import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, TextField, Typography, Button, Stack, Alert } from "@mui/material";
import axiosInstance from "../api/axios";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  dateCreated: string;
  dateUpdated: string;
}

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tasks/${id}`);
      return res.data.task;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: Partial<Task>) => {
      await axiosInstance.patch(`/tasks/${id}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    },
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.patch(`/tasks/${id}`, {
        isCompleted: !data?.isCompleted,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks");
    },
  });

  if (isLoading) return <Typography>Loading task...</Typography>;
  if (error || !data) return <Typography color="error">Error loading task.</Typography>;

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Update Task
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              updateTaskMutation.mutate({ title, description })
            }
            disabled={updateTaskMutation.isPending}
          >
            Update Task
          </Button>
          <Button
            variant="outlined"
            color={data.isCompleted ? "warning" : "success"}
            onClick={() => toggleCompleteMutation.mutate()}
          >
            {data.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UpdateTask;
