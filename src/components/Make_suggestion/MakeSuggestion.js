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

  const envoyer = () => {
    if (comment.length < 8) {
      handleAlertwar("Veuiller entre un commantaire valide!");
      return;
    }
    const emailData = {
      senderEmail: "abdoulrazak9323@gmail.com", // L'expéditeur de l'e-mail (adresse e-mail du client)
      subject: "Commantaire Chagona-ne.onrender.com",
      message: comment,
      friendEmail: "abdoulrazak9323@gmail.com",
      clientName: "un Client",
    };

    axios
      .post(`${BackendUrl}/Send_email_freind`, emailData)
      .then(async (response) => {
        handleAlert(`Commantaire envoyer !`);
        setAlertClosed(true);
        // navigue("/Profile");
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
      });
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
      </form>
      <button onClick={() => envoyer()}>Submit</button>
      <ToastContainer />
    </div>
  );
}

export default MakeSuggestion;
