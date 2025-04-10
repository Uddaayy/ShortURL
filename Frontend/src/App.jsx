import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreateLink />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
