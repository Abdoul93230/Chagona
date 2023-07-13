import React from "react";
import { shuffle } from "lodash";
import { Link } from "react-router-dom";
import "./ProductOne.css";

function ProductOne(allProducts) {
  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 6);
  }

  const randomElements = getRandomElements(allProducts.allProducts);

  return (
    <div className="ProductOne">
      <div className="conteCarde">
        {randomElements.map((param, index) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              key={index}
              to={`/ProductDet/${param._id}`}
            >
              <div className="carde">
                <img src={param.image1} alt="loading" />
                <div className="bottom">
                  <h5>{param.name}</h5>
                  <h6>$ {param.prix}</h6>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductOne;
