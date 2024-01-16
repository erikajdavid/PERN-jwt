import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
