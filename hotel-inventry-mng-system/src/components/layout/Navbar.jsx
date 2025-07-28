import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';


export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">HotelInventory</Link>
        <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
        {user?.role === 'MAIN_ADMIN' && (
          <Link to="/reports" className="hover:text-blue-600">Reports</Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Hello, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
