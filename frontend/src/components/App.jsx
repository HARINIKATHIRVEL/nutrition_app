import { useState } from 'react';
import axios from 'axios';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [deficiencies, setDeficiencies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const allSymptoms = ['Fatigue', 'Hair Loss', 'Pale Skin', 'Weakness', 'Dizziness', 'Delayed Growth'];

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const calculateBMI = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Fallback to localhost if env var not set
      const res = await axios.post(`${apiUrl}/api/calculate_bmi`, {
        height,
        weight,
        gender,
        age,
        symptoms
      });
      setBmi(res.data.bmi);
      setCategory(res.data.category);
      setDeficiencies(res.data.deficiencies);
      setRecommendations(res.data.recommendations);
    } catch (error) {
      console.error('Error calculating BMI or analyzing symptoms:', error);
    }
  };

  if (!showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100">
        <img src="/cartoon-welcome.png" alt="Cartoon" className="w-64 mb-6" />
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Nutrition Tracker!</h1>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={() => setShowForm(true)}
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">BMI Calculator & Health Form</h2>

        <input
          type="number"
          placeholder="Age (10–15)"
          className="w-full mb-3 p-2 border rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="10"
          max="15"
        />
        <select
          className="w-full mb-3 p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Height (cm)"
          className="w-full mb-3 p-2 border rounded"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          className="w-full mb-3 p-2 border rounded"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <div className="mb-4">
          <p className="font-semibold mb-2">Select Symptoms:</p>
          {allSymptoms.map((symptom) => (
            <label key={symptom} className="block mb-1">
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
                className="mr-2"
              />
              {symptom}
            </label>
          ))}
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={calculateBMI}
        >
          Analyze
        </button>

        {bmi && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">BMI: {bmi.toFixed(1)}</p>
            <p className="text-blue-700">Category: {category}</p>
            {deficiencies.length > 0 && (
              <p className="mt-2 text-red-600 font-semibold">Deficiencies: {deficiencies.join(', ')}</p>
            )}
            {recommendations.length > 0 && (
              <p className="mt-1 text-green-600">Recommended Food: {recommendations.join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
