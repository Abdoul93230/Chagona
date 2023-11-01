import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddCategorie.css";
import { XCircle } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function AddCategorie() {
  const [categorie, setCategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [typeProduit, setTypeProduit] = useState("");
  const [choixCat, setChoixCat] = useState(null);
  const [typess, setTypes] = useState([]);
  const [ImgCat, setImgCat] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [isShowD, setIsShowD] = useState({
    name: null,
    image: null,
    id: null,
  });

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((All) => {
        if (All.data.data) {
          setCategories(All.data.data);
        } else {
          console.log("rien");
        }
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getAllType`)
      .then((All) => {
        if (All.data.data) {
          setTypes(All.data.data);
        } else {
          console.log("rien");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const creaeC = () => {
    const formData = new FormData();

    if (categorie.trim().length < 3) {
      alert("Le nom de la catégorie n'est pas correct.");
      return;
    }

    if (ImgCat === null) {
      alert("La catégorie doit avoir une image.");
      return;
    }

    for (let i in categories) {
      if (
        categories[i].name.toLocaleLowerCase() === categorie.toLocaleLowerCase()
      ) {
        alert("ce nom de categorie existe deja");
        return;
      }
    }

    formData.append("name", categorie);
    formData.append("image", ImgCat);

    axios
      .post(`${BackendUrl}/categorie`, formData)
      .then((response) => {
        alert(response.data.message);
        // console.log(response);
        setCategorie("");
        setImgCat(null);

        axios
          .get(`${BackendUrl}/getAllCategories`)
          .then((All) => {
            if (All.data.data) {
              setCategories(All.data.data);
            } else {
              console.log("rien");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        if (error.response.status === 400) alert(error.response.data);
        console.log({ error: error });
      });

    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((All) => {
        if (All.data.data) {
          setCategories(All.data.data);
        } else {
          console.log("rien");
        }
      })
      .catch((error) => console.log(error));
  };

  const supCategorie = (id) => {
    axios
      .delete(`${BackendUrl}/supCategorie`, { data: { id: id } })
      .then((res) => {
        axios
          .get(`${BackendUrl}/getAllCategories`)
          .then((All) => {
            if (All.data.data) {
              setCategories(All.data.data);
            } else {
              console.log("rien");
            }
          })
          .catch((error) => console.log(error));

        alert(res.data.message);
      })
      .catch((error) => {
        console.log({ error: error });
      });
  };

  const createT = () => {
    if (typeProduit.length < 3) {
      return alert("type de produit incorrect");
    }
    if (!choixCat || choixCat === "choisir") {
      return alert("veuiller choisir une categorie du type");
    }
    axios
      .post(`${BackendUrl}/createProductType`, {
        name: typeProduit,
        nameCate: choixCat,
      })
      .then((param) => {
        alert(param.data.message);
        setTypeProduit("");
        setChoixCat("choisir");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const suppType = (id) => {
    axios
      .delete(`${BackendUrl}/suppType`, { data: { id: id } })
      .then((param) => {
        alert(param.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCategorie = (e) => {
    e.preventDefault();
    console.log(isShowD);
    if (isShowD.name.trim().length < 2) {
      alert("non de la categorie incorrecte !");
      return;
    }
    const formData = new FormData();

    formData.append("name", isShowD.name.trim());
    if (isShowD.image !== null) {
      formData.append("image", isShowD.image);
    }
    axios
      .put(`${BackendUrl}/updateCategorie/${isShowD.id}`, formData)
      .then((param) => {
        alert(param.data.message);
        axios
          .get(`${BackendUrl}/getAllCategories`)
          .then((All) => {
            if (All.data.data) {
              setCategories(All.data.data);
            } else {
              console.log("rien");
            }
          })
          .catch((error) => console.log(error));
        setIsShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AddCategorie">
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "10px",
          }}
        >
          <h2>Nom de la Categorie :</h2>
          <input
            type="texte"
            placeholder="Tape here"
            value={categorie}
            onChange={(e) => {
              setCategorie(e.target.value);
            }}
          />
          <label htmlFor="Image">image</label>
          <input
            onChange={(e) => setImgCat(e.target.files[0])}
            type="file"
            id="Image"
          />
          <button onClick={creaeC}>Ajouter !</button>

          <ol className="ol1">
            {categories.length > 0 ? (
              categories.map((param, index) => {
                return (
                  <li key={index}>
                    <span style={{ width: 60, height: "100%" }}>
                      {param.image ? (
                        <img
                          onClick={() => {
                            setIsShowD({
                              ...isShowD,
                              name: param.name,
                              id: param._id,
                            });
                            setIsShow(true);
                          }}
                          src={param.image}
                          alt="loading"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "50px",
                            objectFit: "contain",
                            borderRadius: 15,
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </span>
                    <div
                      style={{
                        height: "100%",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      onClick={() => {
                        setIsShowD({
                          ...isShowD,
                          name: param.name,
                          id: param._id,
                        });
                        setIsShow(true);
                      }}
                    >
                      <h6 style={{ textTransform: "capitalize" }}>
                        {param.name}
                      </h6>
                    </div>
                    <span>
                      <XCircle onClick={() => supCategorie(param._id)} />
                    </span>
                  </li>
                );
              })
            ) : (
              <li>Auccune Categorie pour le moment</li>
            )}
          </ol>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "10px",
          }}
        >
          <h2>Nom du type :</h2>
          <input
            type="texte"
            placeholder="Tape here"
            value={typeProduit}
            onChange={(e) => {
              setTypeProduit(e.target.value);
            }}
          />
          <label>la Categorie:</label>
          {categories.length > 0 ? (
            <select
              style={{
                marginTop: 7,
                border: "1.5px solid gray",
                outline: "none",
                padding: "2px",
                borderRadius: 3,
              }}
              onChange={(e) => {
                setChoixCat(e.target.value);
              }}
            >
              {<option>choisir</option>}
              {categories.map((param, index) => {
                return <option key={index}>{param.name}</option>;
              })}
            </select>
          ) : (
            <h4>veuiller creer une categorie</h4>
          )}

          <button onClick={createT}>Ajouter !</button>

          <ol className="ol1">
            {typess.length > 0 ? (
              typess.map((param, index) => {
                return (
                  <li key={index}>
                    <input type="text" defaultValue={param.name} />
                    <span style={{ marginRight: 5 }}>
                      {
                        categories.find(
                          (para) => para._id === param.clefCategories
                        )?.name
                      }
                    </span>
                    <span>
                      <XCircle onClick={() => suppType(param._id)} />
                    </span>
                  </li>
                );
              })
            ) : (
              <li>Auccun type pour le moment</li>
            )}
          </ol>
        </div>
      </div>

      {isShow ? (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="cardeM">
            <h4>Modifier : {isShowD.name}</h4>
            <form onSubmit={updateCategorie}>
              <div className="ip">
                <label>Nome</label>
                <input
                  type="text"
                  defaultValue={isShowD.name}
                  onChange={(e) =>
                    setIsShowD({ ...isShowD, name: e.target.value })
                  }
                />
              </div>
              <div className="ip">
                <label>image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setIsShowD({ ...isShowD, image: e.target.files[0] })
                  }
                />
              </div>
              <input type="submit" value="Modifier" />
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddCategorie;
