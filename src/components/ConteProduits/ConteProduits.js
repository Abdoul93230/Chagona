import React from "react";
import "./ConteProduits.css";
import { Link } from "react-router-dom";

function ConteProduits({ products, name }) {
  return (
    <div className="ConteProduits">
      <h2>{name}</h2>
      <div className="Productcontenair">
        {products?.map((param, index) => {
          return (
            <div key={index} className="carde">
              <Link
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "auto",
                }}
                to={`/ProductDet/${param._id}`}
              >
                <img src={param.image1} alt="loading" />
              </Link>
              <h6>{param.name.slice(0, 20)}...</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConteProduits;
