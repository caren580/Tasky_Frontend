import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
} from "@mui/material";
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
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: task,
    isLoading,
    error,
  } = useQuery<Task>({
    queryKey: ["task", id], // This ensures a new query when id changes
    queryFn: async () => {
      const res = await axiosInstance.get(`/tasks/${id}`);
      return res.data.task;
    },
    enabled: !!id,
    // Add these options to ensure fresh data
    staleTime: 0, // Data is immediately stale
    refetchOnMount: true, // Always refetch when component mounts
  });

  // Reset form and messages when id changes
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
    setTitle("");
    setDescription("");
  }, [id]);

  // Update form fields when task data is loaded
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: Partial<Task>) => {
      await axiosInstance.patch(`/tasks/${id}`, updatedTask);
    },
    onSuccess: () => {
      // Invalidate both the specific task and the tasks list
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => navigate("/tasks"), 1000);
    },
    onError: () => {
      setErrorMessage("Failed to update task.");
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.patch(`/tasks/${id}`, {
        isCompleted: !task?.isCompleted,
      });
    },
    onSuccess: () => {
      // Invalidate both the specific task and the tasks list
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks");
    },
    onError: () => {
      setErrorMessage("Failed to update task status.");
    },
  });

  if (isLoading) return <Typography>Loading task...</Typography>;
  if (error || !task)
    return <Typography color="error">Error loading task.</Typography>;

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Update Task: {task.title}
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Typography variant="body2" sx={{ mb: 2, color: "gray" }}>
        Task ID: {task.id} <br />
        Created: {new Date(task.dateCreated).toLocaleString()} <br />
        Last Updated: {new Date(task.dateUpdated).toLocaleString()}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          key={`title-${id}`} // Force re-render when id changes
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          key={`description-${id}`} // Force re-render when id changes
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
            {updateTaskMutation.isPending ? "Updating..." : "Update Task"}
          </Button>
          <Button
            variant="outlined"
            color={task.isCompleted ? "warning" : "success"}
            onClick={() => toggleCompletionMutation.mutate()}
            disabled={toggleCompletionMutation.isPending}
          >
            {task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UpdateTask;
