import React, { useState, useEffect } from "react";
import "./HeaderOne.css";
import { MessageCircle, ShoppingCart, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
function HeaderOne({ categories }) {
  const [produits, setProduits] = useState(0);

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);

  return (
    <div className="HeaderOne">
      <div className="one">
        <div className="h">
          <Link className="l" to="/Messages">
            <MessageCircle style={{ width: "40px" }} /> <span>5</span>
          </Link>
          <Link className="l" to="/Cart">
            <ShoppingCart style={{ width: "40px" }} />
            <span>{produits ? produits.length : 0}</span>
          </Link>
        </div>
      </div>
      <div className="two">
        <h2>Categories</h2>
        <div className="cardeCont">
          {categories.map((param, index) => {
            if (index <= 2) {
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
          })}

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
      <div className="search">
        <form>
          <input type="search" placeholder="Search" />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
}

export default HeaderOne;
