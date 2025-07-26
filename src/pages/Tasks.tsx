import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

interface Task {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  dateUpdated: string;
  isDeleted: boolean;
  isCompleted: boolean;
}

function Tasks() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/${id}`, { isDeleted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/${id}`, { isCompleted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleComplete = (id: string) => {
    completeMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    navigate(`/update/${id}`);
  };

  if (isLoading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography color="error">Error loading tasks</Typography>;

  const activeTasks: Task[] =
    data?.tasks?.filter(
      (task: Task) => !task.isDeleted && !task.isCompleted
    ) || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4} color="primary">
        Your Active Tasks
      </Typography>

      {activeTasks.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {activeTasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                width: "100%",
                maxWidth: "320px",
                flex: "1 1 300px",
                borderLeft: "6px solid #1976d2",
                backgroundColor: "#f5faff",
              }}
              elevation={3}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#1976d2" }}
                  >
                    {task.title}
                  </Typography>
                  {task.isCompleted && (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {task.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 2 }}
                >
                  Created:{" "}
                  {task.dateCreated && !isNaN(Date.parse(task.dateCreated))
                    ? new Date(task.dateCreated).toLocaleString()
                    : "N/A"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  Updated:{" "}
                  {task.dateUpdated && !isNaN(Date.parse(task.dateUpdated))
                    ? new Date(task.dateUpdated).toLocaleString()
                    : "N/A"}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => handleEdit(task.id)}
                  disabled={task.isCompleted}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="success"
                  aria-label="complete"
                  onClick={() => handleComplete(task.id)}
                  disabled={task.isCompleted}
                >
                  <CheckCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No active tasks available.</Typography>
      )}
    </Box>
  );
}

export default Tasks;
