import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IntakeForm({ userId }) {
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/foods').then((response) => {
      setFoods(response.data);
      setFoodId(response.data[0]?.id || '');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/intake', { user_id: userId, food_id: foodId, quantity });
      setMessage('Intake logged');
      setQuantity('');
    } catch (error) {
      setMessage('Failed to log intake');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-4">
      <h2 className="text-xl mb-4">Log Food Intake</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          {foods.map((food) => (
            <option key={food.id} value={food.id}>{food.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity (grams)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Log Intake</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default IntakeForm;