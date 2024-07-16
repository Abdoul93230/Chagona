import React, { useState, useEffect } from "react";
import "./OrderComponents.css";
import { ChevronLeft } from "react-feather";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function OrderComponents() {
  const navigue = useNavigate();
  const [myAllComande, setMyAllCommandes] = useState(null);
  const [allPayment, setAllPayment] = useState([]);
  const [rond, setRond] = useState(false);
  const details = (index) => {
    navigue(`/Order/${index}`);
  };
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [options, setoptions] = useState("En cours");

  const changeOption = (index) => {
    const cls = document.getElementsByClassName("op");
    for (let i = 0; i < cls.length; i++) {
      if (i === index) {
        if (!cls[i].classList.contains("d")) cls[i].classList.add("d");
      } else {
        if (cls[i].classList.contains("d")) {
          cls[i].classList.remove("d");
        } else {
        }
      }
    }
  };

  function goBack() {
    window.history.back();
  }

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function getFormattedDay(date) {
    const options = { weekday: "long" };
    const formattedDay = new Intl.DateTimeFormat("fr-FR", options).format(date);
    return formattedDay;
  }

  useEffect(() => {
    setRond(true)
    axios
      .get(`${BackendUrl}/getCommandesByClefUser/${a.id}`)
      .then((res) => {
        setRond(false)
        setMyAllCommandes(res.data.commandes);
      })
      .catch((error) => {console.log(error)
        setRond(false)
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/payments/`)
      .then((res) => {
        setAllPayment(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Variables pour compter le nombre de commandes correspondantes pour chaque option
  const nbrCommandesEnCours = myAllComande?.filter(
    (param) => param.statusLivraison === "en cours"
  )?.length;
  const nbrCommandesRecues = myAllComande?.filter(
    (param) => param.statusLivraison === "recu"
  )?.length;
  // ... (ajoutez des variables pour les autres options ici, si nécessaire)

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  return (
    <div className="OrderComponents">
      <span className="ret" onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h1>My Orders</h1>
      <ul>
        <li
          className={`op ${options === "En cours" ? "d" : ""}`}
          onClick={() => {
            setoptions("En cours");
            changeOption(0);
          }}
        >
          En cours ({nbrCommandesEnCours})
        </li>
        {/* <li
          className={`op ${options === "traitement" ? "d" : ""}`}
          onClick={() => {
            setoptions("traitement");
            changeOption(1);
          }}
        >
          taitement(0)
        </li> */}
        <li
          className={`op ${options === "Recu" ? "d" : ""}`}
          onClick={() => {
            setoptions("Recu");
            changeOption(1);
          }}
        >
          Recu ({nbrCommandesRecues})
        </li>

        {/* Ajoutez ici le contenu pour les autres options */}
      </ul>
      <div className="conteneur">
        {/* Affichage de l'option "En cours" */}
        {options === "En cours" && rond === false ? (
          <div className="Encours">
            {nbrCommandesEnCours === 0 ? (
              <div className="vide">Aucune Commande En cours!</div>
            ) : (
              myAllComande
                ?.filter((param) => param.statusLivraison === "en cours")
                .reverse()
                ?.map((param, index) => (
                  <div
                    key={index}
                    className="carde"
                    onClick={() => details(param._id)}
                  >
                    <div className="top">
                      <h4>{getFormattedDay(new Date(param.date))}</h4>
                      <h4>{formatDate(new Date(param.date))}</h4>
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <h5>Nbrs Produits</h5>
                        <h6>
                          <span>{param.nbrProduits.length}</span> Produits
                        </h6>
                      </div>
                      <div className="right">
                        <h5>Prix Total</h5>
                        <h6>
                          <span>{param.prix}</span> fcfa
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        ) : options === "Recu" && rond === false ? (
          <div className="Recu">
            {nbrCommandesRecues === 0 ? (
              <div className="vide">Aucune Commande Recue!</div>
            ) : (
              myAllComande
                ?.filter((param) => param.statusLivraison === "recu")
                .reverse()
                ?.map((param, index) => (
                  <div
                    key={index}
                    className="carde"
                    onClick={() => details(param._id)}
                  >
                    <div className="top">
                      <h4>{getFormattedDay(new Date(param.date))}</h4>
                      <h4>{formatDate(new Date(param.date))}</h4>
                    </div>
                    <div className="bottom">
                      <div className="left">
                        <h5>Nbrs Produits</h5>
                        <h6>
                          <span>{param.nbrProduits.length}</span> Produits
                        </h6>
                      </div>
                      <div className="right">
                        <h5>Prix Total</h5>
                        <h6>
                          <span>{param.prix}</span> fcfa
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        ) : (
          <>
          {
                    rond?<div style={spinnerStyle}></div>:<></>
                  }
          </>
        )}
        {/* Ajoutez ici le contenu pour les autres options */}
      </div>
    </div>
  );
}

export default OrderComponents;
