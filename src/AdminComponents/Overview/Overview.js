import React from "react";
import "./Overview.css";
import AdminTop from "../AdminTop/AdminTop";
import { ChevronDown, ChevronRight, ChevronUp } from "react-feather";
import Graphe2 from "../Graphe2/Graphe2";
import Graphe3 from "../Graphe3/Graphe3";
import image3 from "../../Images/R3.png";

import image1 from "../../Images/R.jpg";
import image2 from "../../Images/R2.jpg";
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

function Overview() {
  const data = [
    {
      name: "Jan",
      uv: 590,
      pv: 800,
      Mois: 1400,
    },
    {
      name: "Feb",
      uv: 868,
      pv: 967,
      Mois: 1506,
    },
    {
      name: "Mcr",
      uv: 1397,
      pv: 1098,
      Mois: 989,
    },
    {
      name: "Apr",
      uv: 1480,
      pv: 1200,
      Mois: 1228,
    },
    {
      name: "May",
      uv: 1520,
      pv: 1108,
      Mois: 1100,
    },
    {
      name: "Jun",
      uv: 1400,
      pv: 680,
      Mois: 1700,
    },
  ];

  return (
    <div className="adminHome" style={{ width: "100%", height: "auto" }}>
      <AdminTop titel="Overview" />

      <div className="ConteCarde">
        {[1, 2, 3].map((param, index) => {
          return (
            <div key={index} className="carde">
              <div className="det">
                <h4>Avg. Order Value</h4>
                <h2>$306.20</h2>
                <h6>
                  <span>
                    1.3% <ChevronDown />
                  </span>{" "}
                  than last year
                </h6>
              </div>
              <img src={image1} alt="loading" />
            </div>
          );
        })}
      </div>

      <div className="graphe1">
        <div className="top">
          <h2>Total sales</h2>
          <h3>
            Last 12 Months <ChevronDown />
          </h3>
        </div>
        <div className="graphe">
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Mois"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Line dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="graphe2">
        <div className="left">
          <div className="l">
            <h3>Sales By Region</h3>
            <div className="im">
              <img src={image3} />
            </div>
          </div>
          <div className="r">
            <table>
              <thead>
                <tr>
                  <th>Regions</th>
                  <th>Pourcentage</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: "Niamey", pourcentage: 45, orders: 3442 },
                  { region: "Maradi", pourcentage: 20, orders: 3142 },
                  { region: "Zinder", pourcentage: 15, orders: 1530 },
                  { region: "Dosso", pourcentage: 10, orders: 765 },
                  { region: "Difa", pourcentage: 5, orders: 382 },
                  { region: "Agadez", pourcentage: 5, orders: 382 },
                ].map((param, index) => {
                  return (
                    <tr key={index}>
                      <td>{param.region}</td>
                      <td>{param.pourcentage}%</td>
                      <td>{param.orders}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right">
          <h4>Visitors this year</h4>
          <h3>156.927</h3>
          <h5>
            <span>
              1.8% <ChevronUp />
            </span>{" "}
            than last year
          </h5>
          <img src={image2} alt="loading" />
          <hr />
          <h2>
            More insights <ChevronRight />
          </h2>
        </div>
      </div>

      <div className="graphe3">
        <div className="left">
          <h3>Sales Report</h3>
          <div className="graphe">
            <Graphe2 />
          </div>
        </div>
        <div className="right">
          <h4>Sales Breakdown by product</h4>
          <div className="graphe">
            <Graphe3 />
          </div>
          <ul>
            {[
              { color: "#8884d8", name: "Electronics", p: 50 },
              { color: "#82ca9d", name: "Furniture", p: 25 },
              { color: "#ffc658", name: "Gags & Packages", p: 10 },
              { color: "#0088fe", name: "Accesssoires", p: 5 },
              { color: "#00C49F", name: "Phone", p: 3 },
              { color: "#FFBB28", name: "Montres", p: 7 },
            ].map((param, index) => {
              return (
                <li key={index}>
                  <span
                    className="c"
                    style={{ backgroundColor: param.color }}
                  ></span>{" "}
                  <span className="t">{param.name}</span>{" "}
                  <span className="p">{param.p}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Overview;
