import React from 'react';
import { Container, Typography } from '@mui/material';

const PredictPage = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" color="primary">
        Prediction Page
      </Typography>
      <Typography variant="body1">
        This is where your BMI calculator and nutrition prediction logic will go.
      </Typography>
    </Container>
  );
};

export default PredictPage;
