import React from "react";
import "./SingnUp.css";
import axios from "axios";
import { ChevronRight, Menu, MessageSquare, User } from "react-feather";
import { useNavigate } from "react-router-dom";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function SingnUp({ chg }) {
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
      alert("Veuillez entrer un nom valide au moins 3 string.");
      return false;
    } else if (email === "" || !validateEmail(email)) {
      alert("Veuillez entrer une adresse e-mail valide.");
      return false;
    } else if (password === "" || password.length < 6) {
      alert("Veuillez entrer un mot de passe valide au moins 6 carracters.");
      return false;
    } else {
      axios
        .post(`${BackendUrl}/user`, {
          name: name,
          password: password,
          email: email,
        })
        .then((response) => {
          alert(response.data.message);
          chg("oui");
          navigue("/Home");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data.error);
            return;
          }
          if (error.response.status === 409) {
            alert(error.response.data.message);
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
    </div>
  );
}

export default SingnUp;
