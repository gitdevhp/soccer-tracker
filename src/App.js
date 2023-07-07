import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Field from "./pages/Field"
import Dashboard from "./pages/Dashboard"
import Settings from "./pages/Settings"
 
  
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Dashboard/>} />
          <Route path="/field"  element={<Field/>} />
          <Route path="/settings"  element={<Settings/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
