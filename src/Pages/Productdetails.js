import React, { useEffect, useState } from "react";
import ProductDet from "../components/ProductDet/ProductDet";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator ";

import { useParams } from "react-router-dom";
// const BackendUrl = process.env.REACT_APP_Backend_Url;
function Productdetails() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`BackendUrl/Product/${params.id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  return (
    <>
      <LoadingIndicator time={1000}>
        <ProductDet product={product} />
      </LoadingIndicator>
    </>
  );
}

export default Productdetails;
