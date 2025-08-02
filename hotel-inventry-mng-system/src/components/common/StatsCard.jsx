
import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  bgColor = 'bg-blue-50',
  borderColor = 'border-blue-200',
  textColor = 'text-blue-600',
  valueColor = 'text-blue-700',
  iconColor = 'text-blue-500'
}) => {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textColor} text-sm font-medium`}>{title}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatsCard;