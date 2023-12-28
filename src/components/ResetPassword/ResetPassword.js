import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import axios from "axios";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import { handleAlert, handleAlertwar } from "../../App";

const BackendUrl = process.env.REACT_APP_Backend_Url;

const ResetPassword = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigue = useNavigate();
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (newPassword === "" || newPassword.length < 6) {
      handleAlertwar("Votre mot de passe doit contenir au moins 6 caractères.");
      setIsloading(false);
      return;
    } else if (newPassword.trim() !== newPassword2.trim()) {
      handleAlertwar("Vos deux mot de passe ne sont pas conforme.");
      setIsloading(false);
      return;
    } else {
      try {
        const response = await axios.post(`${BackendUrl}/reset_password`, {
          email,
          otp,
          newPassword,
        });
        handleAlert(response.data.message); // Assurez-vous que votre backend met à jour le mot de passe correctement
        setIsloading(false);

        navigue("/");
      } catch (error) {
        setIsloading(false);
        if (error.response.status === 404) {
          handleAlertwar(error.response.data.message);
          return;
        }
        if (error.response.status === 401) {
          handleAlertwar(error.response.data.message);
          return;
        }
        console.error(
          "Erreur lors de la réinitialisation du mot de passe:",
          error
        );
        handleAlertwar("Erreur lors de la réinitialisation du mot de passe:");
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
        <div className="ResetPassword">
          <h3>Réinitialisation de mot de passe</h3>
          <form onSubmit={handleSubmit}>
            <p>
              Un code OTP a été envoyé à {email}. Veuillez le saisir ci-dessous.
            </p>
            <label>
              Code OTP:
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>
            <label>
              Nouveau mot de passe:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmez le mot de passe:
              <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
              />
            </label>
            <button type="submit">Réinitialiser le mot de passe</button>
            <button
              type="submit"
              onClick={() => navigue("/")}
              className="button2"
            >
              Annuler !
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
