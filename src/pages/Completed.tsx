import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  dateCreated: string;
  dateUpdated: string;
}

function CompletedTasks() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks");
      return res.data.tasks.filter(
        (task: Task) => task.isCompleted && !task.isDeleted
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/${id}`, { isDeleted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completedTasks"] });
    },
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Failed to load tasks.</Typography>;

  if (!data || data.length === 0) {
    return <Typography>No completed tasks yet.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Completed Tasks
      </Typography>

      <Stack spacing={2}>
        {data.map((task: Task) => (
          <Card key={task.id} variant="outlined">
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {task.description}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/tasks/${task.id}/update`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default CompletedTasks;
