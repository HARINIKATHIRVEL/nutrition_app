import React, { useState } from 'react';
import axios from 'axios';
import IntakeForm from './components/IntakeForm';
import Analysis from './components/Analysis';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl">Nutrition Deficiency Predictor</h1>
        {user && <button onClick={() => setUser(null)} className="ml-4">Logout</button>}
      </nav>
      <div className="container mx-auto p-4">
        {!user ? (
          <>
            <Login setUser={setUser} />
            <Register />
          </>
        ) : (
          <>
            <IntakeForm userId={user.user_id} />
            <Analysis userId={user.user_id} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
