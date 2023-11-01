import React, { useEffect, useState } from "react";
import "./PaymentMethode.css";
import { ChevronLeft, CreditCard } from "react-feather";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function PaymentMethode() {
  const [choix, setChoix] = useState("");
  const [numero, setNumero] = useState("");
  const [numeroCard, setNumeroCard] = useState("");
  const [expiredCard, setExpiredCard] = useState("");
  const [operateur, setOperateur] = useState("");
  const [cvc, setCvc] = useState("");
  const regexPhone = /^[0-9]{8,}$/;
  const a = JSON.parse(localStorage.getItem(`userEcomme`));

  const handleAlert = (message) => {
    toast.success(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAlertwar = (message) => {
    toast.warn(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
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
        if (res.data.paymentMethod.expire) {
          setExpiredCard(res.data.paymentMethod.expire);
        }
      })
      .catch((error) => {});
  }, []);

  function goBack() {
    window.history.back();
  }

  const envoyer = (e) => {
    e.preventDefault();
    const data = { clefUser: a.id };

    // if (!choix) {
    //   alert("veuiller choisir un moyen de payment.");
    //   return;
    // }
    // if (choix === "Visa") {
    //   const option = "Visa";
    //   data.option = option;

    //   if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(numeroCard)) {
    //     alert("le numero de la carte n'est pas valide1");
    //     return;
    //   }
    //   if (!/^[0-9]{3}$/.test(cvc)) {
    //     alert("le code de la carte n'est pas valide");
    //     return;
    //   }
    //   if (expiredCard.length <= 0) {
    //     alert("veuiller selectionner la date d'expiration");
    //     return;
    //   }
    //   data.numeroCard = numeroCard;
    //   data.cvc = cvc;
    //   data.expire = expiredCard;
    // } else if (choix === "master Card") {
    //   const option = "master Card";
    //   data.option = option;
    //   if (!/^(?:5[1-5][0-9]{14})$/.test(numeroCard)) {
    //     alert("le numero de la carte n'est pas valide2");
    //     return;
    //   }
    //   if (!/^[0-9]{3}$/.test(cvc)) {
    //     alert("le code de la carte n'est pas valide");
    //     return;
    //   }
    //   if (expiredCard.length <= 0) {
    //     alert("veuiller selectionner la date d'expiration");
    //     return;
    //   }
    //   data.numeroCard = numeroCard;
    //   data.cvc = cvc;
    //   data.expire = expiredCard;
    // } else if (choix === "Mobile Money") {
    //   const option = "Mobile Money";
    //   data.option = option;
    //   if (!regexPhone.test(numero.toString())) {
    //     return alert("forma du numero non valid!");
    //   }
    //   if (
    //     operateur === null ||
    //     operateur === "choisir" ||
    //     operateur.length <= 0
    //   ) {
    //     alert("veuiller choisir votre operateur.");
    //     return;
    //   }
    //   data.numero = numero;
    //   data.operateur = operateur;
    // } else if (choix === "Payment a domicile") {
    //   const option = "Payment a domicile";
    //   data.option = option;
    // } else {
    // }

    const option = "Payment a domicile";
    data.option = option;

    axios
      .post(`${BackendUrl}/createMoyentPayment`, data)
      .then((res) => {
        handleAlert(res.data.message);
      })
      .catch((error) => console.log(error));

    // console.log(data);
  };

  const options =
    choix === "master Card" ? (
      <div className="carte">
        <form onSubmit={envoyer}>
          <h3>
            <span>Payment Details</span> <span>master Card</span>
          </h3>
          <div className="top">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              value={numeroCard}
              onChange={(e) => {
                setNumeroCard(e.target.value);
              }}
              placeholder="Valid Card Number"
              id="number"
            />
          </div>
          <div className="bottom">
            <div className="left e">
              <label htmlFor="date">Expiration Date</label>
              <input
                id="date"
                onChange={(e) => {
                  setExpiredCard(e.target.value);
                }}
                type="date"
              />
            </div>
            <div className="right e">
              <label htmlFor="password">CV CODE</label>
              <input
                id="password"
                value={cvc}
                onChange={(e) => {
                  setCvc(e.target.value);
                }}
                type="password"
                placeholder="CVC"
              />
            </div>
          </div>
          <input type="submit" onSubmit={envoyer} value="Submit" />
        </form>
      </div>
    ) : choix === "Visa" ? (
      <div className="carte">
        <form onSubmit={envoyer}>
          <h3>
            <span>Payment Details</span> <span>Visa</span>
          </h3>
          <div className="top">
            <label htmlFor="number">Card Number</label>
            <input
              value={numeroCard}
              onChange={(e) => {
                setNumeroCard(e.target.value);
              }}
              type="text"
              placeholder="Valid Card Number"
              id="number"
            />
          </div>
          <div className="bottom">
            <div className="left e">
              <label htmlFor="date">Expiration Date</label>
              <input
                // value={expiredCard}
                onChange={(e) => {
                  setExpiredCard(e.target.value);
                }}
                id="date"
                type="date"
              />
            </div>
            <div className="right e">
              <label htmlFor="password">CV CODE</label>
              <input
                id="password"
                type="password"
                value={cvc}
                onChange={(e) => {
                  setCvc(e.target.value);
                }}
                placeholder="CVC"
              />
            </div>
          </div>
          <input type="submit" onSubmit={envoyer} value="Submit" />
        </form>
      </div>
    ) : choix === "Payment a domicile" ? (
      <div className="domicile">
        <h3>Payment a domicile</h3>
        <button onClick={envoyer}>Valide</button>
      </div>
    ) : choix === "Mobile Money" ? (
      <div className="mobile">
        <h3>Mobile Money</h3>
        <form onSubmit={envoyer}>
          <label htmlFor="operateur">
            Operateur Mobile:{operateur ? operateur : ""}
          </label>
          <select
            onChange={(e) => {
              setOperateur(e.target.value);
            }}
            id="operateur"
          >
            <option>choisir</option>
            <option>Airtel</option>
            <option>Orange</option>
            <option>Moov</option>
          </select>
          <label htmlFor="number">Phone Number</label>
          <input
            type="number"
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value);
            }}
            placeholder="Tape Here"
            id="number"
          />
          <div className="btn">
            <input type="submit" onSubmit={envoyer} value="Submit" />
          </div>
        </form>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="PaymentMethode">
      <div className="top">
        <ChevronLeft className="i" onClick={goBack} />
      </div>
      <h2>Payment Methode</h2>
      <div className="cardeCont">
        {["master Card", "Visa", "Payment a domicile", "Mobile Money"].map(
          (param, index) => {
            return (
              <div
                className="carde"
                key={index}
                onClick={() => {
                  if (
                    param === "master Card" ||
                    param === "Visa" ||
                    param === "Mobile Money"
                  ) {
                    handleAlertwar("L'Option Sera Bientot Disponible");
                  } else {
                    setChoix(param);
                  }
                }}
              >
                <div className="left">
                  <input type="checkbox" defaultChecked={false} />
                </div>
                <div className="right">
                  <span>
                    <CreditCard className="i" />
                  </span>
                  <h6>{param}</h6>
                </div>
              </div>
            );
          }
        )}
      </div>

      {options}
      {/* <button
        type="button"
        className="ipaymoney-button"
        data-amount="100"
        data-environement="live" // Notez la correction de "environement" à "environment"
        data-key="pk_f83a240bd0df4393b35a819925863e16"
        data-transaction-id="unique par compte"
        data-redirect-url="/home" //lien de redirection après paiement
        data-callback-url="/profile"
        // onClick={handlePayment}
      >
        CheckOut
      </button> */}
      <ToastContainer />
    </div>
  );
}

export default PaymentMethode;
