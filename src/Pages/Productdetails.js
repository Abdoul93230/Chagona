import React, { useEffect, useState } from "react";
import ProductDet from "../components/ProductDet/ProductDet";
import axios from "axios";

import { useParams } from "react-router-dom";

function Productdetails({ allCategories, allProducts }) {
  const [product, setProduct] = useState(null);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Product/${params.id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  return (
    <>
      <ProductDet
        product={product}
        allCategories={allCategories ? allCategories : null}
        allProducts={allProducts}
      />
    </>
  );
}

export default Productdetails;
