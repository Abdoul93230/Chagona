import React from "react";
import "./Graphe1.css";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    Mois: 1400,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    Mois: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    Mois: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    Mois: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    Mois: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    Mois: 1700,
  },
];

const Graphique = () => {
  return (
    <div className="graphe1">
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 5,
            bottom: 20,
            left: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Mois"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphique;
