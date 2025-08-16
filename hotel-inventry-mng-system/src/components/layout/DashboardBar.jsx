import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardBar = () => {
  // define your navigation entries here
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/dashboard2', label: 'Dashboard 2' },
    { to: '/logs', label: 'Logs' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/stock-in', label: 'StockIn2' },
    { to: '/stock-out', label: 'Stock Out' },
  //  { to: '/stock-out2', label: 'Stock Out2' },
    { to: '/reports', label: 'Reports' },
  ];

  return (
    <aside className="h-screen bg-white border-r shadow-sm p-4">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <nav>
        <ul>
          {links.map(({ to, label }) => (
            <li key={to} className="mb-2">
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardBar;
