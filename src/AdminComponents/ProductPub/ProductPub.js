import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import "./ProductPub.css";
import { X } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function ProductPub() {
  const [allPub, setAllPub] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [categorie, setCategorie] = useState("choisir");
  const [image, setImage] = useState(null);

  const creer = (e) => {
    e.preventDefault();
    let clefCategorie = null;
    if (categorie === "choisir") {
      alert("veuiller choisir une categorie du pub.");
      return;
    }
    if (!image) {
      alert("veuiller choisir une image pour votre pub");
      return;
    }

    clefCategorie = allCategories.find((item) => item.name === categorie)._id;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("clefCategorie", clefCategorie);
    axios
      .post(`${BackendUrl}/productPubCreate`, formData)
      .then((res) => {
        console.log(res);
        setCategorie("choisir");
        setImage(null);
        axios
          .get(`${BackendUrl}/productPubget`)
          .then((pub) => {
            // console.log(pub);
            if (pub.data.length > 0) {
              setAllPub(pub.data);
            } else {
              setAllPub(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletProductPub = (id) => {
    axios
      .delete(`${BackendUrl}/productPubDelete/${id}`)
      .then((res) => {
        // console.log(res);
        alert(res.data.message);
        axios
          .get(`${BackendUrl}/productPubget`)
          .then((pub) => {
            // console.log(pub);
            if (pub.data.length > 0) {
              setAllPub(pub.data);
            } else {
              setAllPub(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BackendUrl}/productPubget`)
      .then((pub) => {
        // console.log(pub);
        if (pub.data.length > 0) {
          setAllPub(pub.data);
        } else {
          setAllPub(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((All) => {
        if (All.data.data) {
          setAllCategories(All.data.data);
        } else {
          console.log("rien");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ProductPub">
      <div className="left">
        {allPub && allPub.length > 0 ? (
          <div>
            <h1>pub</h1>
            <div className="contCarde">
              {allPub?.map((param, index) => {
                return (
                  <div className="carde" key={index}>
                    <h4>
                      {" "}
                      Categorie:
                      {
                        allCategories?.find(
                          (item) => item._id === param.clefCategorie
                        )?.name
                      }
                    </h4>
                    <img src={param.image} alt="loading" />
                    <span>
                      <X onClick={() => deletProductPub(param._id)} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Auccune pub enregistrer pour le moment .</h1>
        )}
      </div>
      <div className="right">
        <h5>Ajouter une pub :</h5>
        <form onSubmit={creer}>
          <div className="formGroup">
            <input
              type="file"
              required="required"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <select
              value={categorie}
              onChange={(e) => {
                setCategorie(e.target.value);
              }}
            >
              <option>choisir</option>
              {allCategories?.map((param, index) => {
                return <option key={index}>{param.name}</option>;
              })}
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default ProductPub;
