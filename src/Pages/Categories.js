import React from "react";
import AllCategories from "../components/AllCategories/AllCategories";
function Categories({ allCategories }) {
  return (
    <>
      <AllCategories allCategories={allCategories} />
    </>
  );
}

export default Categories;
