import React, { useEffect, useState } from 'react';
//import reportService from '../../services/reportService';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [usageTrends, setUsageTrends] = useState([]);

  useEffect(() => {
  //  reportService.getUsageTrends().then(setUsageTrends);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Analysis</h1>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Usage Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={usageTrends}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="used" stroke="#4F46E5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
