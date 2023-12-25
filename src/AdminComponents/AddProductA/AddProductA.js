import React, { useEffect, useState } from "react";
import "./AddProductA.css";
import image1 from "../../Images/sac2.png";
import image2 from "../../Images/cosme2.png";
import image3 from "../../Images/tallon2.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AddProductA() {
  const [imgP, setImgP] = useState(image1);
  const [value, setValue] = useState("");
  const [prixLivraison, setPrixLivraison] = useState(0);
  const [description, setDescription] = useState({
    desc: "La description du produit",
    name: "Le Nom du Produit",
    price: "le prix encfa",
    quantity: "la quantite",
    fournisseur: "",
    price_Promo: 0,
    prixF: 0,
    Categorie: "",
    type_de_Produits: "",
    marque: "inconu",
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

  // const formats = ["font", "size", "color", "background"];

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

  const [colors, setColor] = useState(["red", "green", "blue", "black"]);
  const [isWaiting, setIsWaitting] = useState(false);

  const [tails, setTails] = useState([11.4, 33, 33, 42]);

  const changeImgP = (param) => {
    setImgP(param);
  };

  const [Image1, setImage1] = useState(null);
  const [Image2, setImage2] = useState(null);
  const [Image3, setImage3] = useState(null);
  const [nouveauChampImages, setNouveauChampImages] = useState(null);
  const [fournisseur, setFournisseur] = useState(null);
  const [categorie, setCategorie] = useState(null);
  const [typeProduit, setTypeProduit] = useState(null);
  const [Clefournisseur, setClefournisseur] = useState(null);
  const [ClefType, setClefType] = useState("");

  useEffect(() => {
    axios
      .get(`${BackendUrl}/fournisseurs`)
      .then((res) => {
        setFournisseur(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((res) => {
        setCategorie(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllType`)
      .then((res) => {
        setTypeProduit(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createProduct = () => {
    const errorMessages = {
      image1: "Vous devez mettre l'image1",
      image2: "Vous devez mettre l'image2",
      image3: "Vous devez mettre l'image3",
      colors: "Vous devez mettre au moins une couleur du produit",
      tails: "Vous devez mettre au moins une taille du produit",
      descriptionLength: "La description doit comporter au moins 20 caractères",
      priceInvalid: "Le prix est incorrect",
      quantityInvalid: "La quantité n'est pas valide",
      categorieInvalid: "La catégorie n'est pas valide",
      typeDeProduitsInvalid: "Le type de produits n'est pas valide",
      fournisseurInvalid: "Le fournisseur n'est pas valide",
    };

    const regexNumber = /^\d+$/;

    if (!Image1) {
      handleAlertwar(errorMessages.image1);
      return;
    }
    if (!Image2) {
      handleAlertwar(errorMessages.image2);
      return;
    }
    if (!Image3) {
      handleAlertwar(errorMessages.image3);
      return;
    }
    // Vérifiez les autres images (Image2, Image3, nouveauChampImages) de la même manière

    if (colors.length <= 0) {
      handleAlertwar(errorMessages.colors);
      return;
    }
    // Vérifiez les autres champs obligatoires de la même manière

    if (description.desc.length <= 20) {
      handleAlertwar(errorMessages.descriptionLength);
      return;
    }

    if (
      !regexNumber.test(description.price) ||
      Number(description.price) < 40
    ) {
      handleAlertwar(errorMessages.priceInvalid);
      return;
    }

    if (
      !regexNumber.test(description.quantity) ||
      Number(description.quantity) <= 0
    ) {
      handleAlertwar(errorMessages.quantityInvalid);
      return;
    }

    // if (
    //   description.Categorie.length < 2 ||
    //   description.Categorie === "Choisir"
    // ) {
    //   handleAlertwar(errorMessages.categorieInvalid);
    //   return;
    // }

    if (ClefType === "Choisir" || !ClefType) {
      handleAlertwar(errorMessages.typeDeProduitsInvalid);
      return;
    }

    if (
      description.fournisseur.length < 2 ||
      description.fournisseur === "Choisir"
    ) {
      handleAlertwar(errorMessages.fournisseurInvalid);
      return;
    }

    const formData = new FormData();
    formData.append("name", description.name);
    formData.append("image1", Image1);
    formData.append("image2", Image2);
    formData.append("image3", Image3);
    // formData.append("nouveauChampImages", nouveauChampImages);
    formData.append("quantite", description.quantity);
    formData.append("prix", description.price);
    formData.append("prixPromo", description.price_Promo);
    formData.append("description", description.desc);
    formData.append("taille", tails);
    formData.append("couleur", colors);
    formData.append("ClefType", ClefType);
    formData.append("Clefournisseur", Clefournisseur);
    formData.append(
      "marque",
      description.marque.length != 0 ? description.marque : "inconu"
    );
    formData.append("prixF", description.prixF);
    if (nouveauChampImages && nouveauChampImages.length > 0) {
      for (const file of nouveauChampImages) {
        formData.append("nouveauChampImages", file);
      }
    }
    if (prixLivraison && prixLivraison > 0) {
      formData("prixLivraison", prixLivraison);
    }
    setIsWaitting(true);

    axios
      .post(`${BackendUrl}/product`, formData)
      .then((res) => {
        handleAlert(res.data.message);
        setIsWaitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsWaitting(false);
      });
  };

  return (
    <>
      {!isWaiting ? (
        <div className="AddProductA">
          <div className="left ">
            <div className="carde">
              <div className="opImg">
                <img
                  onClick={() => changeImgP(image1)}
                  src={image1}
                  alt="loading"
                />

                <img
                  onClick={() => changeImgP(image2)}
                  src={image2}
                  alt="loading"
                />
                <img
                  onClick={() => changeImgP(image3)}
                  src={image3}
                  alt="loading"
                />
              </div>
              <img src={imgP} alt="loading" />
            </div>
            <div className="color :">
              <h5>Colors :</h5>
              <div className="conte">
                {colors.map((param, index) => {
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
                })}
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
                {tails.map((param, index) => {
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
                })}
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
                onChange={(e) => {
                  setImage1(e.target.files[0]);
                }}
              />
              <label htmlFor="image2">Url Image2</label>
              <input
                type="file"
                id="image2"
                onChange={(e) => {
                  setImage2(e.target.files[0]);
                }}
              />
              <label htmlFor="image3">Url Image3</label>
              <input
                type="file"
                id="image3"
                onChange={(e) => {
                  setImage3(e.target.files[0]);
                }}
              />
              <label htmlFor="plus">plus Img</label>
              <input
                type="file"
                id="plus"
                multiple // Ajoutez cet attribut pour permettre la sélection de plusieurs fichiers
                onChange={(e) => {
                  setNouveauChampImages(e.target.files); // Utilisez e.target.files pour récupérer tous les fichiers sélectionnés
                }}
              />
            </div>
          </div>
          <div className="right">
            <h6>description</h6>

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
                      placeholder={description.price}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </td>

                  <td>
                    <select
                      onChange={(e) => {
                        setDescription({
                          ...description,
                          fournisseur: e.target.value,
                        });
                        fournisseur.map((param, index) => {
                          if (param.email === e.target.value) {
                            setClefournisseur(param._id);
                          }
                        });
                      }}
                    >
                      <option>Choisir</option>
                      {fournisseur ? (
                        fournisseur.map((param, index) => {
                          return <option key={index}>{param.email}</option>;
                        })
                      ) : (
                        <option>Auccun</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
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
                  <th>prixLivraison (Niamey)</th>
                  <th>quantity</th>
                  <th colSpan={2}>type de Produits</th>
                </tr>
                <tr>
                  <td>
                    {/* <select
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          Categorie: e.target.value,
                        })
                      }
                    >
                      <option>Choisir</option>
                      {categorie ? (
                        categorie.map((param, index) => {
                          return <option key={index}>{param.name}</option>;
                        })
                      ) : (
                        <option>Aucun</option>
                      )}
                    </select> */}
                    <input
                      type="number"
                      min={0}
                      value={prixLivraison}
                      onChange={(e) => setPrixLivraison(Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder={description.quantity}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td colSpan={2}>
                    <select
                      onChange={(e) => {
                        setDescription({
                          ...description,
                          type_de_Produits: typeProduit?.find(
                            (item) => item.name === e.target.value
                          )?._id,
                        });

                        setClefType(
                          typeProduit[Number(e.target.selectedIndex) - 1]?._id
                        );

                        // typeProduit.map((param, index) => {
                        //   if (param.name === e.target.value) {
                        //     setClefType(param._id);
                        //   }
                        // });
                      }}
                    >
                      <option>Choisir</option>
                      {typeProduit ? (
                        typeProduit.map((param, index) => {
                          return (
                            <option key={index}>{`${param.name}--> ${
                              categorie?.find(
                                (item) => item?._id === param?.clefCategories
                              )?.name
                            }`}</option>
                          );
                        })
                      ) : (
                        <option>Aucun</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Marque</th>
                  <th>PrixFounisseur</th>
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
                  <td>
                    <input
                      type="number"
                      defaultValue={description.prixF}
                      onChange={(e) =>
                        setDescription({
                          ...description,
                          prixF: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="SM">
              <button onClick={goBack}>Annuller !</button>
              <button onClick={createProduct}>Ajouter !</button>
              {/* <button onClick={() => console.log(description)}>
                Ajouter !
              </button> */}
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

export default AddProductA;
