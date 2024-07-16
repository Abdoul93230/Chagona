import React, { useState, useRef } from "react";
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
import { useSelector } from "react-redux";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function SearchTwo({ op, allCategories, allProducts }) {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const navigue = useNavigate();
  const [poppup, setPoppup] = useState(false);
  const [show, setShow] = useState(null);
  const [products, setProduct] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sh, setSh] = useState(true);
  const Categories = [];
  const [Brands, setBrands] = useState([]);
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);

  // Gestionnaire pour faire défiler vers le haut de la page
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true, // Faire défiler en douceur
      duration: 500, // Durée de l'animation en millisecondes
    });
  };

  const divRef = useRef(null);

  const scrollToTop2 = () => {
    const { current } = divRef;
    if (current) {
      current.scrollTop = 0;
    }
  };

  // Gestionnaire d'effet pour contrôler l'affichage du bouton en fonction du défilement de la page
  // Gestionnaire d'effet pour contrôler l'affichage du bouton en fonction du défilement de la page
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton lorsque l'utilisateur a fait défiler plus de 50 pixels
      const { current } = divRef;
      if (current) {
        if (current.scrollTop > 40) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    // Ajouter un écouteur d'événement de défilement à la div si elle existe
    const { current } = divRef;
    if (current) {
      current.addEventListener("scroll", handleScroll);
    }

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  });

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
      setShow(DATA_Categories[0]);
    }
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

  const shuffledProducts = DATA_Products.filter((item) =>
    DATA_Types.some(
      (type) => type.clefCategories === show?._id && item.ClefType === type._id
    )
  ).sort(() => Math.random() - 0.5); // Mélange les produits du tableau

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
                scrollToTop2();
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
              {DATA_Categories?.map((param, index) => {
                if (index > 6 || param.name === "all") {
                  return null;
                }
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setShow(param);
                      setSh(true);
                      setErreur(null);
                      scrollToTop2();
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
          <div className="bottom" ref={divRef}>
            {erreur && !products ? (
              <h2 style={{ fontSize: 10, width: "100%", marginTop: 3 }}>
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

                      <h6 style={{ fontSize: 12 }}>
                        {param.name.slice(0, 10)}...
                      </h6>
                      <h5>
                        f {param.prixPromo ? param.prixPromo : param.prix}
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

                      <h6 style={{ fontSize: 12 }}>
                        {param.name.slice(0, 10)}...
                      </h6>
                      <h5>
                        f {param.prixPromo ? param.prixPromo : param.prix}
                      </h5>
                      <span>
                        <Star style={{ width: "13px" }} />{" "}
                        {generateRandomNumber()}
                      </span>
                    </div>
                  );
                })}
          </div>
          {/* <button onClick={scrollToTop2} style={{ marginTop: "-50px" }}>
            Remonter en haut
          </button> */}
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
                  DATA_Categories.map((param, index) => {
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
          <button onClick={scrollToTop2} className="scroll-to-top-button">
            <ChevronUp className="i" />
          </button>
        )}
      </div>
    </LoadingIndicator>
  );
}

export default SearchTwo;
