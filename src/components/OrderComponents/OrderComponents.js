import React, { useState, useEffect } from "react";
import "./OrderComponents.css";
import { ChevronLeft } from "react-feather";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderComponents() {
  const navigue = useNavigate();
  const [myAllComande, setMyAllCommandes] = useState(null);
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
        cls[i].classList.remove("d");
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
    axios
      .get(`https://chagona.onrender.com/getCommandesByClefUser/${a.id}`)
      .then((res) => {
        setMyAllCommandes(res.data.commandes);
        // console.log(res.data.commandes[0].nbrProduits.length);
      })
      .catch((error) => console.log(error));
  }, []);

  const option =
    options === "En cours" ? (
      <div className="Encours">
        {myAllComande?.length !== 0 ? (
          myAllComande?.map((param, index) => {
            if (param.statusLivraison !== "en cours") {
              return null;
            }
            return (
              <div
                key={index}
                className="carde"
                onClick={() => details(index + 1)}
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
            );
          })
        ) : (
          <div className="vide">Auccune Commande!</div>
        )}
      </div>
    ) : options === "Recu" ? (
      <div className="Recu">
        {myAllComande?.length !== 0 ? (
          myAllComande?.map((param, index) => {
            if (param.statusLivraison !== "recu") {
              return null;
            }
            return (
              <div
                key={index}
                className="carde"
                onClick={() => details(index + 1)}
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
            );
          })
        ) : (
          <div className="vide">Auccune Commande Recu!</div>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <div className="OrderComponents">
      <span className="ret" onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h1>My Orders</h1>
      <ul>
        <li
          className="op d"
          onClick={() => {
            setoptions("En cours");
            changeOption(0);
          }}
        >
          En cours
        </li>
        <li
          className="op"
          onClick={() => {
            setoptions("Recu");
            changeOption(1);
          }}
        >
          Recu
        </li>
        <li
          className="op"
          onClick={() => {
            setoptions("autres");
            changeOption(2);
          }}
        >
          Recu
        </li>
      </ul>
      <div className="conteneur">{option}</div>
    </div>
  );
}

export default OrderComponents;
