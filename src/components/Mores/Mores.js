import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, ChevronRight, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import "./Mores.css";
import { useNavigate } from "react-router-dom";

function Mores() {
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
    <div className="Mores">
      <div className="top">
        <div className="l" onClick={message}>
          <MessageCircle />
          <span>5</span>
        </div>
        <div className="l" onClick={() => navigue("/Cart")}>
          <ShoppingCart />
          <span>{produits ? produits.length : 0}</span>
        </div>
      </div>

      <h2>More</h2>

      <ul>
        {[
          { name: "shipping address", link: "/More/shipping_address" },
          { name: "payment method", link: "/More/payment_method" },
          {
            name: "Notification settings",
            link: "/More/Notification_settings",
          },
          { name: "privacy notice", link: "/More/privacy_notice" },
          {
            name: "frequently asked questions",
            link: "/More/frequently_asked_questions",
          },
          { name: "legal infomation", link: "/More/legal_infomation" },
        ].map((param, index) => {
          return (
            <Link to={param.link} className="li" key={index}>
              <span>
                <Menu />
              </span>
              <ol>
                {param.name}{" "}
                <span>
                  <ChevronRight />
                </span>
              </ol>
            </Link>
          );
        })}
      </ul>

      <h3>Log out</h3>
    </div>
  );
}

export default Mores;
