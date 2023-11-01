import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400, fill: '#8884d8' },
  { name: 'Group B', value: 300, fill: '#82ca9d' },
  { name: 'Group C', value: 300, fill: '#ffc658' },
  { name: 'Group D', value: 200, fill: '#0088fe' },
  { name: 'Group E', value: 278, fill: '#00C49F' },
  { name: 'Group F', value: 189, fill: '#FFBB28' },
];

const Graphe3 = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={55}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Graphe3;
