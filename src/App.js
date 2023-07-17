import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Field from "./pages/Field"
import Dashboard from "./pages/Dashboard"
import Settings from "./pages/Settings"
import Summary from "./pages/Summary"

export const usePreset = () => {
  const [preset, setPreset] = useState('');

  useEffect(() => {
    const storedPreset = localStorage.getItem('preset');
    if (storedPreset) {
      setPreset(storedPreset);
    } else {
      localStorage.setItem('preset', 'basePreset');
      setPreset('basePreset');
    }
  }, []);

  return [preset, setPreset];
};

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Dashboard/>} />
          <Route path="/field"  element={<Field/>} />
          <Route path="/settings"  element={<Settings/>} />
          <Route path='/summary' element={<Summary/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
