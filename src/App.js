import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
 
  
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Homepage/>} />
          <Route path="/register"  element={<Field/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
