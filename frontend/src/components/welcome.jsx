import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center justify-center text-center px-4">
      <img src="/welcome.png" alt="Welcome" className="w-96 mb-8 rounded-2xl shadow-lg" />
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">Welcome to NutriTrack!</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Track your nutrition, analyze symptoms, calculate BMI (for 10-15 yrs), and get smart food suggestions with our AI-powered tool.
      </p>
      <Link to="/homepage">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default WelcomePage;
