import React, { useState } from "react";
import "./SearchTwo.css";
import { ChevronLeft, ChevronRight, Filter, Star, X } from "react-feather";
import image1 from "../../Images/chemise1.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function SearchTwo({ op, allCategories, allProducts }) {
  const navigue = useNavigate();
  const [poppup, setPoppup] = useState(false);
  const [show, setShow] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [products, setProduct] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [sh, setSh] = useState(true);

  const searchProductByName = () => {
    if (searchName.length < 2) {
      alert("le produit à rechercher doit avoir au moins 2 caractères");
      return;
    }
    axios
      .get(`http://localhost:8080/searchProductByName/${searchName}`)
      .then((res) => {
        setProduct(res.data.products);
        setSh(false);
        setErreur(null);
      })
      .catch((error) => {
        setProduct(null);
        setSh(false);
        setErreur(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!show) {
      setShow(allCategories[0]);
    }

    axios
      .get("http://localhost:8080/getAllType")
      .then((types) => {
        setAllTypes(types.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

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
  const Brands = ["Balenciaga", "Dior", "Louis Vuitton", "Sony", "Versace"];
  const views = ["2 etoiles", "3 etoiles", "4 etoiles", "5 etoiles"];
  const Categories = ["Homme", "Femme", "Enfants", "cuisine"];
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
    <div className="SearchTwo">
      <div className="top">
        <div className="left">
          <span className="l" onClick={() => op("un")}>
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
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Shirts"
            />
            <input type="submit" value="search" />
          </form>
          <span className="r">
            <Filter onClick={menu} />
          </span>
        </div>

        <div className="right">
          <ul>
            {allCategories?.map((param, index) => {
              if (index > 3) {
                return null;
              }
              return (
                <li
                  key={index}
                  onClick={() => {
                    setShow(param);
                    setSh(true);
                  }}
                >
                  {param.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="bottom">
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
                  <h5>$ {param.prixPromo ? param.prixPromo : param.prix}</h5>
                  <span>
                    <Star style={{ width: "13px" }} /> {generateRandomNumber()}
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
                  <h5>$ {param.prixPromo ? param.prixPromo : param.prix}</h5>
                  <span>
                    <Star style={{ width: "13px" }} /> {generateRandomNumber()}
                  </span>
                </div>
              );
            })}
        {erreur ? <h2>{erreur}</h2> : ""}
      </div>

      {/* filtre */}

      <div className="fil">
        <div className="conteneur">
          <div className="T">
            <h4>Refine results</h4>
            <h5>clear</h5>
          </div>
          <ul>
            {[
              "view",
              "category",
              "condition",
              "material",
              "colour",
              "brand",
              "size",
              "price range",
            ].map((param, index) => {
              return (
                <li key={index} onClick={() => chargeChoix(param)}>
                  {param}
                  <span>
                    <ChevronRight />
                  </span>
                </li>
              );
            })}
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
              {filtre.map((param, index) => {
                return <li key={index}>{param}</li>;
              })}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchTwo;
