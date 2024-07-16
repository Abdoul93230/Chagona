import React, { useState, useEffect } from "react";
import "./Make_suggestion.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import image from "../../Images/suggetions.webp";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function MakeSuggestion() {
  const [comment, setComment] = useState("");
  const [alertClosed, setAlertClosed] = useState(false);

  useEffect(() => {
    if (alertClosed) {
      navigue("/Profile");
    }
  }, [alertClosed]);

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

  const envoyer = async () => {
    if (comment.length < 8) {
      handleAlertwar("Veuillez entrer un commentaire valide !");
      return;
    }

    handleAlert("Envoi en cours...");

    try {
      const emailData = {
        senderEmail: "abdoulrazak9323@gmail.com",
        subject: "Commentaire Chagona-ne.onrender.com",
        message: comment,
        friendEmail: "abdoulrazak9323@gmail.com",
        clientName: "un Client",
      };

      await axios.post(`${BackendUrl}/Send_email_freind`, emailData);

      handleAlert("Commentaire envoyé !");
      // setAlertClosed(true);

      // Attendez un peu avant de naviguer
      setTimeout(() => {
        navigue("/Profile");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const navigue = useNavigate();
  return (
    <div className="Makesuggestion">
      <img src={image} alt="loading" />
      <form>
        <label htmlFor="comment">Your suggetions</label>
        <textarea
          placeholder="Tape Here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      <button onClick={() => envoyer()}>Envoyer !</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default MakeSuggestion;
