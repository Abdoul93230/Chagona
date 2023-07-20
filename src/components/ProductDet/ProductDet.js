import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDet.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import image from "../../Images/sac2.png";
import {
  ChevronLeft,
  ShoppingCart,
  Star,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from "react-feather";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function ProductDet({ product, allCategories, allProducts }) {
  const params = useParams();
  const [poppup, setPoppup] = useState(false);
  const [VP, setVp] = useState(null);
  const [commente, setCommente] = useState("");
  const [Allcommente, setAllCommente] = useState([]);
  const [etoil, setEtoil] = useState(5);
  const [color, setColor] = useState(null);
  const [taille, setTaille] = useState(null);
  const user = JSON.parse(localStorage.getItem("userEcomme"));
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  const [produitsL, setProduitsL] = useState(0);
  function goBack() {
    window.history.back();
  }
  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduitsL(JSON.parse(local));
    } else {
      setProduitsL(0);
    }
  }, []);

  // Déclare une fonction pour sélectionner des commentaires aléatoires
  const selectRandomComments = (comments, maxCount) => {
    // Vérifie si le nombre de commentaires disponibles est inférieur ou égal à maxCount
    if (comments.length <= maxCount) {
      return comments; // Retourne tous les commentaires disponibles
    }

    const shuffled = comments.sort(() => 0.5 - Math.random()); // Mélange les commentaires de manière aléatoire
    return shuffled.slice(0, maxCount); // Sélectionne les premiers maxCount commentaires
  };

  // Utilise la fonction selectRandomComments pour obtenir une liste de commentaires aléatoires
  const randomComments = selectRandomComments(Allcommente, 10);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/Product/${params.id}`)
      .then((res) => {
        setVp(res.data.data);
      })
      .catch((error) => {
        // console.log(error)
      });
  }, []);

  const envoyer = () => {
    const regexNumber = /^[0-5]$/;
    if (commente.trim().length < 5) {
      alert("votre commentaire doit contenire au moin 5 carracteres.");
      return;
    }
    if (!etoil) {
      alert("veuiller noter ce produit s'il vous plait.");
      return;
    }
    if (!regexNumber.test(etoil.toString())) {
      alert("forma de note non valid de 1 a 5 s'il vous plait!");
      return;
    }
    axios
      .post(`${BackendUrl}/createCommenteProduit`, {
        description: commente,
        clefProduct: product?._id,
        clefType: product?.ClefType,
        etoil: etoil,
        userName: user.name,
      })
      .then((resp) => {
        alert(resp.data.message);
        setPoppup(false);
        setEtoil(null);
        setCommente("");

        axios
          .get(`${BackendUrl}/getAllCommenteProduitById/${product?._id}`)
          .then((coments) => {
            setAllCommente(coments.data);
            // console.log(coments.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigue = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const AddProduct = () => {
    const existingProducts = JSON.parse(localStorage.getItem("panier")) || [];

    const isProductInCart = existingProducts.some((p) => p._id === product._id);

    if (isProductInCart) {
      const updatedProducts = existingProducts.map((p) => {
        if (p._id === product._id) {
          const updatedColors = [...p.colors, color]; // Ajouter la nouvelle couleur
          const updatedSizes = [...p.sizes, taille]; // Ajouter la nouvelle taille

          return {
            ...p,
            colors: updatedColors,
            sizes: updatedSizes,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });

      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      alert("La quantité du produit a été incrémentée dans le panier !");
      return;
    }

    if (!color) {
      alert("Veuillez choisir une couleur !");
      return;
    }

    if (!taille) {
      alert("Veuillez choisir une taille !");
      return;
    }

    const updatedProducts = [
      ...existingProducts,
      {
        ...product,
        colors: [color], // Ajouter la couleur sélectionnée comme tableau
        sizes: [taille], // Ajouter la taille sélectionnée comme tableau
        quantity: 1,
      },
    ];

    localStorage.setItem("panier", JSON.stringify(updatedProducts));
    alert("Produit ajouté au panier !");
  };

  const [allTypes, setAllTypes] = useState(null);

  const [option, setOption] = useState("Product");

  const CVCate = allTypes
    ? allTypes.find((item) => item?._id === product?.ClefType)?.clefCategories
    : null;

  const Categorie = allCategories
    ? allCategories.find((item) => item?._id === CVCate)?.name
    : null;

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllType`)
      .then((types) => {
        setAllTypes(types.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllCommenteProduitById/${product?._id}`)
      .then((coments) => {
        setAllCommente(coments.data);
        // console.log(coments.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product]);

  const chgOption = (param, index) => {
    setOption(param);

    const cls = document.getElementsByClassName("x");
    for (let i = 0; i < cls.length; i++) {
      if (i === index) {
        if (!cls[i].classList.contains("d")) cls[i].classList.add("d");
      } else {
        cls[i].classList.remove("d");
      }
    }
  };
  const [plus, setPlus] = useState(false);
  const plust = () => {
    setPlus(!plus);
    const a = document.getElementsByClassName("detplus")[0].classList;
    if (a.contains("PLUS")) {
      a.remove("PLUS");
    } else {
      a.add("PLUS");
    }
  };

  const [plustM, setPlustM] = useState(false);

  const plusM = (index) => {
    setPlustM(!plustM);
    const a = document.getElementsByClassName("PLM")[index].classList;
    if (a.contains("PLUS")) {
      a.remove("PLUS");
    } else {
      a.add("PLUS");
    }
  };

  const OP =
    option === "Product" ? (
      <div style={{ width: "100%", height: "auto" }}>
        <div className="color">
          <h3>SELECT COLOR : {color ? color : ""}</h3>
          <div className="col">
            {product?.couleur[0].split(",").map((param, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: param,
                  boxShadow: `0px 0px 7px ${param}`,
                }}
                onClick={() => setColor(param)}
              ></span>
            ))}
          </div>
        </div>
        <div className="size">
          <h3>SELECT SIZE (US) : {taille ? taille : ""}</h3>
          <div className="siz">
            {product?.taille[0].split(",").map((param, index) => {
              return (
                <span key={index} onClick={() => setTaille(param)}>
                  {param}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    ) : option === "Details" ? (
      <div className="Details">
        <table>
          <tr>
            <td style={{ textAlign: "left" }}>
              <h2>Brand</h2>
              <p>{product?.marque}</p>
            </td>
            <td style={{ textAlign: "right" }}>
              <h2>Categoriy</h2>
              <p>{Categorie ? Categorie : ""}</p>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>
              <h2>Livraison</h2>
              <p>500F(Niamey)</p>
            </td>
            <td style={{ textAlign: "right" }}>
              <h2>fitting</h2>
              <p>true to size</p>
            </td>
          </tr>
        </table>
        <div className="detplus" onClick={plust}>
          <p>{product.description}</p>
          <span onClick={plust}>
            {plus ? (
              <ChevronUp onClick={plust} />
            ) : (
              <ChevronDown onClick={plust} />
            )}
          </span>
        </div>
      </div>
    ) : option === "Reviews" ? (
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "70px",
        }}
      >
        {randomComments.length > 0 ? (
          randomComments.map((param, index) => {
            const etoiles = param.etoil;
            return (
              <div key={index} className="Reviews">
                <div className="left">
                  <h2>
                    {param.userName
                      ?.split(" ")
                      .map((word) => word.charAt(0))
                      .join("")}
                  </h2>
                </div>
                <div className="right">
                  <div className="top">
                    <div className="l">
                      <h3>
                        {[...Array(etoiles)].map((_, i) => (
                          <Star key={i} />
                        ))}
                      </h3>
                      <h4>{param.userName}</h4>
                      <div className="PLM" onClick={() => plusM(index)}>
                        <p>{param.description}</p>
                        <span>{plustM ? <ChevronUp /> : <ChevronDown />}</span>
                      </div>
                    </div>
                    <h3 className="r">{formatDate(param.date)}</h3>
                  </div>
                  <div className="bottom">
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image1
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image2
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image3
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image1
                      }
                      alt="loading"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>Aucun commentaire disponible pour ce produit pour le moment.</h3>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <div className="ProductDet">
      <div className="conte">
        <div className="top">
          <ul>
            <li className="retour" onClick={goBack}>
              <ChevronLeft style={{ width: "30px", height: "30px" }} />
            </li>
            <li className="NP">
              <h6>{product?.name}</h6>
              <h5>
                ${product?.prix}{" "}
                <span>
                  <Star style={{ width: "12px" }} />
                  4.9
                </span>
              </h5>
            </li>
            <li className="Scarde" onClick={() => navigue("/Cart")}>
              <ShoppingCart /> <span>{produitsL ? produitsL.length : 0}</span>
            </li>
          </ul>
        </div>
        <div className="midel carousel-container">
          <Slider {...settings}>
            <div className="slide">
              <img src={VP?.image1} alt="loading" />
            </div>
            <div className="slide">
              <img src={VP?.image2} alt="loading" />
            </div>
            <div className="slide">
              <img src={VP?.image1} alt="loading" />
            </div>
          </Slider>
        </div>
      </div>
      <div className="menu">
        <h5 className="x d" onClick={() => chgOption("Product", 0)}>
          Product
        </h5>
        <h5 className="x" onClick={() => chgOption("Details", 1)}>
          Details
        </h5>
        <h5 className="x" onClick={() => chgOption("Reviews", 2)}>
          Reviews
        </h5>
      </div>
      {OP}
      <div className="button">
        <button
          className="btn1"
          onClick={() => navigue("/Profile/Invite_Friends")}
        >
          SHARE THIS{" "}
          <span>
            <ChevronUp />
          </span>
        </button>
        <button className="btn2" onClick={AddProduct}>
          ADD TO CART{" "}
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>
      <div
        className="comment"
        onClick={() => {
          setPoppup(true);
        }}
      >
        <h4>Comment?</h4>
      </div>
      {poppup ? (
        <div className="poppupConte">
          <div className="poppup">
            <div className="top">
              <h3>Ecrire un commentaitre</h3>
              <span>
                <X onClick={() => setPoppup(!poppup)} />
              </span>
            </div>
            <div className="CodeClef">
              <textarea
                type="text"
                onChange={(e) => setCommente(e.target.value)}
                placeholder="tape the code here"
              ></textarea>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                Note le produit de 1-5
                <input
                  style={{ padding: 3, width: 50 }}
                  type="number"
                  onChange={(e) => {
                    setEtoil(e.target.value);
                  }}
                  min={0}
                  max={5}
                  defaultValue={5}
                />
              </label>
              <button onClick={envoyer}>Envoyer</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDet;
