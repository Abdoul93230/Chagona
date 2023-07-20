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
import HomeTop from "../components/HomeTop/HomeTop";
import LoadingIndicator from "./LoadingIndicator ";
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

  return (
    <>
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
        <Footer />
        <Navbar />
      </LoadingIndicator>
    </>
  );
}

export default Home;
