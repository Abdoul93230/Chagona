import React, { useState } from "react";
import "./ForgotPassword.css";
import { ChevronRight, MessageSquare } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleAlert, handleAlertwar } from "../../App";
import LoadingIndicator from "../../Pages/LoadingIndicator ";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigue = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsloading(true);
    if (!regexMail.test(email)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      setIsloading(false);
      return;
    } else {
      try {
        const response = await axios.post(`${BackendUrl}/forgot_password`, {
          email,
        });
        handleAlert(response.data.message); // Assurez-vous que votre backend renvoie un code OTP à ce stade
        setIsloading(false);
        navigue(`/reset-password/${email}`);
      } catch (error) {
        // console.error("Erreur lors de la récupération du mot de passe:", error);
        setIsloading(false);
        handleAlertwar("Erreur lors de la récupération du mot de passe");
      }
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
            Traitement en cours Veuillez Patientez....
            <LoadingIndicator loading={isloading} />
          </h1>
        </div>
      ) : (
        <div className="ForgotPassword">
          <p>
            Enter the email address you used to create your account and we will
            email you a link to reset your password
          </p>
          <ul>
            <li>
              <div className="left">
                <MessageSquare />
              </div>
              <div className="right">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="janedoe123@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </li>
          </ul>

          <button onClick={handleSubmit}>
            Send email{" "}
            <span>
              <ChevronRight />
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
