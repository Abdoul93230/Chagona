import React, { useState } from "react";
import { ChevronRight, Menu, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LogIn.css";

function LogIn({ chg }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const chargeEmail = () => {
    const a = document.querySelector(".LogIn .right input[type='email']").value;
    setEmail(a);
  };

  const chargePassword = () => {
    const a = document.querySelector(
      ".LogIn .right input[type='password']"
    ).value;
    setPassword(a);
  };

  const navigue = new useNavigate();
  const connect = async () => {
    axios
      .post(
        "https://chagona.onrender.com/login",

        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((user) => {
        console.log(user);
        if (user.status === 200) {
          alert(user.data.message);
          chg("oui");
          navigue("/Home");
          localStorage.setItem(`userEcomme`, JSON.stringify(user.data));
        } else {
          alert(user.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) alert(error.response.data.message);
        else console.log(error.response);
      });
  };
  return (
    <div className="LogIn">
      <ul>
        <li>
          <div className="left">
            <User />
          </div>
          <div className="right">
            <label>UserName/Email</label>
            <input
              type="email"
              value={email}
              onChange={chargeEmail}
              placeholder="janedoe123@email.com"
            />
          </div>
        </li>

        <li>
          <div className="left">
            <Menu />
          </div>
          <div className="right">
            <label>Password</label>
            <input
              onChange={chargePassword}
              value={password}
              type="password"
              placeholder="*******************"
            />
          </div>
        </li>
      </ul>

      <button onClick={() => connect()}>
        Log In{" "}
        <span>
          <ChevronRight />
        </span>
      </button>
      <p>
        Don't have an account? Swipe right to <span>create a new account</span>
      </p>
    </div>
  );
}

export default LogIn;
