import React, { useState } from "react";
import { ChevronRight, Lock, PhoneCall, User } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isloading, setIsloading] = useState(false);
  const location = useLocation();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

  // const chargeEmail = () => {
  //   const a = document.querySelector(".LogIn .right input[type='email']").value;
  //   setEmail(a);
  // };

  // const chargePassword = () => {
  //   const a = document.querySelector(
  //     ".LogIn .right input[type='password']"
  //   ).value;
  //   setPassword(a);
  // };
  // const chargePhoneNumber = () => {
  //   const a = document.querySelector(
  //     ".LogIn .right input[type='number']"
  //   ).value;
  //   setPhoneNumber(a);
  // };

  const navigue = new useNavigate();
  const connect = async () => {
    setIsloading(true);

    // Fonction pour gérer les erreurs
    const handleError = (message) => {
      setIsloading(false);
      handleAlertwar(message);
    };

    // Validation de l'email
    if (email.length !== 0 && !regexMail.test(email)) {
      handleError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Validation du mot de passe
    if (password === "" || password.length < 6) {
      handleError("Votre mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Validation du numéro de téléphone
    if (
      phoneNumber.length > 0 &&
      (!regexPhone.test(phoneNumber) || phoneNumber.length > 11)
    ) {
      handleError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    // Préparation des données de connexion
    const loginData = {
      email: email.length > 0 ? email : null,
      phoneNumber: phoneNumber.length > 0 ? phoneNumber : null,
      password: password,
    };

    console.log(loginData);

    try {
      const response = await axios.post(`${BackendUrl}/login`, loginData, {
        withCredentials: true,
        credentials: "include",
      });

      if (response.status === 200) {
        handleAlert(response.data.message);
        setIsloading(false);
        chg("oui");
        setEmail('')
        setPassword('')
        setPhoneNumber('')
        console.log(response.data)
        const fromCartParam = new URLSearchParams(location.search).get(
          "fromCart"
        );
        const fromCartProfile = new URLSearchParams(location.search).get(
          "fromProfile"
        );
        const fromCartMore = new URLSearchParams(location.search).get(
          "fromMore"
        );
        const fromCartMessages = new URLSearchParams(location.search).get(
          "fromMessages"
        );
        if (fromCartParam) {
          navigue("/Cart?fromCart=true");
        } else if (fromCartProfile) {
          navigue("/Profile");
        } else if (fromCartMore) {
          navigue("/More");
        } else if (fromCartMessages) {
          navigue("/Messages");
        } else {
          navigue("/Home");
        }
        localStorage.setItem(`userEcomme`, JSON.stringify(response.data));
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      handleError(
        error.response && error.response.status === 400
          ? error.response.data.message
          : "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
      // console.log(error);
    }
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
            <div className="gMP">
              <li>
                <div className="left">
                  <User />
                </div>
                <div className="right">
                  <label>Email/UserEmail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="janedoe123@email.com"
                  />
                </div>
              </li>
              or
              <li>
                <div className="left">
                  <PhoneCall />
                </div>
                <div className="right">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    placeholder="+227 87701000"
                    defaultValue={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                  />
                </div>
              </li>
            </div>
            <li>
              <div className="left">
                <Lock />
              </div>
              <div className="right">
                <label>Password</label>
                <input
                  onChange={(e)=>setPassword(e.target.value)}
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
      {/* <ToastContainer /> */}
    </>
  );
}

export default LogIn;
