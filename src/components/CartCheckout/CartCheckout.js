import React, { useState, useEffect } from "react";
import "./CartCheckout.css";
import { ChevronRight, X, CreditCard, Minus, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartCheckout({ op }) {
  const [choix, setChoix] = useState("");
  const [numero, setNumero] = useState("");
  const [numeroCard, setNumeroCard] = useState("");
  const [expiredCard, setExpiredCard] = useState("");
  const [operateur, setOperateur] = useState("");
  const [cvc, setCvc] = useState("");

  const [poppup, setPoppup] = useState(false);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");

  const [produits, setProduits] = useState(null);

  useEffect(() => {
    const local = localStorage.getItem("panier");

    if (local) {
      setProduits(JSON.parse(local));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://chagona.onrender.com/getAddressByUserKey/${a.id}`)
      .then((shippingAd) => {
        setEmail(shippingAd.data.address.email);
        setNom(shippingAd.data.address.name);
        setPhone(shippingAd.data.address.numero);
        setQuartier(shippingAd.data.address.quartier);
        setRegion(shippingAd.data.address.region);
        setPlus(shippingAd.data.address.description);
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .get(`https://chagona.onrender.com/getMoyentPaymentByClefUser/${a.id}`)
      .then((res) => {
        if (res.data.paymentMethod.type) {
          setChoix(res.data.paymentMethod.type);
        }
        if (res.data.paymentMethod.numeroCard) {
          setNumeroCard(res.data.paymentMethod.numeroCard);
        }
        if (res.data.paymentMethod.cvc) {
          setCvc(res.data.paymentMethod.cvc);
        }
        if (res.data.paymentMethod.phone) {
          setNumero(res.data.paymentMethod.phone);
        }
        if (res.data.paymentMethod.operateur) {
          setOperateur(res.data.paymentMethod.operateur);
        }
      })
      .catch((error) => console.log(error));
  }, []);

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

  const Plasser = () => {
    const local = localStorage.getItem("panier");

    if (local) {
      const pane = JSON.parse(local);
      let prod = [];
      for (let i = 0; i < pane.length; i++) {
        let ob = {
          produit: pane[i]?._id,
          quantite: pane[i]?.quantity,
          tailles: pane[i]?.sizes,
          couleurs: pane[i]?.colors,
        };
        prod.push(ob);
      }
      const data = {
        clefUser: a.id,
        nbrProduits: prod,
        prix: prix,
      };

      axios
        .post("https://chagona.onrender.com/createCommande", data)
        .then((res) => {
          // alert(res.data.message);
        })
        .catch((error) => console.log(error));
    }
    localStorage.removeItem("panier");
  };

  const navigue = useNavigate();
  return (
    <div className="CartCheckout">
      <div className="top">
        <X onClick={() => op("un")} style={{ width: "40px", height: "40px" }} />
      </div>
      <h2>Checkout</h2>
      <h5>Shipping Address</h5>

      <div className="ul">
        <ul onClick={() => navigue("/More/shipping_address")}>
          <li>{nom}</li>
          <li>{region}</li>
          <li>{Quartier}</li>
          <li>{plus}</li>
          <li>{email}</li>
          <li>{phone}</li>
        </ul>
        <div className="sp">
          <ChevronRight />
        </div>
      </div>

      <div className="payment" onClick={() => navigue("/More/payment_method")}>
        <div className="left">
          <h4>payment method</h4>
          <h2>
            <CreditCard style={{ color: "#FF6969" }} />
            {choix} {choix === "Mobile Money" ? phone : ""}{" "}
            {choix === "master Card" || choix === "Visa"
              ? `ending **${String(numeroCard).slice(-2)}`
              : ""}
          </h2>
        </div>
        <span>
          <ChevronRight className="c" />
        </span>
      </div>

      <h3 className="i">Items</h3>

      <div style={{ width: "100%", height: "auto" }}>
        {produits?.map((param, index) => {
          if (param.quantity === 0) {
            return null; // Ne pas afficher le produit si la quantité est 0
          }

          price = param.prixPromo > 0 ? param.prixPromo : param.prix;
          totalPrice = price * param.quantity;
          return (
            <div key={index} className="items">
              <img src={param.image1} alt="loading" />
              <div className="det">
                <h4>{param.name}</h4>
                <h6>
                  $ {totalPrice}
                  <button>
                    <span onClick={() => decrementQuantity(index)}>
                      <Minus />
                    </span>
                    {param.quantity}
                    <span onClick={() => incrementQuantity(index)}>
                      <Plus />
                    </span>
                  </button>
                </h6>
              </div>
            </div>
          );
        })}
      </div>

      <div className="codePro" onClick={() => setPoppup(!poppup)}>
        <h2>
          <CreditCard /> Add Promo Code
        </h2>
        <span>
          <ChevronRight />
        </span>
      </div>

      <div className="place">
        <div className="left">
          <h4>Total</h4>
          <h3>${prix} F</h3>
          <h5>Free Domestic Shipping</h5>
        </div>
        <button
          onClick={() => {
            op("trois");
            Plasser();
          }}
        >
          Place order{" "}
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>

      {poppup ? (
        <div className="poppupConte">
          <div className="poppup">
            <div className="top">
              <h3>Add Promo Code</h3>
              <span>
                <X onClick={() => setPoppup(!poppup)} />
              </span>
            </div>
            <div className="CodeClef">
              <input type="text" placeholder="tape the code here" />
              <button>Valider</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CartCheckout;
