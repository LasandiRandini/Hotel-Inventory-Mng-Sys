import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
//import inventoryService from '../../services/inventoryService';
import Table from '../components/common/Table';

export default function Dashboard() {
  const [lowStock, setLowStock] = useState([]);
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    // inventoryService.getLowStock().then(setLowStock);
    // inventoryService.getMonthlyUsage().then(setUsageData);
  }, []);

  const cols = [
    { key: 'name', header: 'Item' },
    { key: 'quantity', header: 'Qty Left' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Low Stock Items</h2>
          <Table columns={cols} data={lowStock} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Usage (Monthly)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usageData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="used" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
