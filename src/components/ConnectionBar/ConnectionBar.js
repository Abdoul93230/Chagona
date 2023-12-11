import React from "react";
import "./ConnectionBar.css";

function ConnectionBar({ chg }) {
  const chg1 = (param) => {
    const a1 = document.querySelector(".ConnectionBar ul .un").classList;
    const a2 = document.querySelector(".ConnectionBar ul .deux").classList;
    const a3 = document.querySelector(".ConnectionBar ul .trois").classList;
    if (param === 1) {
      if (a2.contains("active")) {
        a2.remove("active");
      }
      if (a3.contains("active")) {
        a3.remove("active");
      }
      a1.add("active");
    } else if (param === 2) {
      if (a1.contains("active")) {
        a1.remove("active");
      }
      if (a3.contains("active")) {
        a3.remove("active");
      }
      a2.add("active");
    } else {
      if (a1.contains("active")) {
        a1.remove("active");
      }
      if (a2.contains("active")) {
        a2.remove("active");
      }
      a3.add("active");
    }
  };

  return (
    <div className="ConnectionBar">
      <ul>
        <li
          onClick={() => {
            chg("SingnUp");
            chg1(1);
          }}
          className="li un"
        >
          Singn Up
        </li>
        <li
          onClick={() => {
            chg("LogIn");
            chg1(2);
          }}
          className="li deux active"
        >
          Log In
        </li>
        <li
          onClick={() => {
            chg("forgotP");
            chg1(3);
          }}
          className="li trois"
        >
          Forgot Password
        </li>
      </ul>
    </div>
  );
}

export default ConnectionBar;
