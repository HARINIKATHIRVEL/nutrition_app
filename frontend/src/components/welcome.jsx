import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; // Optional: add styles here or use Tailwind

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home'); // or wherever your Homepage.jsx route is
  };

  return (
    <div className="welcome-page bg-gradient-to-br from-blue-100 to-green-100 min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-4">🌱 NutriBuddy</h1>
      <p className="text-xl text-gray-700 mb-6">
        Welcome! Let's find out how healthy you are with fun and simple steps!
      </p>

      <img
        src="https://cdn.pixabay.com/photo/2016/03/31/19/15/kids-1299145_960_720.png"
        alt="Healthy Kids"
        className="w-60 h-auto mb-6 rounded-xl shadow-xl"
      />

      <button
        onClick={handleStart}
        className="px-6 py-3 bg-green-600 text-white text-lg rounded-full shadow-md hover:bg-green-700 transition duration-300"
      >
        Get Started 🚀
      </button>
    </div>
  );
};

export default Welcome;
