import React, { useEffect, useState } from "react";
import "./SellerDet.css";
import image1 from "../../Images/sac2.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, Trash } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function SellerDet() {
  const navigue = useNavigate();
  const params = useParams();
  const [Seller, setSeller] = useState([]);
  const [message, setmessage] = useState("");
  const [Product, setProduct] = useState([]);
  const [ProductError, setProductError] = useState(null);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getSeller/${params.id}`)
      .then((res) => {
        setSeller(res.data.data);
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

  //////////////////////////////////// Send Mail /////////////////////////////////////////

  //   const sendMail = (e) => {
  //     e.preventDefault();
  //     const email = Seller.email;
  //     axios
  //       .post(`${BackendUrl}/sendMail/`, { senderEmail: Seller?.email })
  //     //   { senderEmail, subject, message, titel }
  //       .then((res) => {
  //         console.log(res.data.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //////////////////////////////////// fin Send Mail /////////////////////////////////////////

  const valide = () => {
    axios
      .put(`${BackendUrl}/validerDemandeVendeur/${params.id}`, {})
      .then((res) => {
        console.log(res.data);
        axios
          .get(`${BackendUrl}/getSeller/${params.id}`)
          .then((resp) => {
            setSeller(resp.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="SellerDet">
      <div className="left">
        <img
          src={
            !Seller.image ===
            "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
              ? Seller.image
              : image1
          }
          alt="loading"
        />
        <h3>{Seller.name}</h3>
        <div className="lisrProduit">
          <h2>List des Produits</h2>
          <button onClick={valide}>
            IsValid : <span>{Seller?.isvalid === true ? "one" : "off"}</span>{" "}
          </button>
          <div className="cont">
            {Product.length > 0 ? (
              <>
                {Product.map((param, index) => {
                  return (
                    <div key={index} className="conte">
                      <div className="option">
                        <Eye
                          className="i"
                          onClick={() =>
                            navigue(`/Admin/ProductDet/${param._id}`)
                          }
                        />
                        <Trash className="i" />
                      </div>
                      <div className="l">
                        <img
                          src={param.image1 || image1}
                          alt="loading"
                          onClick={() =>
                            navigue(`/Admin/ProductDet/${param._id}`)
                          }
                        />
                      </div>
                      <div className="r">
                        <ul>
                          <li>
                            Name : <span>{param.name.slice(0, 10)}...</span>
                          </li>
                          <li>
                            Quantite : <span>{param.quantite} ps</span>
                          </li>
                          <li>
                            Prix : <span>{param.prix} F</span>
                          </li>
                          <li>
                            type Produit :{" "}
                            <span>
                              {categorie
                                .find((item) => item._id === param.ClefType)
                                ?.name.slice(0, 10) || "N/A"}
                              ...
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h3 style={{ marginTop: 70 }}>
                {ProductError ? ProductError : ""}
              </h3>
            )}
          </div>
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
              <td>{Seller.email}</td>
              <td>+227 {Seller.phone}</td>
              <td>{Seller.region}</td>
              <td>{Seller.quartier}</td>
            </tr>
          </tbody>
        </table>
        <form
        // onSubmit={sendMail}
        >
          <label htmlFor="comment">Lui ecrire un Email :</label>
          <textarea
            placeholder="Tape Here"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            id="comment"
          />
          <input
            type="submit"
            //   onSubmit={sendMail}
            value="Submit"
          />
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
        <div className="Store">
          <h3>Store Information :</h3>
          <div className="conte">
            <div className="l">
              <img src={image1} alt="loading" />
            </div>
            <div className="r">
              <ul>
                <li>
                  Name : <span>{Seller?.storeName}</span>
                </li>
                <li>
                  Nbr Commandes : <span>60</span>
                </li>
                <li>
                  Chiffre d'Affaire : <span>200 000F</span>
                </li>
                <li>
                  Nbr Commandes En Cours : <span>5</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              border: "2px solid black",
              width: "100%",
              height: "auto",
            }}
          >
            {Seller?.identity ? (
              <img
                src={Seller?.identity}
                alt="loading"
                style={{
                  border: "2px solid black",
                  width: "100%",
                  borderRadius: "10px",
                  height: "auto",
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDet;
