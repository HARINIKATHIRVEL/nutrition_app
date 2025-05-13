import React from 'react';
import IntakeForm from './components/IntakeForm';
import Analysis from './components/Analysis';

function App() {
  const userId = 1; // Use a default user ID if you’re not using login/register

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl">Nutrition Deficiency Predictor</h1>
      </nav>
      <div className="container mx-auto p-4">
        <IntakeForm userId={userId} />
        <Analysis userId={userId} />
      </div>
    </div>
  );
}

export default App;
