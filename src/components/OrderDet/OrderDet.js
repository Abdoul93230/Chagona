import React, { useState, useEffect } from "react";
import "./OrderDet.css";
import { ChevronLeft } from "react-feather";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function OrderDet({ allProducts }) {
  const navigue = useNavigate();
  const params = useParams();
  const [produits, setProduits] = useState(null);
  const [details, setDetails] = useState(null);
  const [id, setId] = useState(null);
  const [allPayment, setAllPayment] = useState([]);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  useEffect(() => {
    axios
      .get(`${BackendUrl}/getCommandesByClefUser/${a.id}`)
      .then((res) => {
        // setProduits(res.data.commandes[+params.id - 1].nbrProduits);
        setProduits(
          res.data.commandes.find((item) => item._id === params.id).nbrProduits
        );
        setDetails(res.data.commandes.find((item) => item._id === params.id));
        // console.log(res.data.commandes.find((item) => item._id === params.id));
        setId(res.data.commandes.find((item) => item._id === params.id)._id);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(`${BackendUrl}/payments/`)
      .then((res) => {
        setAllPayment(res.data.data);
        // console.log(res.data.data[0].reference);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletComm = () => {
    axios
      .delete(`${BackendUrl}/deleteCommandeById/${id}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="OrderDet">
      <div className="Top">

      <span className="ret">
        <ChevronLeft onClick={() => navigue("/Order")} className="i" />
      </span>
      <h1>
        Order : <span style={{ fontSize: 15 }}>{params.id}</span> <br /> Details
        :
      </h1>
      <h2>
        Total <span>{details?.prix}</span> fcfa
      </h2>
      </div>
      <div style={{ marginBottom: "60px" }} className="conteneur">
        {produits?.map((param, index) => {
          return (
            <div key={index} className="carde">
              <div className="t">
                <img
                  src={
                    allProducts?.find((item) => item._id === param.produit)
                      ?.image1
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
                          ?.name.slice(0, 20)
                      } ...
                    </span>
                  </h6>
                  <h6>
                    Quantite: <span>{param.quantite}</span>
                  </h6>
                  <h6>
                    prix:{" "}
                    <span>
                      {allProducts?.find((item) => item._id === param.produit)
                        ?.prixPromo
                        ? allProducts?.find(
                            (item) => item._id === param.produit
                          )?.prixPromo * param.quantite
                        : allProducts?.find(
                            (item) => item._id === param.produit
                          )?.prix * param.quantite}
                    </span>{" "}
                    fcfa
                  </h6>
                </div>
              </div>
              {details?.statusLivraison === "recu" ? (
                <></>
              ) : (
                <p>
                  Statu payment :
                  <span>
                    {allPayment.find(
                      (item) => item.external_reference === details.reference
                    )?.status
                      ? allPayment.find(
                          (item) =>
                            item.external_reference === details.reference
                        ).status
                      : "En cours"}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="Status">
       {
        allPayment.find(
          (item) => item.external_reference === details.reference
        )?.status ==='Failed'?<div className="btnS">Ressayer le Payment</div>:<></>
       }
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
