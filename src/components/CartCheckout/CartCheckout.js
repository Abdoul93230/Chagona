import React, { useState, useEffect } from "react";
import "./CartCheckout.css";
import { ChevronRight, X, CreditCard, Minus, Plus } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { handleAlert, handleAlertwar } from "../../App";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function CartCheckout({ op }) {
  const [choix, setChoix] = useState("");
  const [numero, setNumero] = useState("");
  const [rond, setRond] = useState(false);
  const [numeroCard, setNumeroCard] = useState("");
  const [expiredCard, setExpiredCard] = useState("");
  const [operateur, setOperateur] = useState("");
  const [cvc, setCvc] = useState("");
  const [codePro, setCodPro] = useState("");
  const [codeValide, setCodeValide] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [allPayment, setAllPayment] = useState([]);
  const [poppup, setPoppup] = useState(false);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");
  const [allProducts, setAllProduits] = useState(null);

  const [produits, setProduits] = useState(null);
  const navigue2 = useNavigate();
  // console.log("rdraaa", a);
  useEffect(() => {
    const local = localStorage.getItem("panier");

    if (local) {
      setProduits(JSON.parse(local));
    }
    if (local=== null || JSON.parse(local)?.length === 0) {


      navigue2('/home')
      return;
    }
  }, []);

  function generateUniqueID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro au début si le mois est < 10
    const day = String(now.getDate()).padStart(2, "0"); // Ajoute un zéro au début si le jour est < 10
    const hours = String(now.getHours()).padStart(2, "0"); // Ajoute un zéro au début si l'heure est < 10
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Ajoute un zéro au début si la minute est < 10
    const seconds = String(now.getSeconds()).padStart(2, "0"); // Ajoute un zéro au début si la seconde est < 10

    // Concatène les différentes parties pour former l'identifiant unique
    const uniqueID = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueID;
  }

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAddressByUserKey/${a.id}`)
      .then((shippingAd) => {
        setEmail(shippingAd.data.address.email);
        setNom(shippingAd.data.address.name);
        setPhone(shippingAd.data.address.numero);
        setQuartier(shippingAd.data.address.quartier);
        setRegion(shippingAd.data.address.region);
        setPlus(shippingAd.data.address.description);
      })
      .catch((error) => {
        // console.log(error.response);
      });

    axios
      .get(`${BackendUrl}/getMoyentPaymentByClefUser/${a.id}`)
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
      .catch((error) => {});

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

  const ValidCode = () => {
    if (codePro.length === 0) {
      alert("code invalide.");
      return;
    }
    setRond(true)
    // const encodedHashedCode = encodeURIComponent(codePro);
    axios
      .get(`${BackendUrl}/getCodePromoByHashedCode`, {
        params: {
          hashedCode: codePro,
        },
      })
      .then((code) => {
        // console.log(code);
        setRond(false)
        if (code.data.data.isValide) {
          setCodeValide(code.data.data);
          // console.log(code.data.data);
          setPoppup(!poppup);
        } else {
          handleAlertwar("ce code la a expire.");
          // console.log(code.data.data);
          setPoppup(!poppup);
        }
      })
      .catch((error) => {
        handleAlertwar("ce code de promo n'exite pas");
        setPoppup(!poppup);
        setRond(false)
      });
  };
  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  const calculateTotalPrice = () => {
    let total = 0;

    produits?.forEach((param) => {
      const price = param.prixPromo > 0 ? param.prixPromo : param.prix;
      total += price * param.quantity;
    });

    return total;
  };

  let prix = calculateTotalPrice();

  let pric = 0;
  let total = 0;

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

    setLoading(true);
    if (local=== null || JSON.parse(local)?.length === 0) {
      handleAlertwar("Aucun produit n'est selectionner.");
      setLoading(false);
      navigue('/home')
      return;
    }
    if (phone?.length <= 0) {
      setLoading(false);
      navigue("/More/shipping_address?fromCart=true");
      return;
    }
    if (choix?.length <= 0) {
      setLoading(false);
      navigue("/More/payment_method?fromCart=true");

      return;
    }

    if (local) {
      const pane = JSON.parse(local);
      let prod = [];
      for (let i = 0; i < produits.length; i++) {
        let ob = {
          produit: produits[i]?.id,
          quantite: produits[i]?.quantity,
          tailles: produits[i]?.sizes,
          couleurs: produits[i]?.colors,
        };
        prod.push(ob);
      }
      let data = {
        clefUser: a.id,
        nbrProduits: prod,
        prix: total,
      };
      if (codeValide) {
        if (codeValide.isValide) {
          data.codePro = true;
          data.idCodePro = codeValide?._id;
        }
      }

      // console.log(data);
      if (choix.length > 0) {
        const uniqueID = generateUniqueID();
        const dataToSend = {
          name: a?.name,
          currency: "XOF",
          country: "NE",
          total: total ? total : "",
          transaction_id: uniqueID,
          choix: choix,
          numeroCard: numeroCard,
          phone: numero,
        };
        data.reference = uniqueID;

        if (
          choix === "Visa" ||
          choix === "Master Card" ||
          choix === "Mobile Money"
        ) {
          axios
            .post(`${BackendUrl}/payments`, dataToSend)
            .then((response) => {
              const ref = response.data.data.reference;
              alert("success");
              axios
                .get(`${BackendUrl}/payments/`)
                .then((res) => {
                  setAllPayment(res.data.data);

                  if (
                    res.data.data.find((item) => item.reference === ref)
                      .status != "Failed"
                    // ||
                    // res.data.data.find((item) => item.reference === ref)
                    //   .status != "Initiated"
                  ) {
                    axios
                      .post(`${BackendUrl}/createCommande`, data)
                      .then((resp) => {
                        // alert(resp.data.message);
                        setLoading(false);
                        localStorage.removeItem("panier");
                        if (codeValide) {
                          if (codeValide.isValide) {
                            axios
                              .put(`${BackendUrl}/updateCodePromo`, {
                                codePromoId: codeValide._id,
                                isValide: false,
                              })
                              .then(() => {
                                // console.log("fait")
                              })
                              .catch((error) => console.log(error));
                          }
                        }
                        op("trois");
                      })
                      .catch((error) => {
                        setLoading(false);
                        console.log("errrr", error);
                      });
                    console.log("Réponse de l'API:", response);
                  } else {
                    setLoading(false);
                    handleAlertwar(
                      "le payment na pas pu etre effectuer veuiller ressayer !"
                    );
                    return;
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  console.log(error);
                });
            })
            .catch((error) => {
              setLoading(false);
              console.log(
                "Erreur lors de la requête:",
                error.response ? error.response.data : error.message,
                error
              );
            });
        } else if (choix === "Payment a domicile") {
          axios
            .post(`${BackendUrl}/createCommande`, data)
            .then((res) => {
              // alert(res.data.message);
              setLoading(false);
              localStorage.removeItem("panier");
              if (codeValide) {
                if (codeValide.isValide) {
                  axios
                    .put(`${BackendUrl}/updateCodePromo`, {
                      codePromoId: codeValide._id,
                      isValide: false,
                    })
                    .then(() => {
                      setLoading(false);
                      // console.log("fait")
                    })
                    .catch((error) => {
                      setLoading(false);
                      console.log(error);
                    });
                }
              }
              op("trois");
            })
            .catch((error) => {
              setLoading(false);
              console.log("errrr", error);
            });
        }
      } else {
        setLoading(false);
        alert("les infos du payment ne sont pas encore mis");
        return;
      }
    }
  };

  const navigue = useNavigate();
  return (
    <div className="CartCheckout">
      <LoadingIndicator loading={loading}>
        <div className="top">
          <X
            onClick={() => {
              op("un");
              navigue("/Cart");
            }}
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <h2>Checkout</h2>
        <h5>Shipping Address</h5>

        <div className="ul">
          <ul onClick={() => navigue(`/More/shipping_address?fromCart=true`)}>
            <li>{nom}</li>
            <li>{region}</li>
            <li>{Quartier}</li>
            <li>{plus}</li>
            <li>{email}</li>
            <li>{phone}</li>
            {nom.length <= 0 ? (
              <li>veuiller configurere votre Address</li>
            ) : (
              <></>
            )}
          </ul>
          <div className="sp">
            <ChevronRight />
          </div>
        </div>

        <div
          className="payment"
          onClick={() => navigue("/More/payment_method?fromCart=true")}
        >
          <div className="left">
            <h4>payment method</h4>
            <h2>
              <CreditCard style={{ color: "#FF6969" }} />
              {choix} {choix === "Mobile Money" ? numero : ""}{" "}
              {choix === "master Card" || choix === "Visa"
                ? `ending **${String(numeroCard).slice(-2)}`
                : ""}
              {choix.length <= 0 ? (
                "veuiller configurere votre moyen de payment"
              ) : (
                <></>
              )}
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

            pric =
              allProducts?.find((item) => item._id === param.id).prixPromo > 0
                ? allProducts?.find((item) => item._id === param.id).prixPromo
                : allProducts?.find((item) => item._id === param.id).prix;
            total += pric * param.quantity;

            return (
              <div key={index} className="items">
                <img
                  src={
                    allProducts?.find((item) => item._id === param.id).image1
                  }
                  alt="loading"
                />
                <div className="det">
                  <h4>
                    {allProducts?.find((item) => item._id === param.id).name}
                  </h4>
                  <h6>
                    cfa{" "}
                    {allProducts?.find((item) => item._id === param.id)
                      .prixPromo > 0
                      ? allProducts?.find((item) => item._id === param.id)
                          .prixPromo * param.quantity
                      : allProducts?.find((item) => item._id === param.id)
                          .prix * param.quantity}
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
            <h3>cfa{total} F</h3>
            {codeValide ? (
              <h5 style={{ marginTop: -5 }}>
                reduction: {codeValide.prixReduiction} f
              </h5>
            ) : (
              ""
            )}
            {/* <h5>Free Domestic Shipping</h5> */}
            <h5>{total>1000?'shipping : 1000 Niamey':total>20000?"shipping : 1500 Niamey":"Free Bomestic shipping"}</h5>
          </div>
          <button
            onClick={() => {
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
                <input
                  type="text"
                  placeholder="tape the code here"
                  value={codePro}
                  onChange={(e) => setCodPro(e.target.value)}
                />
                <button onClick={ValidCode}>
                  {
                    rond?<div style={spinnerStyle}></div>:'Valider'
                  }
                  </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </LoadingIndicator>
    </div>
  );
}

export default CartCheckout;
