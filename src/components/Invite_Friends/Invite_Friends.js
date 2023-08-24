import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invite_Friends.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../Images/produit4.jpg";
import whatsapp from "../../Images/whatsapp.png";

function InviteFriends() {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const [emailP, setEmailP] = useState(null);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [message, setMessage] = useState(
    `Salut [Nom de votre ami], Je viens de découvrir un super site de commerce électronique avec des produits de haute qualité à des prix compétitifs. Si tu t'inscris en utilisant mon lien de parrainage, tu bénéficieras d'une réduction sur ta première commande, et moi aussi ! Ne rate pas cette occasion, rejoins-moi sur ce site génial ! Amicalement, [Ton nom]`
  );
  const [name, setName] = useState(a?.name ?? "");

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const regexPhone = /^[0-9]{8,}$/;

  useEffect(() => {
    if (a) {
      axios
        .get(`${BackendUrl}/user`, {
          params: {
            id: a.id,
          },
        })
        .then((response) => {
          const data = response.data.user;
          if (!emailP) {
            setEmailP(data.email);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const envoyer = (e) => {
    e.preventDefault();

    if (!regexMail.test(email) && number.length < 8) {
      handleAlertwar("forma du mail non valid!");
      return;
    }

    if (regexMail.test(email) || number.length >= 8) {
      if (regexMail.test(email)) {
        const emailData = {
          senderEmail: emailP, // L'expéditeur de l'e-mail (adresse e-mail du client)
          subject: "Sujet de l'e-mail",
          message: message,
          friendEmail: email,
          clientName: name,
        };

        axios
          .post(`${BackendUrl}/Send_email_freind`, emailData)
          .then(async (response) => {
            // alert(response.data.message);
            await handleAlert(`${response.data.message} Email`);
            // navigue("/Profile");
          })
          .catch((error) => {
            console.error("Erreur lors de la requête:", error);
          });
      }
      if (regexPhone.test(number.toString())) {
        handleAlert("Invitation envoyée avec succès phone !");
      }
    }
  };

  const shareProductViaWhatsApp = (productName, productURL, messages) => {
    // Ajouter l'image du produit à la fin du message WhatsApp
    // const message = `Découvrez ce produit incroyable : ${productName} \n\n${productURL}\n\n${productImageURL}`;

    const message = `Découvrez ce site incroyable : ${productName} \n\n ${messages} \n\n${productURL}}`;
    const encodedMessage = encodeURIComponent(message);

    // Vérifier si l'utilisateur est sur mobile
    const isMobile =
      /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
        navigator.userAgent
      );

    // Générer le lien de partage sur WhatsApp pour le Web
    const whatsappWebURL = `https://web.whatsapp.com/send?text=${encodedMessage}`;

    if (isMobile) {
      // Si sur mobile, utiliser le schéma whatsapp:// pour ouvrir WhatsApp
      const whatsappAppURL = `whatsapp://send?text=${encodedMessage}`;
      window.location.href = whatsappAppURL;
    } else {
      // Si sur desktop, simplement afficher le lien
      window.open(whatsappWebURL, "_blank");
    }
  };

  const shareURL = () => {
    const currentURL = window.location.href;
    // Utilisez la fonction de partage ici avec l'URL actuelle
    shareProductViaWhatsApp(
      "Chagona-ne",
      "https://chagona-ne.onrender.com",
      message
    );
  };

  return (
    <div className="InviteFriends">
      <img src={image} alt="loading" />

      <form>
        <textarea
          defaultValue={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <label htmlFor="email">Email de votre ami</label>
        <input
          required
          type="email"
          id="email"
          placeholder="Tape here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* <label htmlFor="num">OU Numero de votre ami</label>
        <input
          required
          type="number"
          id="num"
          placeholder="Tape here"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        /> */}
      </form>
      <button onClick={envoyer}>Submit</button>
      <div className="whatsapp">
        <img alt="loadin" src={whatsapp} onClick={shareURL} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default InviteFriends;
