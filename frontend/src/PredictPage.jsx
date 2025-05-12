import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Paper,
} from '@mui/material';

const PredictPage = () => {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [symptoms, setSymptoms] = useState({
    fatigue: false,
    hairLoss: false,
    paleSkin: false,
    dizziness: false,
    muscleCramps: false,
    brittleNails: false,
    slowHealing: false,
  });

  const calculateBMI = () => {
    if (weight && height) {
      const h = height / 100;
      const result = (weight / (h * h)).toFixed(2);
      setBmi(result);
    }
  };

  const handleSymptomChange = (event) => {
    setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    calculateBMI();
    // TODO: Send data to backend API
    console.log({ gender, weight, height, bmi, symptoms });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Nutrition Prediction Form
        </Typography>

        {/* Gender Selection */}
        <Box mb={3}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Box>

        {/* Weight and Height */}
        <Box mb={3}>
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
          />
        </Box>

        {/* Symptoms */}
        <Box mb={3}>
          <FormLabel component="legend">Symptoms (select all that apply)</FormLabel>
          <FormGroup>
            {Object.keys(symptoms).map((symptomKey) => (
              <FormControlLabel
                key={symptomKey}
                control={
                  <Checkbox
                    checked={symptoms[symptomKey]}
                    onChange={handleSymptomChange}
                    name={symptomKey}
                  />
                }
                label={symptomKey
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ mt: 2, px: 4 }}
        >
          Analyze
        </Button>

        {/* BMI Display */}
        {bmi && (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Calculated BMI: <strong>{bmi}</strong>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default PredictPage;
