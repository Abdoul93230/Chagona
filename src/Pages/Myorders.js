import React from "react";
import OrderComponents from "../components/OrderComponents/OrderComponents";

function Myorders({ allCategories, allProducts }) {
  return (
    <>
      <OrderComponents
        allCategories={allCategories}
        allProducts={allProducts}
      />
    </>
  );
}

export default Myorders;
