import React from "react";
import "./HeaderOne.css";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
function HeaderOne({ categories }) {
  return (
    <div className="HeaderOne">
      <div className="two">
        <h2>Categories</h2>
        <div className="cardeCont">
          {categories && categories.length > 0 ? (
            categories.map((param, index) => {
              if (index < 6 && param.name !== "tous") {
                return (
                  <Link
                    key={index}
                    to={`/Categorie/${param.name}`}
                    className="li"
                  >
                    <div
                      className="carde"
                      style={{
                        boxShadow: `0px 0px 10px #FF6262`,
                      }}
                    >
                      <img src={param.image} alt="loading" />
                    </div>
                    <span>{param.name}</span>
                  </Link>
                );
              } else {
                return null;
              }
            })
          ) : (
            <></>
          )}

          <Link to="/Categories" className="li">
            <div
              className="carde"
              style={{
                boxShadow: `0px 0px 10px #E7EAF0`,
              }}
            >
              <ChevronRight
                style={{ width: "70px", color: "red", fontWeight: "bolder" }}
              />
            </div>
            <span>See All</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderOne;
