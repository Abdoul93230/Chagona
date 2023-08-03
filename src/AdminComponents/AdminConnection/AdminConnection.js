import React, { useState } from "react";
import { ChevronRight, Menu, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminConnection.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AdminConnection({ chg }) {
  const handleAlert = (message) => {
    toast.success(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAlertwar = (message) => {
    toast.warn(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigue = new useNavigate();
  const connect = async () => {
    axios
      .post(
        `${BackendUrl}/AdminLogin`,

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
        // console.log(user);
        if (user.status === 200) {
          handleAlert(user.data.message);
          chg(true);
          localStorage.setItem(`AdminEcomme`, JSON.stringify(user.data));
        } else {
          handleAlertwar(user.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400)
          handleAlertwar(error.response.data.message);
        else console.log(error.response);
        // console.log(error);
      });
  };
  return (
    <div className="AdminConnection">
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminConnection;
