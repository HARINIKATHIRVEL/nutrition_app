import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import IntakeForm from './IntakeForm'; // your form component
import BmiCalculator from './BmiCalculator'; // your BMI component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/intake" element={<IntakeForm />} />
        <Route path="/bmi" element={<BmiCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
