import React, { useEffect, useState } from "react";
import "./AodersDet.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Command } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AodersDet({ allCategories, allProducts }) {
  const [allUsers, setAllUsers] = useState(null);
  const [allAddress, setAllAdress] = useState(null);
  const params = useParams();
  const id = params.id;
  const [commandes, setCommandes] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [allCode, setAllCode] = useState(null);
  const [Sellers, setSellers] = useState([]);
  // console.log(params.op);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getSellers`)
      .then((res) => {
        setSellers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getCommandesById/${id}`)
      .then((res) => {
        setCommandes(res.data.commande);
        // console.log(res.data.commande);
        // console.log(allProducts);
        axios
          .get(
            `${BackendUrl}/getCodePromoByClefUser/${res.data.commande.clefUser}`
          )
          .then((code) => {
            setAllCode(code.data.data);
            // console.log(code.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getUsers`)
      .then((users) => {
        setAllUsers(users.data.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getAllAddressByUser`)
      .then((users) => {
        setAllAdress(users.data.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/fournisseurs`)
      .then((res) => {
        setFournisseurs(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const valideOrder = (id) => {
    axios
      .put(`${BackendUrl}/mettreAJourStatuts/${id}`)
      .then((res) => {
        // console.log(res);
        axios
          .get(`${BackendUrl}/getCommandesById/${id}`)
          .then((res) => {
            setCommandes(res.data.commande);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AodersDet">
      <div className="conteneur">
        <div className="left">
          <h2>
            Commande de :{" "}
            <span>
              {allUsers?.find((item) => item._id === commandes?.clefUser)?.name}
            </span>
          </h2>
          <h2 style={{ textTransform: "capitalize" }}>
            IdClient : {commandes?.clefUser}
          </h2>
          <h4>Prix Total:{commandes?.prix}</h4>
          <h4>
            Code Promo :{" "}
            {commandes?.codePro
              ? `oui  : ${
                  commandes.idCodePro
                    ? allCode?.find((item) => item._id === commandes.idCodePro)
                        .prixReduiction
                    : ""
                }`
              : "auccun"}
          </h4>
          <h4>statusLivraison: {commandes?.statusLivraison}</h4>
          <h4>StatusPayment: {commandes?.statusPayment}</h4>
        </div>
        <div className="right">
          <h5>
            Email :{" "}
            {allUsers?.find((item) => item._id === commandes?.clefUser)?.email}
          </h5>
          <h5>
            Phone :{" "}
            {
              allAddress?.find((item) => item.clefUser === commandes?.clefUser)
                ?.numero
            }{" "}
          </h5>
          <h5>
            Region :{" "}
            {
              allAddress?.find((item) => item.clefUser === commandes?.clefUser)
                ?.region
            }
          </h5>
          <h5>
            quartier :{" "}
            {
              allAddress?.find((item) => item.clefUser === commandes?.clefUser)
                ?.quartier
            }
          </h5>
          <h5>
            description :{" "}
            {
              allAddress?.find((item) => item.clefUser === commandes?.clefUser)
                ?.description
            }
          </h5>
        </div>
      </div>
      <h4>Produits commander</h4>
      <table>
        <thead>
          <tr>
            <th>Nom:</th>
            <th>Id</th>
            <th>Fournisseurs</th>
            <th>Quantite</th>
            <th>couleurs</th>
            <th>taille</th>
            <th>Prix</th>
            <th>Prix Total</th>
          </tr>
        </thead>
        <tbody>
          {commandes?.nbrProduits.map((param, index) => {
            return (
              <tr key={index}>
                <td>
                  {
                    allProducts?.find((item) => item._id === param.produit)
                      ?.name
                  }
                </td>
                <td>{param.produit}</td>
                <td>
                  {fournisseurs?.find(
                    (item) =>
                      item._id ===
                      allProducts?.find((itm) => itm._id === param.produit)
                        ?.Clefournisseur
                  )?.numero
                    ? fournisseurs?.find(
                        (item) =>
                          item._id ===
                          allProducts?.find((itm) => itm._id === param.produit)
                            ?.Clefournisseur
                      )?.numero
                    : Sellers?.find(
                        (item) =>
                          item._id ===
                          allProducts?.find((itm) => itm._id === param.produit)
                            ?.Clefournisseur
                      )?.phone
                    ? Sellers?.find(
                        (item) =>
                          item._id ===
                          allProducts?.find((itm) => itm._id === param.produit)
                            ?.Clefournisseur
                      )?.phone
                    : "nada"}
                </td>
                <td>{param.quantite}</td>
                <td>
                  {
                    /* {param?.couleurs */
                    /^(http|https):\/\/\S+$/.test(param?.couleurs) ? (
                      <div className="img">
                        {param?.couleurs.map((para, index) => {
                          return <img key={index} src={para} alt="loading" />;
                        })}
                      </div>
                    ) : (
                      param?.couleurs
                    )
                  }
                </td>

                <td>
                  {
                    /* {param?.couleurs */

                    <div className="img">
                      <ol
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {param?.tailles.map((para, index) => {
                          return <li key={index}>{para}</li>;
                        })}
                      </ol>
                    </div>
                  }
                </td>

                <td>
                  {allProducts?.find((item) => item._id === param.produit)
                    ?.prixPromo ||
                    allProducts?.find((item) => item._id === param.produit)
                      ?.prix}
                </td>

                <td>
                  {(allProducts?.find((item) => item._id === param.produit)
                    ?.prixPromo ||
                    allProducts?.find((item) => item._id === param.produit)
                      ?.prix) * param.quantite}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => valideOrder(commandes?._id)}>Valide !</button>
    </div>
  );
}

export default AodersDet;
