

import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Card,
  CardMedia,
  Grid,
} from '@mui/material'

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
            mb: 8,
          }}
        >
          
          <Box sx={{ flex: 1, width: '100%' }}>
            <Card 
              sx={{ 
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image="/task_home.jpg"
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9) contrast(1.1)',
                }}
              />
            </Card>
          </Box>

         
          <Box sx={{ flex: 1, width: '100%' }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Welcome to TaskY
              </Typography>
              
              <Typography 
                variant="h5" 
                component="p" 
                sx={{ 
                  mb: 4, 
                  color: '#666',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Tasky ,Your smart companion for organizing, completing, and staying on top of what matters most.
              </Typography>

              
              <Box sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/signup"
                  sx={{ 
                    mr: 2,
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
                      boxShadow: '0 8px 25px rgba(234, 102, 232, 0.3)',
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/login"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    borderColor: '#667eea',
                    color: '#667eea',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#764ba2',
                      backgroundColor: 'rgba(102, 126, 234, 0.05)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              color: '#333',
              mb: 6
            }}
          >
            Why Choose Our Platform?
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: 320, 
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: 'orange',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Focus on What Matters
            </Typography>
            <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
              Stay organized and focused with our intuitive task management system.
            </Typography>
          </Paper>

          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: 320, 
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: 'orange',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Built for Real Productivity
            </Typography>
            <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
              Built for real productivity, Tasky helps you manage your tasks efficiently.
            </Typography>
          </Paper>

          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: 320, 
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: 'orange',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Flexible Task Status Control
            </Typography>
            <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
              With just a click, you can mark tasks as complete or bring them back if plans change
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default Home;