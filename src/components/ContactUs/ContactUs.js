import React, { useState, useEffect } from "react";
import "./ContactUs.css";
import { Facebook, Instagram, Linkedin } from "react-feather";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function ContactUs() {
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

  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState(a?.name ?? "");
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          if (email.length <= 0) {
            setEmail(data.email);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, []);

  const envoyer = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      handleAlertwar("veuiller rentre un bon nom slvp.");
      return;
    }
    if (!regexMail.test(email)) {
      handleAlertwar("forma du mail non valid!");
      return;
    }
    if (message.length < 2) {
      handleAlertwar("message invalide !");
      return;
    }

    const emailData = {
      senderEmail: email,
      subject: "Contact",
      message: `<p>${message}</p>`,
      titel: `<br/><br/><h1>Formullaire de Contacte sur Habou227: en provenace de <br/> ${email}</h1>`,
    };

    axios
      .post(`${BackendUrl}/sendMail`, emailData)
      .then((response) => {
        // alert(response.data.message);
        handleAlert(response.data.message);
        setMessage("");
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
      });
  };

  return (
    <div className="ContactUs">
      <h2>ContactUs : </h2>

      <form onSubmit={envoyer}>
        <div className="formGroup">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <textarea
          placeholder="your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <ul>
        <li>Email:abdoulrazak9323@gmail.com</li>
        <li>Phone:+227 87727501</li>
        <li>Email:</li>
        <li>localite:Niamey/Niger</li>
        <li>
          <a>
            <Facebook />
          </a>{" "}
          <a>
            <Instagram />
          </a>{" "}
          <a>
            <Linkedin />
          </a>
        </li>
      </ul>

      <ToastContainer />
    </div>
  );
}

export default ContactUs;
