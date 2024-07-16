import React from "react";
import "./Carts.css";
import { MessageCircle, ChevronRight, ShoppingCart } from "react-feather";
import Navbar from "../NaveBar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import { useSelector } from "react-redux";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function Carts({ op }) {
  const navigue = new useNavigate();
  const message = () => {
    navigue("/Messages");
  };

  const [produits, setProduits] = useState(null);
  const [produitIds, setProduitIds] = useState(null);
  const [allProducts, setAllProduits] = useState(null);
  const [Vide, setVide] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const DATA_Products = useSelector((state) => state.products.data);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));

  // const calculateTotalPrice = () => {
  //   let total = 0;

  //   produits?.forEach((param) => {
  //     const price = param.prixPromo > 0 ? param.prixPromo : param.prix;
  //     total += price * param.quantity;
  //   });

  //   return total;
  // };

  // let prix = calculateTotalPrice();
  // let prix;
  let price;
  let totalPrice;
  let pric = 0;
  let total = 0;

  useEffect(() => {
    const fromCartParam = new URLSearchParams(location.search).get("fromCart");
    if (fromCartParam === "true") {
      op(`deux`);
      return;
    } else {
    }
    if (a) {
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${a.id}`)
        .then((res) => {
          setAllMessage(
            res.data.filter(
              (item) => item.lusUser == false && item.provenance === false
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local && JSON.parse(local).length !== 0) {
      setProduits(JSON.parse(local));
      // console.log(JSON.parse(local).filter((param) => param.id));
      const a = JSON.parse(local).map((para) => para.id);
      setProduitIds(a);
      // console.log(produitIds);
    } else {
      setVide(
        "Aucune produits selectionner veuiller vous rendre dans la section Orders pour vos commandes !"
      );
    }

    axios
      .get(`${BackendUrl}/products`)
      .then((products) => {
        setAllProduits(products.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
      });
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
    <LoadingIndicator loading={loading}>
      <div className="Carts">
        <div className="top">
          <div className="i" onClick={message}>
            <MessageCircle style={{ width: "40px" }} />{" "}
            <span>{allMessage.length > 0 ? allMessage.length : 0}</span>
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

            pric =
              allProducts?.find((item) => item._id === param.id)?.prixPromo > 0
                ? allProducts?.find((item) => item._id === param.id)?.prixPromo
                : allProducts?.find((item) => item._id === param.id)?.prix;
            total += pric * param.quantity;

            price =
              allProducts?.find((item) => item._id === param.id)?.prixPromo > 0
                ? allProducts?.find((item) => item._id === param.id)?.prixPromo
                : allProducts?.find((item) => item._id === param.id)?.prix;
            totalPrice = price * param.quantity;

            return (
              <div key={index} className="carde">
                <img
                  src={
                    allProducts?.find((item) => item._id === param.id)?.image1
                  }
                  alt="loading"
                />
                <div className="det">
                  <h3>
                    {allProducts?.find((item) => item._id === param.id)?.name.slice(0, 20)}...
                  </h3>
                  {allProducts?.find((item) => item._id === param.id)
                    ?.prixPromo > 0 ? (
                    <>
                      <h4 className="Lh">
                        cfa{" "}
                        {
                          allProducts?.find((item) => item._id === param.id)
                            ?.prix
                        }
                      </h4>
                      <h5>
                        cfa{" "}
                        {
                          allProducts?.find((item) => item._id === param.id)
                            ?.prixPromo
                        }
                      </h5>
                    </>
                  ) : (
                    <>
                      <h5>
                        cfa{" "}
                        {
                          allProducts?.find((item) => item._id === param.id)
                            ?.prix
                        }
                      </h5>
                    </>
                  )}
                  <button>
                    <span onClick={() => decrementQuantity(index)}> - </span>
                    {param.quantity}
                    <span onClick={() => incrementQuantity(index)}> + </span>
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
              <h3>cfa {total}</h3>
              <h4>{total>1000?'shipping : 1000 Niamey':total>20000?"shipping : 1500 Niamey":"Free Bomestic shipping"}</h4>
            </div>
            <div className="right">
              <button
                onClick={() => {
                  if (a) {
                    op("deux");
                  } else {
                    navigue("/connection?fromCart=true");
                  }
                }}
              >
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
      </div>
    </LoadingIndicator>
  );
}

export default Carts;
