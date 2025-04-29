import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-6">🔗 Link Dashboard</h2>
        <nav className="space-y-3">
          <Link to="/create" className="block hover:text-yellow-300">Create Link</Link>
          <Link to="/analytics" className="block hover:text-yellow-300">Analytics</Link>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
