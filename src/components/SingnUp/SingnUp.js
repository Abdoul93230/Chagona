import React from "react";
import "./SingnUp.css";
import axios from "axios";
import { ChevronRight, Menu, MessageSquare, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function SingnUp({ chg }) {
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
  const navigue = useNavigate();
  //////////////// verification des information et creation de l'utilisateur  ///////////////////////////

  const validateCredentials = () => {
    const nameInput = document.querySelector(
      ".SingnUp .right input[type='text']"
    );
    const emailInput = document.querySelector(
      ".SingnUp .right input[type='email']"
    );
    const passwordInput = document.querySelector(
      ".SingnUp .right input[type='password']"
    );

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (name === "" || name.length < 3) {
      handleAlertwar("Veuillez entrer un nom valide au moins 3 string.");
      return false;
    } else if (email === "" || !validateEmail(email)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      return false;
    } else if (password === "" || password.length < 6) {
      handleAlertwar(
        "Veuillez entrer un mot de passe valide au moins 6 carracters."
      );
      return false;
    } else {
      axios
        .post(`${BackendUrl}/user`, {
          name: name,
          password: password,
          email: email,
        })
        .then((response) => {
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
            .then((user) => {
              // console.log(user);
              if (user.status === 200) {
                handleAlert(user.data.message);
                chg("oui");
                navigue("/Home");
                localStorage.setItem(`userEcomme`, JSON.stringify(user.data));
              } else {
                handleAlertwar(user.data.message);
              }
            })
            .catch((error) => {
              if (error.response.status === 400)
                handleAlertwar(error.response.data.message);
              else console.log(error.response);
            });
        })
        .catch((error) => {
          if (error.response.status === 400) {
            handleAlertwar(error.response.data.error);
            return;
          }
          if (error.response.status === 409) {
            handleAlertwar(error.response.data.message);
            return;
          }
          // console.log(error.response.data.message);
          console.log(error.response);
        });
    }
  };

  // Fonction utilitaire pour valider le format de l'adresse e-mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //////////////////////////////// fin validation et creation  //////////////////////////////////////

  return (
    <div className="SingnUp">
      <ul>
        <li>
          <div className="left">
            <MessageSquare />
          </div>
          <div className="right">
            <label>Email</label>
            <input type="email" placeholder="janedoe123@email.com" />
          </div>
        </li>

        <li>
          <div className="left">
            <User />
          </div>
          <div className="right">
            <label>UserName</label>
            <input type="text" placeholder="janedoe12345" />
          </div>
        </li>

        <li>
          <div className="left">
            <Menu />
          </div>
          <div className="right">
            <label>Password</label>
            <input type="password" placeholder="*******************" />
          </div>
        </li>
      </ul>

      <button onClick={validateCredentials}>
        Sign Up{" "}
        <span>
          <ChevronRight />
        </span>
      </button>
      <p>
        By creating an account, you agree to our <span>Terms of Service</span>{" "}
        and <span>Privacy Policy</span>
      </p>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SingnUp;
