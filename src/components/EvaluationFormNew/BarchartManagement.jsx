import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const BarchartManagement = ({ data, dataKey, fill }) => (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 80,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        angle={-50}
        textAnchor="end"
        tick={{ fontSize: 12 }}
        tickFormatter={(tick) =>
          tick.length > 13 ? `${tick.slice(0, 13)}...` : tick
        }
      />
      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
      <Tooltip
        formatter={(value) => `${value}%`}
        contentStyle={{
          width: "350px",
          padding: "10px",
          whiteSpace: "normal",
        }}
      />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
    <Bar dataKey={dataKey} fill={fill} />
  </BarChart>
);

export default BarchartManagement
