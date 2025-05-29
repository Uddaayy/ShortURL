import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LinkAnalytics from './pages/LinkAnalytics';
const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/analytics/:id" element={<LinkAnalytics />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default App;
