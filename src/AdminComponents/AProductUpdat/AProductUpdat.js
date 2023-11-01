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
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [prixPromo, setPriPromo] = useState("");
  const [marque, setMarque] = useState("");
  const [quantite, setQuantite] = useState("");
  const [fournisseure, setFournisseure] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [imagePlus, setImagePlus] = useState(null);
  const [typeProduit, setTypeProduit] = useState("");
  const [descrip, setDescrip] = useState("");
  const [cate, setCate] = useState("");
  const [prixLivraison, setPrixLivraison] = useState(0);

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

    axios.get(`${BackendUrl}/Product/${id}`).then((res) => {
      setProduct(res.data.data);
      if (!imgP) setImgP(res.data.data.image1);
      if (!colors) setColor(res.data.data.couleur[0].split(","));
      if (!tails) setTails(res.data.data.taille[0].split(","));

      setName(res.data.data.name);
      setPrix(res.data.data.prix);
      setQuantite(res.data.data.quantite);
      setMarque(res.data.data.marque);
      setPriPromo(res.data.data.prixPromo);
      setFournisseure(res.data.data.Clefournisseur);
      setTypeProduit(res.data.data.ClefType);
      setDescrip(res.data.data.description);
      setPrixLivraison(res.data.data.prixLivraison || 0);

      const ctype = res.data.data.ClefType;
      const cFournisseur = res.data.data.Clefournisseur;

      axios
        .get(`${BackendUrl}/fournisseurs`)
        .then((values) => {
          setFournisseur(values.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    axios
      .get(`${BackendUrl}/getAllType/`)
      .then((res) => {
        setTypes(res.data.data);

        axios
          .get(`${BackendUrl}/getAllCategories`)
          .then((re) => {
            setcategorie(re.data.data);
          })
          .catch((error) => {
            console.log(
              "Erreur lors de la requête vers les catégories :",
              error
            );
          });
      })
      .catch((error) => {
        console.log("Erreur lors de la requête vers les types :", error);
      });
  }, []);

  const createProduct = () => {
    const regexNumber = /^\d+$/;

    // if (colors.length <= 0) {
    //   handleAlertwar("vous devez mettre au moins une couleur du produit");
    //   return;
    // }
    // if (tails.length <= 0) {
    //   handleAlertwar("vous devez mettre au moins une taille du produit");
    //   return;
    // }
    if (descrip.length <= 20) {
      handleAlertwar("la description doit comporter au moins 20 caracters");
      return;
    }
    if (!regexNumber.test(prix) || Number(prix) < 40) {
      handleAlertwar("le price est incorrecte");
      return;
    }
    if (!regexNumber.test(quantite) || Number(quantite) <= 0) {
      handleAlertwar("la quantite n'est pas valide");
      return;
    }
    // if (description.Categorie.length < 2) {
    //   handleAlertwar("la Categorie n'est pas valide");
    //   return;
    // }
    if (!typeProduit) {
      handleAlertwar("le type_de_Produits n'est pas valide");
      return;
    }
    if (marque?.length < 2) {
      handleAlertwar("la marque n'est pas valide");
      return;
    }
    if (fournisseure?.length < 2) {
      handleAlertwar("le fournisseur n'est pas valide");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image1 != null) {
      formData.append("image1", image1);
    }
    if (image2 != null) {
      formData.append("image2", image2);
    }
    if (image3 != null) {
      formData.append("image3", image3);
    }

    formData.append("quantite", quantite);
    formData.append("prix", prix);
    formData.append("prixPromo", prixPromo);
    formData.append("description", descrip);
    formData.append("taille", tails);
    formData.append("couleur", colors);
    formData.append("ClefType", typeProduit);
    // alert(typeProduit);
    formData.append("Clefournisseur", fournisseure);
    formData.append("marque", marque);
    formData.append("prixLivraison", prixLivraison);
    // formData.append("setNouveauChampImages", description.setNouveauChampImages);
    if (imagePlus && imagePlus.length > 0) {
      for (const file of imagePlus) {
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
                onChange={(e) => setImage1(e.target.files[0])}
              />
              <label htmlFor="image2">Url Image2</label>
              <input
                type="file"
                id="image2"
                onChange={(e) => setImage2(e.target.files[0])}
              />
              <label htmlFor="image3">Url Image3</label>
              <input
                type="file"
                id="image3"
                onChange={(e) => setImage3(e.target.files[0])}
              />
              <label htmlFor="image4">Plus IMG</label>
              <input
                type="file"
                id="image4"
                multiple
                onChange={(e) => setImagePlus(e.target.files)}
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
              value={descrip}
              onChange={(data) => setDescrip(data)}
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
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={prix}
                      onChange={(e) => setPrix(Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={quantite}
                      onChange={(e) => setQuantite(Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        setFournisseure(
                          fournisseur?.find(
                            (item) => item.email === e.target.value
                          )?._id
                        )
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
                      defaultValue={prixPromo}
                      onChange={(e) => setPriPromo(Number(e.target.value))}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>Categorie</th>
                  <th colSpan={2}>ID</th>
                  <th colSpan={2}>type de Produits</th>
                </tr>
                <tr>
                  {/* <td colSpan={2}>
                    <select
                      onChange={(e) =>
                        // setCate({
                        //   ...description,
                        //   Categorie: e.target.value,
                        // })
                        setCate(
                          categorie?.find(
                            (item) => item.name === e.target.value
                          )?._id
                        )
                      }
                    >
                      {categorie.map((param, index) => {
                        return <option key={index}>{param.name}</option>;
                      })}
                    </select>   
                  </td> */}
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={prixLivraison}
                      onChange={(e) => setPrixLivraison(Number(e.target.value))}
                    />
                  </td>
                  <td colSpan={2}>
                    <input type="text" defaultValue={product?._id} />
                  </td>
                  <td colSpan={2}>
                    <select
                      onChange={(e) => {
                        setTypeProduit(
                          // types?.find(
                          //   (item) => item.name === e.target.value.split(" ")[0]
                          // )?._id
                          types[Number(e.target.selectedIndex) - 1]?._id
                        );
                      }}
                    >
                      <option>Choisir le type</option>
                      {types?.map((param, index) => {
                        return (
                          <option key={index}>{`${param.name} --> ${
                            categorie.find(
                              (item) => item?._id === param?.clefCategories
                            )?.name
                          }`}</option>
                        );
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
                      defaultValue={marque}
                      onChange={(e) => setMarque(e.target.value)}
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
          <h1>Patientez Mis A Jours En Encours....</h1>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default AProductUpdat;
