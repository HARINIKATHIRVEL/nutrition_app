import React, { useState } from 'react';
import axios from 'axios';

function Analysis({ userId }) {
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { user_id: userId });
      setAnalysis(response.data);
    } catch (error) {
      setAnalysis({ message: 'Analysis failed' });
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl mb-4">Nutrition Analysis</h2>
      <button onClick={handleAnalyze} className="bg-blue-600 text-white p-2 rounded mb-4">Analyze</button>
      {analysis && (
        <div>
          <h3 className="text-lg mb-2">Deficiencies</h3>
          <ul className="list-disc pl-5">
            {Object.entries(analysis.deficiencies).map(([nutrient, status]) => (
              <li key={nutrient}>{nutrient}: {status}</li>
            ))}
          </ul>
          <h3 className="text-lg mb-2 mt-4">Recommendations</h3>
          <ul className="list-disc pl-5">
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Analysis;
