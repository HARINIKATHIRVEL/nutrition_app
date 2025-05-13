import { useState } from 'react'
import axios from 'axios'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('Male')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calculateBMI = async () => {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/api/calculate_bmi', {
      height,
      weight,
      gender
    })
    setBmi(res.data.bmi)
    setCategory(res.data.category)
  }

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
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">BMI Calculator</h2>

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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">BMI: {bmi}</p>
            <p className="text-blue-700">{category}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
