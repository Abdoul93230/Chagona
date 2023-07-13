import React, { useState, useEffect } from "react";
import "./OrderDet.css";
import { ChevronLeft } from "react-feather";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderDet({ allProducts }) {
  const navigue = useNavigate();
  const params = useParams();
  const [produits, setProduits] = useState(null);
  const [details, setDetails] = useState(null);
  const [id, setId] = useState(null);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  useEffect(() => {
    axios
      .get(`https://chagona.onrender.com/getCommandesByClefUser/${a.id}`)
      .then((res) => {
        setProduits(res.data.commandes[+params.id - 1].nbrProduits);
        setDetails(res.data.commandes[+params.id - 1]);
        setId(res.data.commandes[+params.id - 1]._id);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletComm = () => {
    axios
      .delete(`https://chagona.onrender.com/deleteCommandeById/${id}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="OrderDet">
      <span className="ret">
        <ChevronLeft onClick={() => navigue("/Order")} className="i" />
      </span>
      <h1>Order N^ {+params.id} Details</h1>
      <h2>
        Total <span>{details?.prix}</span> fcfa
      </h2>
      <div style={{ marginBottom: "60px" }} className="conteneur">
        {produits?.map((param, index) => {
          return (
            <div key={index} className="carde">
              <img
                src={
                  allProducts?.find((item) => item._id === param.produit).image1
                }
                alt="loading"
              />
              <div className="det">
                <span className="num">{index + 1}</span>
                <h6>
                  name:{" "}
                  <span>
                    {
                      allProducts?.find((item) => item._id === param.produit)
                        .name
                    }
                  </span>
                </h6>
                <h6>
                  Quantite: <span>{param.quantite}</span>
                </h6>
                <h6>
                  prix:{" "}
                  <span>
                    {allProducts?.find((item) => item._id === param.produit)
                      .prixPromo
                      ? allProducts?.find((item) => item._id === param.produit)
                          .prixPromo * param.quantite
                      : allProducts?.find((item) => item._id === param.produit)
                          .prix * param.quantite}
                  </span>{" "}
                  fcfa
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      {details?.statusLivraison === "recu" ? (
        <button
          className="btnS"
          onClick={() => {
            deletComm();
            navigue("/Order");
          }}
        >
          Supprimer la commande!
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderDet;
