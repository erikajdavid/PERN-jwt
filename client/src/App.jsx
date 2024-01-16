import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
          method: "GET",
          headers: { token: localStorage.token}
      });

      const parseResponse = await response.json();

      parseResponse === true  ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (error) {
        console.error(error.message);
    } finally {
        setLoading(false); // Set loading to false after the authentication check
      }
  };

  useEffect(() => {
    isAuth()
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
