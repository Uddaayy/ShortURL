// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link to="/create" className="hover:text-blue-500">Create Link</Link>
        <Link to="/analytics" className="hover:text-blue-500">Analytics</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
