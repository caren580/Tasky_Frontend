import { useState, useEffect } from 'react'
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
  Chip,
  Snackbar
} from '@mui/material'
import { Search, Restore, DeleteForever, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

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

/**
 * TrashPage Component
 * 
 * Manages the display and interaction with deleted tasks. Provides users
 * with the ability to review, restore, or permanently delete their tasks.
 * 
 * State Management:
 * - Uses React Query for deleted tasks data and operations
 * - Local state for search filtering and UI interactions
 * - Navigation state for returning to main tasks page
 */
const TrashPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  
  // Local state for search functionality
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [snackbar, setSnackbar] = useState<{ 
    open: boolean; 
    message: string; 
    severity: "success" | "error" 
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  /**
   * Fetch Deleted Tasks
   * 
   * Loads all deleted tasks when the component mounts
   */
  const { data: deletedTasksData, isLoading, error } = useQuery({
    queryKey: ["deletedTasks"],
    queryFn: async () => {
      console.log("Fetching deleted tasks..."); // Debug log
      const res = await axiosInstance.get("/tasks/deleted");
      console.log("Deleted tasks response:", res.data); // Debug log
      return res.data;
    },
    // Add these options to ensure fresh data
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Restore task mutation
  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/tasks/restore/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletedTasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSnackbar({ open: true, message: "Task restored successfully", severity: "success" });
    },
    onError: (error) => {
      console.error("Restore task error:", error);
      setSnackbar({ open: true, message: "Failed to restore task", severity: "error" });
    },
  });

  // Permanent delete mutation
  const permanentDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/tasks/permanent/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletedTasks"] });
      setSnackbar({ open: true, message: "Task permanently deleted", severity: "success" });
    },
    onError: (error) => {
      console.error("Permanent delete error:", error);
      setSnackbar({ open: true, message: "Failed to permanently delete task", severity: "error" });
    },
  });

  // Extract deleted tasks with better error handling
  const deletedTasks = deletedTasksData?.tasks || deletedTasksData || [];
  
  // Debug log to see what we're getting
  console.log("Deleted tasks data:", deletedTasksData);
  console.log("Extracted deleted tasks:", deletedTasks);

  /**
   * Effect: Filter Tasks Based on Search Term
   * 
   * Filters the deleted tasks based on the search term, searching across
   * title, description, and author information.
   */
  useEffect(() => {
    console.log("Filtering tasks. Search term:", searchTerm, "Tasks:", deletedTasks);
    
    if (searchTerm) {
      const filtered = deletedTasks.filter((task: Task) =>
        task.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTasks(filtered)
    } else {
      setFilteredTasks(deletedTasks)
    }
  }, [searchTerm, deletedTasks])

  /**
   * Handle Task Restoration
   * 
   * Restores a deleted task back to the active tasks list.
   * Shows success feedback and refreshes the deleted tasks list.
   * 
   * @param taskId - ID of the task to restore
   */
  const handleRestoreTask = async (taskId: string) => {
    console.log("Restoring task:", taskId);
    restoreMutation.mutate(taskId);
  }

  /**
   * Handle Permanent Deletion
   * 
   * Permanently deletes a task from the system. This action cannot be undone.
   * Shows confirmation dialog before proceeding.
   * 
   * @param taskId - ID of the task to permanently delete
   */
  const handlePermanentDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this task? This action cannot be undone.')) {
      console.log("Permanently deleting task:", taskId);
      permanentDeleteMutation.mutate(taskId);
    }
  }

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

  // Loading state display
  if (isLoading) {
    return (
      <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={40} />
        <Typography sx={{ ml: 2 }}>Loading deleted tasks...</Typography>
      </Box>
    )
  }

  // Error state display
  if (error) {
    console.error("Error loading deleted tasks:", error);
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 3 }}>
            Error loading deleted tasks: {error instanceof Error ? error.message : 'Unknown error'}
          </Alert>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              onClick={() => navigate('/tasks')} 
              startIcon={<ArrowBack />}
              variant="outlined"
              size="small"
            >
              Back to Tasks
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Trash
            </Typography>
          </Box>
          {deletedTasks.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              {filteredTasks.length} of {deletedTasks.length} deleted tasks
            </Typography>
          )}
        </Box>

        

        {/* Search Field */}
        <TextField
          fullWidth
          placeholder="Search deleted tasks by author, title, or description..."
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
        />

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
                    opacity: 0.8,
                    '&:hover': {
                      opacity: 1,
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description && task.description.length > 100 
                        ? `${task.description.substring(0, 100)}...` 
                        : task.description || 'No description'
                      }
                    </Typography>
                    
                    {/* Status and Date Information */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={task.isCompleted ? 'Was Completed' : 'Was Incomplete'}
                        size="small"
                        color={task.isCompleted ? 'success' : 'warning'}
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Deleted: {formatDate(task.dateUpdated)}
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
                    <Button
                      startIcon={<Restore />}
                      onClick={() => handleRestoreTask(task.id)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      disabled={restoreMutation.isPending}
                    >
                      {restoreMutation.isPending ? 'Restoring...' : 'Restore'}
                    </Button>
                    <Button
                      startIcon={<DeleteForever />}
                      onClick={() => handlePermanentDelete(task.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={permanentDeleteMutation.isPending}
                    >
                      {permanentDeleteMutation.isPending ? 'Deleting...' : 'Delete Forever'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Empty State */
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm ? 'No deleted tasks found matching your search.' : 'No deleted tasks found.'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/tasks')}
              startIcon={<ArrowBack />}
            >
              Back to Tasks
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

export default TrashPage