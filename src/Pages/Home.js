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
import InfiniteCarousel from "../components/ScrollingDivs/ScrollingDivs";
import "./styles.css";
import { useSelector } from "react-redux";

function Home() {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const [showButton, setShowButton] = useState(false);
  const [allTypes, setAllTypes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
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
      .get(`${BackendUrl}/getAllCategories`)
      .then((Categories) => {
        setAllCategories(Categories.data.data);
        // console.log(Categories.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get(`${BackendUrl}/products`)
    //   .then((Categories) => {
    setAllProducts(DATA_Products);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.message);
    //     });
    setAllTypes(DATA_Types);
  }, []);
  const clefElectronique = DATA_Categories
    ? DATA_Categories.find((item) => item.name === "électroniques")
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
      <LoadingIndicator loading={loading}>
        <HomeTop />
        <HeaderOne categories={DATA_Categories} />
        <InfiniteCarousel
          param="Bienvenue sur notre plateforme de commerce électronique locale ! Achetez
        des produits locaux de qualité."
          direction="left"
        />
        <Presentation categories={DATA_Categories} />
        {/* <InfiniteCarousel
          param="Habou227 sur games haute de Produits de Unique Sélection une Explorez !"
          direction="right"
        /> */}
        <InfiniteCarousel
          param="Échangez avec confiance. Shoppez les meilleures offres. Découvrez l'excellence."
          direction="right"
        />
        <ConteProduits
          products={getRandomElementss(DATA_Products, 6)}
          // name={"homes & femmes"}
        />
        {/* <ProductOne allProducts={allProducts} /> */}
        <ConteProduits
          products={getRandomElementsSix(
            DATA_Products?.filter((item) =>
              DATA_Types.some(
                (type) =>
                  type.clefCategories === clefElectronique?._id &&
                  item.ClefType === type._id
              )
            )
          )}
          name={"électroniques"}
        />
        <ProductsSli
          products={getRandomElements(
            DATA_Products.filter((item) =>
              DATA_Types.some(
                (type) =>
                  type.clefCategories === clefElectronique?._id &&
                  item.ClefType === type._id
              )
            )
          )}
          name={"électroniques"}
        />

        <Galeries products={DATA_Products} />

        {DATA_Categories?.map((param, index) => {
          if (
            getRandomElements(
              DATA_Products.filter(
                (item) =>
                  item.ClefType ===
                  DATA_Types.find((i) => i.clefCategories === param._id)?._id
              )
            ).length > 0 &&
            param._id !== clefElectronique?._id
          )
            return (
              <div key={index}>
                <ConteProduits
                  products={getRandomElementsSix(
                    DATA_Products.filter((item) =>
                      DATA_Types.some(
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
                    DATA_Products.filter((item) =>
                      DATA_Types.some(
                        (type) =>
                          type.clefCategories === param?._id &&
                          item.ClefType === type._id
                      )
                    )
                  )}
                  name={param.name}
                />
              </div>
            );
          else return null;
        })}
        <Footer scroll={scrollToTop} />
        <Navbar fromHom={true} />
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
