import React from "react";
import "./Carts.css";
import { MessageCircle, ChevronRight, ShoppingCart } from "react-feather";
import Navbar from "../NaveBar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import LoadingIndicator from "../../Pages/LoadingIndicator ";

function Carts({ op }) {
  const navigue = new useNavigate();
  const message = () => {
    navigue("/Messages");
  };

  const [produits, setProduits] = useState(null);
  const [Vide, setVide] = useState(null);

  const calculateTotalPrice = () => {
    let total = 0;

    produits?.forEach((param) => {
      const price = param.prixPromo > 0 ? param.prixPromo : param.prix;
      total += price * param.quantity;
    });

    return total;
  };

  let prix = calculateTotalPrice();
  let price;
  let totalPrice;

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setVide(
        "Aucune produits selectionner veuiller vous rendre dans la section Orders pour vos commandes !"
      );
    }
  }, []);

  const incrementQuantity = (index) => {
    const updatedProducts = [...produits];
    updatedProducts[index].quantity += 1;
    setProduits(updatedProducts);
    localStorage.setItem("panier", JSON.stringify(updatedProducts));
  };

  const decrementQuantity = (index) => {
    const updatedProducts = [...produits];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProduits(updatedProducts);
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
    } else {
      updatedProducts.splice(index, 1); // Supprimer le produit du panier
      setProduits(updatedProducts);
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="Carts">
      <LoadingIndicator time={3000}>
        <div className="top">
          <div className="i" onClick={message}>
            <MessageCircle /> <span>5</span>
          </div>
          <div className="i">
            <ShoppingCart /> <span>{produits ? produits.length : 0}</span>
          </div>
        </div>

        <h2>Carts</h2>

        <div className="main">
          {produits?.map((param, index) => {
            if (param.quantity === 0) {
              return null; // Ne pas afficher le produit si la quantité est 0
            }

            price = param.prixPromo > 0 ? param.prixPromo : param.prix;
            totalPrice = price * param.quantity;

            return (
              <div key={index} className="carde">
                <img src={param.image1} alt="loading" />
                <div className="det">
                  <h3>{param.name}</h3>
                  {param.prixPromo > 0 ? (
                    <>
                      <h4 className="Lh">$ {param.prix}</h4>
                      <h5>$$ {param.prixPromo}</h5>
                    </>
                  ) : (
                    <>
                      <h5>$ {param.prix}</h5>
                    </>
                  )}
                  <button>
                    <span onClick={() => decrementQuantity(index)}>-</span>
                    {param.quantity}
                    <span onClick={() => incrementQuantity(index)}>+</span>
                  </button>
                  <h5 style={{ display: "inline-block", fontWeight: "bold" }}>
                    TT {totalPrice} f
                  </h5>
                </div>
              </div>
            );
          })}

          {Vide ? <h3 style={{ marginTop: 50 }}>{Vide}</h3> : <></>}
          {Vide ? (
            <button onClick={() => navigue("/Order")} className="btnC">
              Orders
            </button>
          ) : (
            <></>
          )}
        </div>

        {!Vide ? (
          <div className="bottom">
            <div className="left">
              <h2>Total</h2>
              <h3>${prix}</h3>
              <h4>Free Bomestic shipping</h4>
            </div>
            <div className="right">
              <button onClick={() => op("deux")}>
                Checkout{" "}
                <span>
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}

        <Navbar />
      </LoadingIndicator>
    </div>
  );
}

export default Carts;
