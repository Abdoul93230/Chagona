import React, { useState } from "react";
import "./SingnUp.css";
import axios from "axios";
import {
  ChevronRight,
  Lock,
  MessageSquare,
  PhoneCall,
  User,
} from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [isloading, setIsloading] = useState(false);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const regexPhone = /^[0-9]{8,}$/;
  const location = useLocation();
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
    const phoneNumberInput = document.querySelector(
      ".SingnUp .right input[type='number']"
    );

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();

    if (name === "" || name.length < 3) {
      handleAlertwar("Veuillez entrer un nom valide au moins 3 string.");
      return false;
    } else if (email.length !== 0 && !validateEmail(email)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      return false;
    } else if (password === "" || password.length < 6) {
      handleAlertwar(
        "Veuillez entrer un mot de passe valide au moins 6 carracters."
      );
      return false;
    } else if (
      (phoneNumber.length > 0 && !regexPhone.test(phoneNumber)) ||
      phoneNumber.length > 11
    ) {
      handleAlertwar("Veuillez entrer un numero fonctionnel");
      return false;
    } else {
      setIsloading(true);
      axios
        .post(`${BackendUrl}/user`, {
          name: name,
          password: password,
          email: email,
          phoneNumber,
          whatsapp,
        })
        .then((response) => {
          axios
            .post(
              `${BackendUrl}/login`,

              {
                email: email.length > 0 ? email : null, // Utilisez l'email si il est saisi
                phoneNumber: phoneNumber.length > 0 ? phoneNumber : null, // Utilisez le numéro de téléphone si il est saisi
                password: password,
              },
              {
                withCredentials: true,
                credentials: "include",
              }
            )
            .then((user) => {
              // console.log(user);
              const dateActuelle = new Date();
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const dateInscription = dateActuelle.toLocaleDateString(
                "fr-FR",
                options
              );

              if (user.status === 200) {
                const message = `<h1>Nouvel Utilisateur Inscrit sur Habou227</h1>
                <p>Cher(e)Habou227,</p>
                <p>Nous avons le plaisir de vous informer qu'un nouvel utilisateur s'est inscrit sur Habou227. Voici les détails de l'utilisateur :</p>
                <ul>
                    <li>Nom : ${name}</li>
                    <li>Adresse e-mail : ${email}</li>
                    <li>Date d'inscription : ${dateInscription}</li>
                </ul>
                <p>Vous pouvez vérifier ces informations dans notre base de données pour assurer le suivi approprié. N'hésitez pas à contacter l'utilisateur pour le saluer et l'orienter dans son expérience de magasinage en ligne.</p>
                <p>Si vous avez des questions ou avez besoin d'informations supplémentaires, n'hésitez pas à me contacter à [abdoulrazak9323@gmail.com] ou par téléphone au [+227 87727501].</p>
                <p>Nous sommes ravis d'accueillir de nouveaux utilisateurs sur Habou227 et espérons que cette nouvelle inscription contribuera à notre croissance continue.</p>
                <p>Cordialement,</p>
                <p>Abdoul Razak<br>L'équipe Habou227</p>`;
                const emailData = {
                  senderEmail: email,
                  subject: "Nouveau utilisateur",
                  message: `<div>${message}</div`,
                  titel: `<br/><br/><h3>Nouveau utilisateur sur Habou227</h3>`,
                };

                axios
                  .post(`${BackendUrl}/sendMail`, emailData)
                  .then((response) => {})
                  .catch((error) => {
                    console.error("Erreur lors de la requête email:", error);
                  });

                handleAlert(user.data.message);
                setIsloading(false);
                chg("oui");
                const fromCartParam = new URLSearchParams(location.search).get(
                  "fromCart"
                );
                const fromCartProfile = new URLSearchParams(
                  location.search
                ).get("fromProfile");
                const fromCartMore = new URLSearchParams(location.search).get(
                  "fromMore"
                );
                const fromCartMessages = new URLSearchParams(
                  location.search
                ).get("fromMessages");
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
                localStorage.setItem(`userEcomme`, JSON.stringify(user.data));
              } else {
                handleAlertwar(user.data.message);
              }
            })
            .catch((error) => {
              setIsloading(false);
              if (error.response.status === 400)
                handleAlertwar(error.response.data.message);
              else console.log(error.response);
            });
        })
        .catch((error) => {
          setIsloading(false);
          console.log(error);
          if (error.response.status === 400) {
            handleAlertwar(error.response.data.message);
            return;
          }
          if (error.response.status === 409) {
            setIsloading(false);
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
          </h1>
        </div>
      ) : (
        <div className="SingnUp">
          <ul>
            <li>
              <div className="left">
                <User />
              </div>
              <div className="right">
                <label>UserName</label>
                <input type="text" placeholder="janedoe12345" />
              </div>
            </li>
            <div className="gMP">
              <li>
                <div className="left">
                  <MessageSquare />
                </div>
                <div className="right">
                  <label>Email</label>
                  <input type="email" placeholder="janedoe123@email.com" />
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
                    placeholder="+227 87727501"
                    onChange={(e) => setPhone(e.target.value)}
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
                <input type="password" placeholder="*******************" />
              </div>
            </li>
            {phone.length === 8 || phone.length === 11 ? (
              <label
                style={{
                  // border: "2px solid crimson",
                  width: "100%",
                  margin: "5px auto",
                  fontWeight: "bold",
                  color: "#515C6F",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                htmlFor="idW"
              >
                WhatsApp Groupe :{" "}
                <input
                  id="idW"
                  type="checkbox"
                  checked={whatsapp === true ? true : false}
                  onChange={(e) => {
                    setWhatsapp(!whatsapp);
                  }}
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </label>
            ) : (
              <></>
            )}
          </ul>

          <button onClick={validateCredentials}>
            Sign Up{" "}
            <span>
              <ChevronRight />
            </span>
          </button>
          <p>
            By creating an account, you agree to our{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>
          <div></div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default SingnUp;
