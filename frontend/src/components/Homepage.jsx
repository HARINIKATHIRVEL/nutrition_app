import React, { useState } from 'react';

const Homepage = () => {
  // States for input fields
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState(null);
  const [symptoms, setSymptoms] = useState([]);

  // List of available symptoms
  const availableSymptoms = [
    "Fatigue",
    "Hair Loss",
    "Muscle Weakness",
    "Shortness of Breath",
    "Dry Skin",
    "Headache",
    "Dizziness",
    "Nausea",
    "Unexplained Weight Loss",
  ];

  // Function to calculate BMI
  const calculateBmi = () => {
    if (weight && height && age >= 10 && age <= 15) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi(null);
    }
  };

  // Handle input changes
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleHeightChange = (e) => setHeight(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);

  // Function to handle symptom selection
  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSymptoms([...symptoms, value]);
    } else {
      setSymptoms(symptoms.filter((symptom) => symptom !== value));
    }
  };

  return (
    <div className="homepage">
      <h1>Nutrition & Health Tracker</h1>

      <div className="form-container">
        {/* Age input */}
        <label>
          Age (10-15 years):
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter age"
          />
        </label>

        {/* Weight input */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter weight"
          />
        </label>

        {/* Height input */}
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            placeholder="Enter height"
          />
        </label>

        {/* BMI Calculation Button */}
        <button onClick={calculateBmi}>Calculate BMI</button>

        {/* Display BMI */}
        {bmi && <h2>Your BMI is: {bmi}</h2>}
        {age && (age < 10 || age > 15) && (
          <p className="error-message">BMI calculation is only available for ages 10-15 years.</p>
        )}

        {/* Symptoms Selection */}
        {age >= 10 && age <= 15 && (
          <div className="symptoms">
            <h3>Select Symptoms</h3>
            {availableSymptoms.map((symptom) => (
              <label key={symptom}>
                <input
                  type="checkbox"
                  value={symptom}
                  onChange={handleSymptomChange}
                />
                {symptom}
              </label>
            ))}
          </div>
        )}

        {/* Display Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="selected-symptoms">
            <h4>Selected Symptoms:</h4>
            <ul>
              {symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;

