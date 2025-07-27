
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Alert,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Snackbar
} from '@mui/material'
import { Search, Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  dateUpdated: string;
  isDeleted: boolean;
  isCompleted: boolean;
  user?: {
    firstName: string;
    lastName: string;
    username: string;
    emailAddress: string;
  };
}

const TasksPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [snackbar, setSnackbar] = useState<{ 
    open: boolean; 
    message: string; 
    severity: "success" | "error" 
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  
  const { data: tasksData, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks");
      return res.data;
    },
  });

 
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSnackbar({ open: true, message: "Task deleted successfully", severity: "success" });
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to delete task", severity: "error" });
    },
  });

  
  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/complete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSnackbar({ open: true, message: "Task marked as complete", severity: "success" });
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to complete task", severity: "error" });
    },
  });

  
  const incompleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/incomplete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSnackbar({ open: true, message: "Task marked as incomplete", severity: "success" });
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to mark task as incomplete", severity: "error" });
    },
  });

  const tasks = tasksData?.tasks || [];

  
  useEffect(() => {
    let filtered = tasks.filter((task: Task) => !task.isDeleted);
    
    
    if (filter === 'complete') {
      filtered = filtered.filter((task: Task) => task.isCompleted);
    } else if (filter === 'incomplete') {
      filtered = filtered.filter((task: Task) => !task.isCompleted);
    }

    
    if (searchTerm) {
      filtered = filtered.filter((task: Task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  }, [searchTerm, tasks, filter]);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleComplete = (id: string) => {
    completeMutation.mutate(id);
  };

  const handleIncomplete = (id: string) => {
    incompleteMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    navigate(`/update/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  
  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={40} />
      </Box>
    )
  }

  
  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 3 }}>
            Error loading tasks
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Your Tasks
          </Typography>
          {tasks.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              {filteredTasks.length} of {tasks.length} tasks
            </Typography>
          )}
        </Box>

        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilter('all')}
            size="small"
          >
            All Tasks
          </Button>
          <Button
            variant={filter === 'complete' ? 'contained' : 'outlined'}
            onClick={() => setFilter('complete')}
            size="small"
            color="success"
          >
            Complete
          </Button>
          <Button
            variant={filter === 'incomplete' ? 'contained' : 'outlined'}
            onClick={() => setFilter('incomplete')}
            size="small"
            color="warning"
          >
            Incomplete
          </Button>
        </Box>

        {/* Search Field */}
        {/* <TextField
          fullWidth
          placeholder="Search tasks by title, description, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            mb: 4,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: 2
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        /> */}

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <Grid container spacing={3}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} lg={4} key={task.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Task Title */}
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {task.title}
                    </Typography>
                    
                    {/* Task Description */}
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {task.description.length > 100 
                        ? `${task.description.substring(0, 100)}...` 
                        : task.description
                      }
                    </Typography>
                    
                    {/* Status and Date Information */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={task.isCompleted ? 'Completed' : 'Incomplete'}
                        size="small"
                        color={task.isCompleted ? 'success' : 'warning'}
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Updated: {formatDate(task.dateUpdated)}
                      </Typography>
                    </Box>
                    
                    {/* Author Information */}
                    {task.user && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        By: {task.user.firstName} {task.user.lastName}
                      </Typography>
                    )}
                  </CardContent>
                  
                  {/* Action Buttons */}
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        startIcon={<Edit />}
                        onClick={() => handleEdit(task.id)}
                        variant="outlined"
                        size="small"
                      >
                        Edit
                      </Button>
                      <IconButton
                        onClick={() => handleDelete(task.id)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <IconButton
                      onClick={() => task.isCompleted ? handleIncomplete(task.id) : handleComplete(task.id)}
                      color={task.isCompleted ? 'warning' : 'success'}
                      size="small"
                      title={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.isCompleted ? <RadioButtonUnchecked /> : <CheckCircle />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Empty State */
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm ? 'No tasks found matching your search.' : 
               filter === 'complete' ? 'No completed tasks found.' :
               filter === 'incomplete' ? 'No incomplete tasks found.' :
               'No tasks found.'}
            </Typography>
            {!searchTerm && filter === 'all' && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first task to get started!
              </Typography>
            )}
            <Button
            sx={{
              background: "linear-gradient(to right, #dd5e89, #f7bb97)",
                boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',
            }}
              variant="contained"
              onClick={() => navigate('/new-task')}
            >
              Create New Task
            </Button>
          </Box>
        )}
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TasksPage

