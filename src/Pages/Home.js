import React, { useEffect, useState } from "react";
import Navbar from "../components/NaveBar/Navbar";
import HeaderOne from "../components/HeaderOne/HeaderOne";
import Presentation from "../components/Presentation/Presentation";
// import ProductOne from "../components/ProductOne/ProductOne";
import ProductsSli from "../components/ProductsSli/ProductsSli";
import Galeries from "../components/Galeries/Galeries";
import ConteProduits from "../components/ConteProduits/ConteProduits";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";
import HomeTop from "../components/HomeTop/HomeTop";
import LoadingIndicator from "./LoadingIndicator ";
import { shuffle } from "lodash";
import { ChevronUp } from "react-feather";
import "./styles.css";

function Home({ allCategories, allProducts }) {
  const [showButton, setShowButton] = useState(false);
  const [allTypes, setAllTypes] = useState([]);
  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 10);
  }
  function getRandomElementsSix(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 6);
  }
  function getRandomElementss(array, nbr) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, nbr);
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllType")
      .then((types) => {
        setAllTypes(types.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const clefElectronique = allCategories
    ? allCategories.find((item) => item.name === "electronics")
    : null;

  // Gestionnaire pour faire défiler vers le haut de la page
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true, // Faire défiler en douceur
      duration: 1000, // Durée de l'animation en millisecondes
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

  return (
    <div className="home">
      <LoadingIndicator time={3000}>
        <HomeTop />
        <HeaderOne categories={allCategories} />
        <Presentation categories={allCategories} />
        <ConteProduits
          products={getRandomElementss(allProducts, 6)}
          // name={"homes & femmes"}
        />
        {/* <ProductOne allProducts={allProducts} /> */}
        <ConteProduits
          products={getRandomElementsSix(
            allProducts.filter((item) =>
              allTypes.some(
                (type) =>
                  type.clefCategories === clefElectronique?._id &&
                  item.ClefType === type._id
              )
            )
          )}
          name={"Electronics"}
        />
        <ProductsSli
          products={getRandomElements(
            allProducts.filter(
              (item) =>
                item.ClefType ===
                  allTypes.find(
                    (i) => i.clefCategories === clefElectronique?._id ?? ""
                  )?._id ?? ""
            )
          )}
          name={"electronics"}
        />

        <Galeries products={allProducts} />

        {allCategories?.map((param, index) => {
          if (
            getRandomElements(
              allProducts.filter(
                (item) =>
                  item.ClefType ===
                    allTypes.find((i) => i.clefCategories === param?._id ?? "")
                      ?._id ?? ""
              )
            ).length > 0 &&
            param._id !== clefElectronique?._id
          )
            return (
              <div key={index}>
                <ConteProduits
                  products={getRandomElementsSix(
                    allProducts.filter((item) =>
                      allTypes.some(
                        (type) =>
                          type.clefCategories === param?._id &&
                          item.ClefType === type._id
                      )
                    )
                  )}
                  name={param.name}
                />
                <ProductsSli
                  products={getRandomElements(
                    allProducts.filter(
                      (item) =>
                        item.ClefType ===
                          allTypes.find(
                            (i) => i.clefCategories === param?._id ?? ""
                          )?._id ?? ""
                    )
                  )}
                  name={param.name}
                />
              </div>
            );
          else return null;
        })}
        <Footer scroll={scrollToTop} />
        <Navbar />
      </LoadingIndicator>

      {showButton && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <ChevronUp className="i" />
        </button>
      )}
    </div>
  );
}

export default Home;
