import React, { useEffect, useState } from "react";
import "./AFournisseurDet.css";
import image1 from "../../Images/sac2.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AFournisseurDet() {
  const navigue = useNavigate();
  const params = useParams();
  const [fournisseur, setFournisseur] = useState([]);
  const [Product, setProduct] = useState([]);
  const [ProductError, setProductError] = useState(null);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/fournisseur/${params.id}`)
      .then((res) => {
        setFournisseur(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/searchProductBySupplier/${params.id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        if (error.request.status === 404)
          setProductError(error.response.data.message);
        else console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllType/`)
      .then((res) => {
        setCategorie(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendMail = (e) => {
    e.preventDefault();
    const email = fournisseur.email;
    axios
      .post(`${BackendUrl}/sendMail/`, { email: email })
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AFournisseurDet">
      <div className="left">
        <img
          src={fournisseur.image ? fournisseur.image : image1}
          alt="loading"
        />
        <h3>{fournisseur.name}</h3>
        <div className="lisrProduit">
          <h2>List des Produits</h2>
          {Product.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Quantite</th>
                  <th>type Produit</th>
                </tr>
              </thead>
              <tbody>
                {Product.map((param, index) => {
                  return (
                    <tr key={index}>
                      <td>{param.name}</td>
                      <td>{param.quantite}</td>
                      <td>
                        {categorie.find((item) => item._id === param.ClefType)
                          ?.name || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 style={{ marginTop: 70 }}>
              {ProductError ? ProductError : ""}
            </h3>
          )}
        </div>
      </div>
      <div className="right">
        <table style={{ marginBottom: 20 }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Localite</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{fournisseur.email}</td>
              <td>+227 {fournisseur.numero}</td>
              <td>{fournisseur.region}</td>
              <td>{fournisseur.quartier}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={sendMail}>
          <label htmlFor="comment">Lui ecrire un Email :</label>
          <textarea placeholder="Tape Here" id="comment" />
          <input type="submit" onSubmit={sendMail} value="Submit" />
        </form>
        <button
          style={{
            padding: "9px 13px",
            color: "white",
            fontWeight: "bold",
            border: "none",
            backgroundColor: "blue",
            borderRadius: 5,
            cursor: "pointer",
          }}
          onClick={() => navigue(`/Admin/AFournisseurUpdate/${params.id}`)}
        >
          Modifier
        </button>
      </div>
    </div>
  );
}

export default AFournisseurDet;
