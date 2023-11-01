import React from "react";
import ComposentP from "../AdminComponents/ComposentP/ComposentP";

function Admin({ allCategories, allProducts }) {
  return (
    <>
      <ComposentP allCategories={allCategories} allProducts={allProducts} />
    </>
  );
}

export default Admin;
