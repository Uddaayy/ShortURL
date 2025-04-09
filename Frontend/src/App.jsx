import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
import DashboardLayout from './layouts/DashboardLayout';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {isAuthenticated() ? (
          <Route element={<DashboardLayout />}>
            <Route path="/create" element={<CreateLink />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/create" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
