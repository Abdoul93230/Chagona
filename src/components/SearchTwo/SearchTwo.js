import React, { useState } from "react";
import "./SearchTwo.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  Star,
  X,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function SearchTwo({ op, allCategories, allProducts }) {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const navigue = useNavigate();
  const [poppup, setPoppup] = useState(false);
  const [show, setShow] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [products, setProduct] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sh, setSh] = useState(true);
  const Categories = [];
  const [Brands, setBrands] = useState([]);

  // Gestionnaire pour faire défiler vers le haut de la page
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true, // Faire défiler en douceur
      duration: 500, // Durée de l'animation en millisecondes
    });
  };

  // Gestionnaire d'effet pour contrôler l'affichage du bouton en fonction du défilement de la page
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton lorsque l'utilisateur a fait défiler plus de 50 pixels
      if (window.scrollY > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Ajouter un écouteur d'événement de défilement
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchProductByName = () => {
    if (searchName.length <= 1) {
      // alert("le produit à rechercher doit avoir au moins 2 caractères");
      return;
    }
    setLoading1(true);
    axios
      .get(`${BackendUrl}/searchProductByName/${searchName}`)
      .then((res) => {
        setProduct(res.data.products);
        setSh(false);
        setErreur(null);
        setLoading1(false);
      })
      .catch((error) => {
        setProduct(null);
        setSh(true);
        setErreur(error.response.data.message);
        setLoading1(false);
      });
  };

  useEffect(() => {
    if (!show) {
      setShow(allCategories[0]);
    }

    axios
      .get(`${BackendUrl}/getAllType`)
      .then((types) => {
        setAllTypes(types.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getMarqueClusters`)
      .then((res) => {
        const bran = [];
        for (let i = 0; i < res.data.clusters.length; i++) {
          const marque = res.data.clusters[i].marque;
          if (!bran.includes(marque)) {
            bran.push(marque);
          }
        }
        setBrands(bran);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const menu = () => {
    const a = document.getElementsByClassName("fil")[0].classList;
    if (a.contains("show")) {
      a.remove("show");
    } else {
      a.add("show");
    }
  };
  function goBack() {
    window.history.back();
  }
  const colors = ["red", "green", "blue", "gray", "yellow"];
  const sizes = ["8 -> 18", "19 -> 29", "30 -> 40", "40 -> 49"];
  const prices = [
    "500f -> 1500 f",
    "1500f -> 2500f",
    "2500f -> 3500f",
    "3500f -> 10000f",
  ];
  // const Brands = ["Balenciaga", "Dior", "Louis Vuitton", "Sony", "Versace"];
  const views = ["2 etoiles", "3 etoiles", "4 etoiles", "5 etoiles"];

  const [choix, setChoix] = useState(null);

  const chargeChoix = (param) => {
    setChoix(param);
    setPoppup(true);
  };

  const filtre =
    choix === "view"
      ? views
      : choix === "category"
      ? Categories
      : choix === "colour"
      ? colors
      : choix === "brand"
      ? Brands
      : choix === "price range"
      ? prices
      : choix === "size"
      ? sizes
      : [];

  const shuffledProducts = allProducts
    .filter((item) =>
      allTypes.some(
        (type) =>
          type.clefCategories === show?._id && item.ClefType === type._id
      )
    )
    .sort(() => Math.random() - 0.5); // Mélange les produits du tableau

  function generateRandomNumber() {
    const min = 3;
    const max = 5;
    const random = Math.random() * (max - min) + min;
    const rounded = random.toFixed(1);
    return parseFloat(rounded);
  }

  function getRandomElementsFromArray(array) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, 3);
  }

  return (
    <LoadingIndicator loading={loading}>
      <div className="SearchTwo">
        <div className="top">
          <div className="left">
            <span className="l" onClick={() => goBack()}>
              <ChevronLeft />
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchProductByName();
              }}
            >
              <input
                type="search"
                defaultValue={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
                placeholder="Shirts"
              />
              <input type="submit" value="search" />
            </form>
            <span className="r">
              <Filter onClick={menu} style={{ display: "none" }} />
            </span>
          </div>

          <div className="right">
            <ul>
              {allCategories?.map((param, index) => {
                // if (index > 3) {
                //   return null;
                // }
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setShow(param);
                      setSh(true);
                      setErreur(null);
                    }}
                  >
                    {param.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <LoadingIndicator loading={loading1}>
          <div className="bottom">
            {erreur && !products ? (
              <h2 style={{ fontSize: 10, width: "100%", marginTop: -15 }}>
                {erreur}
              </h2>
            ) : (
              ""
            )}
            {sh
              ? shuffledProducts.map((param, index) => {
                  return (
                    <div
                      key={index}
                      className="carde"
                      onClick={() => navigue(`/ProductDet/${param._id}`)}
                    >
                      <img src={param.image1} alt="loading" />

                      <h6 style={{ fontSize: 12 }}>{param.name}</h6>
                      <h5>
                        $ {param.prixPromo ? param.prixPromo : param.prix}
                      </h5>
                      <span>
                        <Star style={{ width: "13px" }} />{" "}
                        {generateRandomNumber()}
                      </span>
                    </div>
                  );
                })
              : products?.map((param, index) => {
                  return (
                    <div
                      key={index}
                      className="carde"
                      onClick={() => navigue(`/ProductDet/${param._id}`)}
                    >
                      <img src={param.image1} alt="loading" />

                      <h6 style={{ fontSize: 12 }}>{param.name}</h6>
                      <h5>
                        $ {param.prixPromo ? param.prixPromo : param.prix}
                      </h5>
                      <span>
                        <Star style={{ width: "13px" }} />{" "}
                        {generateRandomNumber()}
                      </span>
                    </div>
                  );
                })}
          </div>
        </LoadingIndicator>

        {/* filtre */}

        <div className="fil">
          <div className="conteneur">
            <div className="T">
              <h4>Refine results</h4>
              <h5>clear</h5>
            </div>
            <ul>
              {["category", "colour", "brand", "size", "price range"].map(
                (param, index) => {
                  return (
                    <li key={index} onClick={() => chargeChoix(param)}>
                      {param}
                      <span>
                        <ChevronRight />
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
            <button onClick={menu}>
              Apply filtres{" "}
              <span>
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>

        {poppup ? (
          <div className="poppupConte">
            <div className="poppup">
              <div className="top">
                <h3>Title</h3>
                <span>
                  <X onClick={() => setPoppup(!poppup)} />
                </span>
              </div>
              <ul>
                {choix === "brand" ? (
                  Brands.map((param, index) => {
                    return <li key={index}>{param}</li>;
                  })
                ) : choix === "category" ? (
                  allCategories.map((param, index) => {
                    return <li key={index}>{param.name}</li>;
                  })
                ) : (
                  <>sds</>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}

        {showButton && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <ChevronUp className="i" />
          </button>
        )}
      </div>
    </LoadingIndicator>
  );
}

export default SearchTwo;
