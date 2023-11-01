import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AProductDet.css";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function AProductDet() {
  const navigue = useNavigate();
  const params = useParams();
  const [imgP, setImgP] = useState(null);
  const [product, setProduct] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [types, setTypes] = useState("");
  const [categorie, setcategorie] = useState("");
  const [isWaiting, setIsWaitting] = useState(false);

  const changeImgP = (param) => {
    setImgP(param);
  };

  useEffect(() => {
    const id = params.id;

    axios
      .get(`${BackendUrl}/Product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        if (!imgP) setImgP(res.data.data.image1);

        const ctype = res.data.data.ClefType;
        const cFournisseur = res.data.data.Clefournisseur;

        axios
          .get(`${BackendUrl}/fournisseur/${cFournisseur}`)
          .then((res) => {
            setFournisseur(res.data.data);
          })
          .catch((error) => {
            console.log("Erreur lors de la requête vers le fournisseur", error);
          });

        axios
          .get(`${BackendUrl}/getAllType/`)
          .then((res) => {
            const param = res.data.data.find((param) => param._id === ctype);
            if (param) {
              setTypes(param);
              axios
                .get(`${BackendUrl}/getAllCategories`)
                .then((re) => {
                  const para = re.data.data.find(
                    (para) => para._id === param.clefCategories
                  );
                  if (para) {
                    setcategorie(para);
                  }
                })
                .catch((error) => {
                  console.log(
                    "Erreur lors de la requête vers les catégories :",
                    error
                  );
                });
            }
          })
          .catch((error) => {
            console.log("Erreur lors de la requête vers les types :", error);
          });
      })
      .catch((error) => {
        console.log("Erreur lors de la requête vers le produit :", error);
      });
  }, []);

  const SupprimerProduct = () => {
    setIsWaitting(true);
    axios
      .delete(`${BackendUrl}/Product/${params.id}`)
      .then((rep) => {
        alert(rep.data.message);
        setIsWaitting(false);
        navigue("/Admin/Products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isWaiting ? (
        <div className="AProductDet">
          <div className="left">
            <div className="carde">
              <div className="opImg">
                <img
                  onClick={() => changeImgP(product.image1)}
                  src={product.image1}
                  alt="loading"
                />
                <img
                  onClick={() => changeImgP(product.image2)}
                  src={product.image2}
                  alt="loading"
                />
                <img
                  onClick={() => changeImgP(product.image3)}
                  src={product.image3}
                  alt="loading"
                />
              </div>
              <img src={imgP} alt="loading" />
            </div>
            <div className="color :">
              <h5>Colors :</h5>
              <div className="conte">
                {product.couleur ? (
                  product.couleur[0].split(",").map((param, index) => {
                    return (
                      <span
                        key={index}
                        style={{ backgroundColor: param }}
                      ></span>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="tails :">
              <h5>Tails :</h5>
              <div className="conte">
                {product.taille ? (
                  product.taille[0].split(",").map((param, index) => {
                    return <span key={index}>{param}</span>;
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <h6>description</h6>
            {/* <p className="desc">{product.description}</p> */}
            <div
              style={{
                listStyleType: "inherit",
                // display: "flex",
                textAlign: "left",
              }}
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>fournisseur</th>
                  <th>price Promo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.prix} fcfa</td>
                  <td>{product.quantite}</td>
                  <td>{fournisseur.name ? fournisseur.name : "Aucun"}</td>
                  <td>{product.prixPromo} f</td>
                </tr>
                <tr>
                  <th colSpan={2}>Categorie</th>
                  <th>ID</th>
                  <th colSpan={2}>type de Produits</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {categorie.name ? categorie.name : "aucun"}
                  </td>
                  <td>{product._id}</td>
                  <td colSpan={2}>{types.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="plusImg">
              <h3>Color Image :</h3>
              <div className="img">
                {product?.pictures ? (
                  product?.pictures.map((param, index) => {
                    return <img key={index} alt="loading" src={param} />;
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="SM">
              <button onClick={SupprimerProduct}>Supprimer !</button>
              <button>
                <Link
                  to={`/Admin/ProductUpdat/${params.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Modifier
                </Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Patientez Supression En Encours....</h1>
        </div>
      )}
    </>
  );
}

export default AProductDet;
