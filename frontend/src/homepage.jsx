// nutrition-app/frontend/src/Homepage.jsx
import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import './App.css'; // Reuse existing CSS for consistent styling

const Homepage = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #e8f5e9, #ffffff)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: '#2e7d32',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Discover Your Nutritional Health
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#616161',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Input your details to predict potential nutrient deficiencies and receive a personalized diet plan tailored to your needs.
            </Typography>
            <Button
              component={Link}
              to="/predict"
              variant="contained"
              sx={{
                py: 1.5,
                px: 4,
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Start Prediction
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f0e8 100%)',
                textAlign: 'center',
              }}
            >
              <img
                src="https://via.placeholder.com/400x300?text=Healthy+Food"
                alt="Healthy Food"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 4 }}
        >
          Why Choose Our Nutrition App?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h6" sx={{ color: '#4caf50', mb: 1 }}>
                Accurate Predictions
              </Typography>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                Our machine learning model analyzes your data to identify potential nutrient deficiencies with precision.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h6" sx={{ color: '#4caf50', mb: 1 }}>
                Personalized Diet Plans
              </Typography>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                Receive tailored dietary recommendations to address your specific nutritional needs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h6" sx={{ color: '#4caf50', mb: 1 }}>
                User-Friendly Interface
              </Typography>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                Easily input your details and view results in a clean, intuitive interface.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Homepage;
