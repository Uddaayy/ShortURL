// src/pages/Layout.jsx
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
