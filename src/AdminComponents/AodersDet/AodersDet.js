import React, { useEffect, useState } from "react";
import "./AodersDet.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AodersDet({ allCategories, allProducts }) {
  const [allUsers, setAllUsers] = useState(null);
  const params = useParams();
  const id = params.id;
  const [commandes, setCommandes] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  // console.log(params.op);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getCommandesById/${id}`)
      .then((res) => {
        setCommandes(res.data.commande);
        // console.log(res.data.commande);
        // console.log(allProducts);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getUsers`)
      .then((users) => {
        setAllUsers(users.data.data);
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

  return (
    <div className="AodersDet">
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
      <h4>Code Promo : {commandes?.codePro ? "oui" : "auccun"}</h4>
      <h4>Produits commander</h4>
      <table>
        <thead>
          <tr>
            <th>Nom:</th>
            <th>Id</th>
            <th>Fournisseurs</th>
            <th>Quantite</th>
            <th>couleurs</th>
            <th>Prix</th>
            <th>Prix Total</th>
          </tr>
        </thead>
        <tbody>
          {commandes?.nbrProduits.map((param, index) => {
            return (
              <tr key={index}>
                <td>
                  {allProducts?.find((item) => item._id === param.produit).name}
                </td>
                <td>{param.produit}</td>
                <td>
                  {
                    fournisseurs?.find(
                      (item) =>
                        item._id ===
                        allProducts?.find((itm) => itm._id === param.produit)
                          .Clefournisseur
                    )?.numero
                  }
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
                  {allProducts?.find((item) => item._id === param.produit)
                    .prixPromo ||
                    allProducts?.find((item) => item._id === param.produit)
                      .prix}
                </td>

                <td>
                  {(allProducts?.find((item) => item._id === param.produit)
                    .prixPromo ||
                    allProducts?.find((item) => item._id === param.produit)
                      .prix) * param.quantite}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>Valide !</button>
    </div>
  );
}

export default AodersDet;
