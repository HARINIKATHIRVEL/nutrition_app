import React, { useState } from 'react';

export default function HomePage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [gender, setGender] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Nutrition Tracker</h1>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>

        {/* BMI Display */}
        <button
          onClick={calculateBMI}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-4 text-center text-lg font-semibold text-green-700">
            Your BMI: {bmi}
          </div>
        )}
      </div>
    </div>
  );
}
