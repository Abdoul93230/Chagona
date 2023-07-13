import React, { useEffect, useState } from "react";
import Navbar from "../components/NaveBar/Navbar";
import HeaderOne from "../components/HeaderOne/HeaderOne";
import Presentation from "../components/Presentation/Presentation";
import ProductOne from "../components/ProductOne/ProductOne";
import ProductsSli from "../components/ProductsSli/ProductsSli";
import Galeries from "../components/Galeries/Galeries";
import ConteProduits from "../components/ConteProduits/ConteProduits";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { shuffle } from "lodash";

function Home({ allCategories, allProducts }) {
  const [allTypes, setAllTypes] = useState([]);
  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 10);
  }
  function getRandomElementsSix(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 6);
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
  const clefHommeFemme = allCategories
    ? allCategories.find((item) => item.name === "homes & femmes")
    : null;

  return (
    <>
      <HeaderOne categories={allCategories} />
      <Presentation />
      <ProductOne allProducts={allProducts} />
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
      <ProductsSli
        products={getRandomElements(
          allProducts.filter((item) =>
            allTypes.some(
              (type) =>
                type.clefCategories === clefHommeFemme?._id &&
                item.ClefType === type._id
            )
          )
        )}
        name={"homes & femmes"}
      />

      <ConteProduits
        products={getRandomElementsSix(
          allProducts.filter((item) =>
            allTypes.some(
              (type) =>
                type.clefCategories === clefHommeFemme?._id &&
                item.ClefType === type._id
            )
          )
        )}
        name={"homes & femmes"}
      />
      <ConteProduits
        products={getRandomElementsSix(
          allProducts.filter((item) =>
            allTypes.some(
              (type) =>
                type.clefCategories === clefHommeFemme?._id &&
                item.ClefType === type._id
            )
          )
        )}
        name={"homes & femmes"}
      />
      <ProductsSli
        products={getRandomElements(
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
      <ProductsSli products={getRandomElements(allProducts)} name={"All"} />
      <ConteProduits
        products={getRandomElementsSix(allProducts)}
        name={"All"}
      />
      <Footer />
      <Navbar />
    </>
  );
}

export default Home;
