import React, { useState } from "react";
import SearchOne from "../components/SearchOne/SearchOne";
import SearchTwo from "../components/SearchTwo/SearchTwo";

function Search({ allCategories, allProducts }) {
  const [option, setOption] = useState("un");
  const op = (param) => {
    setOption(param);
  };
  return (
    <>
      {option === "un" ? (
        <SearchOne
          allCategories={allCategories}
          allProducts={allProducts}
          op={op}
        />
      ) : (
        <SearchTwo
          allCategories={allCategories}
          allProducts={allProducts}
          op={op}
        />
      )}
    </>
  );
}

export default Search;
