import React, { useState } from 'react';

function App() {
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async () => {
    // Sample data to send to the backend
    const data = {
      age: 25,
      food_intake: "Rice, Lentils, Vegetables",  // Example food intake
      symptoms: "Fatigue, Pale skin"  // Example symptoms
    };

    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setPrediction(result);  // Set the prediction result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Nutrition Deficiency Prediction</h1>
      <button onClick={handleSubmit}>Get Prediction</button>

      {prediction && (
        <div>
          <h2>Prediction Result:</h2>
          <p>Deficiency: {prediction.deficiency}</p>
          <p>Recommendation: {prediction.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
