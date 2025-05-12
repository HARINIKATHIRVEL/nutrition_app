import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to NutriBuddy 🥦🍎</h1>
        <p>Your smart nutrition and BMI checker for kids aged 10–15!</p>
      </header>

      <main className="main-content">
        <img
          src="/nutrition_hero.png"
          alt="Healthy Kids"
          className="hero-image"
        />

        <div className="buttons">
          <Link to="/intake">
            <button className="btn">Start Nutrition Check</button>
          </Link>
          <Link to="/bmi">
            <button className="btn btn-alt">Check BMI</button>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <p>✨ Designed for growing kids. Powered by AI/ML.</p>
      </footer>
    </div>
  );
};

export default Homepage;
