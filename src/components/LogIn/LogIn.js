import React, { useState } from "react";
import { ChevronRight, Menu, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LogIn.css";
import { ToastContainer, toast } from "react-toastify";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import "react-toastify/dist/ReactToastify.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function LogIn({ chg, creer }) {
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
  const [isloading, setIsloading] = useState(false);

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
    setIsloading(true);
    axios
      .post(
        `${BackendUrl}/login`,

        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(async (user) => {
        // console.log(user);
        if (user.status === 200) {
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          handleAlert(user.data.message);
          setIsloading(false);
          chg("oui");
          navigue("/Home");
          localStorage.setItem(`userEcomme`, JSON.stringify(user.data));
        } else {
          handleAlertwar(user.data.message);
        }
      })
      .catch((error) => {
        setIsloading(false);
        if (error.response.status === 400) {
          handleAlertwar(error.response.data.message);
        } else console.log(error.response);
      });
  };
  return (
    <>
      {isloading ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Connection en cours Veuillez Patientez....
            <LoadingIndicator loading={isloading} />
          </h1>
        </div>
      ) : (
        <div className="LogIn">
          <ul>
            <li>
              <div className="left">
                <User />
              </div>
              <div className="right">
                <label>Email/UserEmail</label>
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
            Don't have an account? Swipe right to{" "}
            <span
              onClick={() => {
                creer("SingnUp");
              }}
            >
              create a new account
            </span>
          </p>
          <div></div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default LogIn;
