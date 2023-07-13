import React, { useState, useEffect } from "react";
import "./SearchOne.css";
import { MessageCircle, ShoppingCart, Search } from "react-feather";
import image1 from "../../Images/sac2.png";
import Navbar from "../NaveBar/Navbar";
import { useNavigate } from "react-router-dom";
function SearchOne({ op }) {
  const navigue = new useNavigate();
  const message = () => {
    navigue("/Messages");
  };

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
    <div className="SearchOne">
      <div
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          boxShadow: "0px 10px 10px white",
        }}
      >
        <div className="top">
          <div className="i" onClick={message}>
            <MessageCircle /> <span>5</span>
          </div>
          <div className="i" onClick={() => navigue("/Cart")}>
            <ShoppingCart /> <span>{produits ? produits.length : 0}</span>
          </div>
        </div>

        <div className="top1">
          <h2>Search </h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              op("deux");
            }}
            className="sear"
          >
            <input type="search" placeholder="" />
            <span>
              <Search />
            </span>
          </form>
          <div className="det">
            <h4>Recently viewed</h4>
            <h5>Clear</h5>
          </div>
        </div>

        <div className="prod">
          {[1, 2, 3, 4, 5, 6].map((param, index) => {
            return (
              <div key={index} className="carde">
                <img src={image1} alt="loading" />
                <div className="right">
                  <h4>Red Cotton Scarf</h4>
                  <h5>$11.00</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommended">
        <div className="top">
          <h4>Recommended</h4>
          <h5>Refresh</h5>
        </div>
        <div className="elements">
          {[
            "Denim Jaens",
            "mini skirt",
            "jacket",
            "Accessories",
            "Sport Accessories",
            "yoga pants",
            "Eye Shadow",
          ].map((param, index) => {
            return <h6 key={index}>{param}</h6>;
          })}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default SearchOne;
