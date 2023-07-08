import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Chart = () => {
  // Sample data
  const data = [
    { name: 'Finished', value: 80 },
    { name: 'Left', value: 20 },
  ];

  // Colors for the Pie sections
  const colors = ['#008000', '#FF0000'];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={150}
          fill="#8884d8"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend align="center" />
      </PieChart>
    </div>
  );
};

export default Chart;