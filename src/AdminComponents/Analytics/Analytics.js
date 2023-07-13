import React from "react";
import "./Analytics.css";
import AdminTop from "../AdminTop/AdminTop";
import {
  ChevronRight,
  ChevronUp,
  MessageSquare,
  User,
  Users,
} from "react-feather";
import Graphique from "../Graphe1/Graphe1";
import Graphe2 from "../Graphe2/Graphe2";
function Analytics() {
  return (
    <div className="Analytics">
      {/* ///////////////////////////////////////////////////////////// */}
      <AdminTop titel="Analytics" />
      {/* /////////////////////////////////////////////////////////   */}
      <div className="contCarde">
        {[1, 2, 3, 4].map((param, index) => {
          return (
            <div className="carde" key={index}>
              <div className="left">
                <h4>Total Sessions</h4>
                {/* <span></span> */}
                <h2>14k</h2>
                <h5>
                  <span>
                    2.3%
                    <ChevronUp />
                  </span>{" "}
                  than last year
                </h5>
              </div>
              <span className="s">
                <Users className="i" />
              </span>
            </div>
          );
        })}
      </div>
      {/* ///////////////////////////////////////////////////////// */}
      <div className="conteGraphe1">
        <h2>Account & Monthly Recurring Revenue Growth</h2>
        <div className="top">
          <div className="left">
            <div className="carde">
              <h3>MRR Growth</h3>
              <h2>$710.015</h2>
              <p>
                Measure How Fast You’re Growing Monthly Recurring Revenue.{" "}
                <span>Learn More</span>
              </p>
            </div>
            <div className="carde">
              <h3>AVG. MRR/Customers</h3>
              <h2>$1.350</h2>
              <p>
                Measure How Fast You’re Growing Monthly Recurring Revenue.{" "}
                <span>Learn More</span>
              </p>
            </div>
          </div>
          <div className="right">
            <div className="op">
              <span className="s" style={{ backgroundColor: "blue" }}>
                {" "}
              </span>
              <p>MRR Growth</p>
            </div>
            <div className="op">
              <span className="s" style={{ backgroundColor: "gray" }}>
                {" "}
              </span>
              <p>AVG. MRR/Customers</p>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "auto", position: "relative" }}>
          <Graphique />
        </div>
      </div>
      {/* /////////////////////////////////////////////////////////// */}

      <div className="conteGraphe2">
        <div className="left">
          <h4>Customers Growth</h4>

          <div className="color">
            <p>
              <span> </span>Man
            </p>
            <p>
              <span> </span>Woomen
            </p>
            <p>
              <span> </span>New Customers
            </p>
          </div>

          <div className="graphe">
            <Graphe2 />
          </div>
        </div>
        <div className="right">
          <h4>New Customers</h4>
          <ul>
            {[1, 2, 3, 4].map((param, index) => {
              return (
                <li key={index}>
                  <span>
                    <User />
                  </span>
                  <div className="det">
                    <h5>Sam Conner</h5>
                    <h6>Customers ID #01234</h6>
                  </div>
                  <MessageSquare className="i" />
                </li>
              );
            })}
          </ul>
          <p className="M">
            More insights <ChevronRight />
          </p>
        </div>
      </div>
      {/* ////////////////////////////////////////////////////////////////// */}

      <div className="traffics">
        <h3>Analytics Traffic Channels & Goal</h3>

        <table>
          <thead>
            <tr>
              <th>Channels</th>
              <th>Sessions</th>
              <th>Bounce Rate</th>
              <th>Traffic</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((param, index) => {
              return (
                <tr key={index}>
                  <td>Direct</td>
                  <td>67,992</td>
                  <td>26.5%</td>
                  <td>8.2%</td>
                  <td>1132</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
