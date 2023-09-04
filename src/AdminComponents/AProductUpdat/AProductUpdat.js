import React, { useEffect, useState } from "react";
import "./AProductUpdat.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function AProductUpdat() {
  const navigue = useNavigate();
  const [imgP, setImgP] = useState(null);
  const [description, setDescription] = useState({
    desc: null,
    name: null,
    price: null,
    quantity: null,
    fournisseur: null,
    price_Promo: null,
    Categorie: null,
    ID: null,
    marque: null,
    type_de_Produits: null,
    image1: null,
    image2: null,
    image3: null,
    nouveauChampImages: null,
  });

  function goBack() {
    window.history.back();
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ font: [] }],
      [{ size: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "video", "image"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const [colors, setColor] = useState(null);

  // const colorsOption = ["red", "green", "blue", "black", "none"];

  const [tails, setTails] = useState(null);

  // const tailles = [11.4, 33, 33, 42, "none"];

  const params = useParams();
  const [product, setProduct] = useState("");
  const [fournisseur, setFournisseur] = useState([]);
  const [types, setTypes] = useState([]);
  const [categorie, setcategorie] = useState([]);
  const [isWaiting, setIsWaitting] = useState(false);

  const handleAlert = (message) => {
    toast.success(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAlertwar = (message) => {
    toast.warn(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
        if (!colors) setColor(res.data.data.couleur[0].split(","));
        if (!tails) setTails(res.data.data.taille[0].split(","));
        setDescription((prevDescription) => {
          const updatedDescription = {
            ...prevDescription,
            name: prevDescription.name || res.data.data.name,
            desc: prevDescription.desc || res.data.data.description,
            price: prevDescription.price || res.data.data.prix,
            quantity: prevDescription.quantity || res.data.data.quantite,
            ID: prevDescription.ID || res.data.data._id,
            price_Promo: prevDescription.price_Promo || res.data.data.prixPromo,
            marque: prevDescription.marque || res.data.data.marque,
          };

          return updatedDescription;
        });

        console.log(description);

        const ctype = res.data.data.ClefType;
        const cFournisseur = res.data.data.Clefournisseur;

        axios
          .get(`${BackendUrl}/fournisseur/${cFournisseur}`)
          .then((res) => {
            setDescription((prevDescription) => {
              const updatedDescription = {
                ...prevDescription,
                fournisseur: prevDescription.fournisseur || res.data.data,
              };

              return updatedDescription;
            });

            axios
              .get(`${BackendUrl}/fournisseurs`)
              .then((values) => {
                setFournisseur(values.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(
              "Erreur lors de la requête vers le fournisseur :",
              error
            );
          });

        axios
          .get(`${BackendUrl}/getAllType/`)
          .then((res) => {
            setTypes(res.data.data);
            const param = res.data.data.find((param) => param._id === ctype);
            if (param) {
              setDescription((prevDescription) => {
                const updatedDescription = {
                  ...prevDescription,
                  type_de_Produits: prevDescription.type_de_Produits || param,
                };

                return updatedDescription;
              });
              axios
                .get(`${BackendUrl}/getAllCategories`)
                .then((re) => {
                  setcategorie(re.data.data);
                  const para = re.data.data.find(
                    (para) => para._id === param.clefCategories
                  );
                  if (para) {
                    setDescription((prevDescription) => {
                      const updatedDescription = {
                        ...prevDescription,
                        Categorie: prevDescription.Categorie || para.name,
                      };

                      return updatedDescription;
                    });
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

  const createProduct = () => {
    const regexNumber = /^\d+$/;

    // if (colors.length <= 0) {
    //   handleAlertwar("vous devez mettre au moins une couleur du produit");
    //   return;
    // }
    // if (tails.length <= 0) {
    //   handleAlertwar("vous devez mettre au moins une couleur du produit");
    //   return;
    // }
    if (description.desc.length <= 20) {
      handleAlertwar("la description doit comporter au moins 20 caracters");
      return;
    }
    if (
      !regexNumber.test(description.price) ||
      Number(description.price) < 40
    ) {
      handleAlertwar("le price est incorrecte");
      return;
    }
    if (
      !regexNumber.test(description.quantity) ||
      Number(description.quantity) <= 0
    ) {
      handleAlertwar("la quantite n'est pas valide");
      return;
    }
    if (description.Categorie.length < 2) {
      handleAlertwar("la Categorie n'est pas valide");
      return;
    }
    if (description.type_de_Produits.length < 2) {
      handleAlertwar("le type_de_Produits n'est pas valide");
      return;
    }
    if (description.marque.length < 2) {
      handleAlertwar("la marque n'est pas valide");
      return;
    }
    if (description.fournisseur.length < 2) {
      handleAlertwar("le fournisseur n'est pas valide");
      return;
    }

    const formData = new FormData();
    formData.append("name", description.name);
    if (description.image1 != null) {
      formData.append("image1", description.image1);
    }
    if (description.image2 != null) {
      formData.append("image2", description.image2);
    }
    if (description.image3 != null) {
      formData.append("image3", description.image3);
    }

    formData.append("quantite", description.quantity);
    formData.append("prix", description.price);
    formData.append("prixPromo", description.price_Promo);
    formData.append("description", description.desc);
    formData.append("taille", tails);
    formData.append("couleur", colors);
    formData.append("ClefType", description.type_de_Produits._id);
    formData.append("Clefournisseur", description.fournisseur._id);
    formData.append("marque", description.marque);
    // formData.append("setNouveauChampImages", description.setNouveauChampImages);
    if (
      description.nouveauChampImages &&
      description.nouveauChampImages.length > 0
    ) {
      for (const file of description.nouveauChampImages) {
        formData.append("nouveauChampImages", file);
      }
    }
    setIsWaitting(true);
    axios
      .put(`${BackendUrl}/product/${params.id}`, formData)
      .then((res) => {
        handleAlert(res.data.message);
        setIsWaitting(false);
        navigue(`/Admin/ProductDet/${params.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   console.log(description);
  // }, [description]);

  return (
    <>
      {!isWaiting ? (
        <div className="AProductUpdat">
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
                {colors ? (
                  colors.map((param, index) => {
                    return (
                      <input
                        type="text"
                        key={index}
                        defaultValue={param}
                        style={{
                          backgroundColor: param,
                          color: param === "white" ? "black" : "white",
                        }}
                        onChange={(e) => {
                          if (e.target.value === "none") {
                            let newArear = [...colors];
                            newArear = [
                              ...newArear.slice(0, index),
                              ...newArear.slice(index + 1),
                            ];
                            setColor(newArear);
                          } else {
                            const newArear = [...colors];
                            newArear[index] = e.target.value;
                            setColor(newArear);
                          }
                        }}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
                <button
                  onClick={() => {
                    const newArear = [...colors];
                    newArear.push("red");
                    setColor(newArear);
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="tails :">
              <h5>Tails :</h5>
              <div className="conte">
                {tails ? (
                  tails.map((param, index) => {
                    return (
                      <input
                        key={index}
                        onChange={(e) => {
                          if (e.target.value === "0") {
                            let newArear = [...tails];
                            newArear = [
                              ...newArear.slice(0, index),
                              ...newArear.slice(index + 1),
                            ];
                            setTails(newArear);
                          } else {
                            const newArear = [...tails];
                            newArear[index] = e.target.value;
                            setTails(newArear);
                          }
                        }}
                        type="number"
                        defaultValue={param}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
                <button
                  onClick={() => {
                    const newArear = [...tails];
                    newArear.push("0.0");
                    setTails(newArear);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="url">
              <label htmlFor="image1">Url Image1</label>
              <input
                type="file"
                id="image1"
                onChange={(e) =>
                  setDescription({
                    ...description,
                    image1: e.target.files[0],
                  })
                }
              />
              <label htmlFor="image2">Url Image2</label>
              <input
                type="file"
                id="image2"
                onChange={(e) =>
                  setDescription({
                    ...description,
                    image2: e.target.files[0],
                  })
                }
              />
              <label htmlFor="image3">Url Image3</label>
              <input
                type="file"
                id="image3"
                onChange={(e) =>
                  setDescription({
                    ...description,
                    image3: e.target.files[0],
                  })
                }
              />
              <label htmlFor="image3">Plus IMG</label>
              <input
                type="file"
                id="image3"
                multiple
                onChange={(e) =>
                  setDescription({
                    ...description,
                    nouveauChampImages: e.target.files,
                  })
                }
              />
            </div>
          </div>
          <div className="right">
            <h6>description</h6>
            {/* <textarea
              onChange={(e) =>
                setDescription({ ...description, desc: e.target.value })
              }
              className="desc"
              value={
                description.desc ? description.desc : "Auccune description."
              }
            /> */}
            <ReactQuill
              theme="snow"
              value={description.desc}
              onChange={(data) =>
                setDescription({ ...description, desc: data })
              }
              modules={modules}
            />

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
                  <td>
                    <input
                      type="text"
                      defaultValue={description.name}
                      onChange={(e) =>
                        setDescription({ ...description, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={description.price}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={description.quantity}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          fournisseur: e.target.value,
                        })
                      }
                    >
                      {fournisseur.map((param, index) => {
                        return <option key={index}>{param.email}</option>;
                      })}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={description.price_Promo}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          price_Promo: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>Categorie</th>
                  <th>ID</th>
                  <th colSpan={2}>type de Produits</th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <select
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          Categorie: e.target.value,
                        })
                      }
                    >
                      {categorie.map((param, index) => {
                        return <option key={index}>{param.name}</option>;
                      })}
                    </select>
                  </td>
                  <td>
                    <input type="text" defaultValue={description.ID} />
                  </td>
                  <td colSpan={2}>
                    <select
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          type_de_Produits: e.target.value,
                        })
                      }
                    >
                      {types.map((param, index) => {
                        return <option key={index}>{param.name}</option>;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Marque</th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      defaultValue={description.marque}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          marque: e.target.value,
                        })
                      }
                    />
                  </td>
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
              <button onClick={goBack}>Annuller !</button>
              <button
                onClick={createProduct}
                style={{ textDecoration: "none", color: "white" }}
              >
                Modifier !
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
          <h1>Patientez Creation En Encours....</h1>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default AProductUpdat;
