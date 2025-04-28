import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
import DashboardLayout from './layouts/DashboardLayout';
import './index.css';
const App = () => {
  const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/create"
            element={isAuthenticated() ? <CreateLink /> : <Navigate to="/login" />}
          />
          <Route
            path="/analytics"
            element={isAuthenticated() ? <Analytics /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/create" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
