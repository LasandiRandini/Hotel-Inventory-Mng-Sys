import React from 'react';

export default function Table({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2" />}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b last:border-none">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-800">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2">
                  {actions.map((Action, idx) => (
                    <Action.component key={idx} row={row} {...Action.props} />
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
