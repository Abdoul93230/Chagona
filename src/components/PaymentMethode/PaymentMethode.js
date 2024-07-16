import React, { useEffect, useState } from "react";
import "./PaymentMethode.css";
import { ChevronLeft, Home, } from "react-feather";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAlert, handleAlertwar } from "../../App";
import Visa from "../../Images/visalogo-removebg-preview.png";
import Master from "../../Images/logo-master-card-removebg-preview.png";
import Phone from "../../Images/Phone1-removebg-preview.png";
import Airtel from "../../Images/Airtel_logo-01.png"
import Moov from "../../Images/Moov2.png"
import Zamani from "../../Images/Zamani1.png"
import Mtn from "../../Images/Mtn1.png"
const BackendUrl = process.env.REACT_APP_Backend_Url;
function PaymentMethode() {
  const [choix, setChoix] = useState("");
  const [numero, setNumero] = useState("");
  const [numeroCard, setNumeroCard] = useState("");
  const [expiredCard, setExpiredCard] = useState("");
  const [operateur, setOperateur] = useState("");
  const [cvc, setCvc] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [rond, setRond] = useState(false);
  const regexPhone = /^[0-9]{8,}$/;
  const location = useLocation();
  const navigue = useNavigate();
  const a = JSON.parse(localStorage.getItem(`userEcomme`));

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getMoyentPaymentByClefUser/${a.id}`)
      .then((res) => {
        // console.log(res.data.paymentMethod)
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
          if(res.data.paymentMethod.operateur==='Airtel')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='Orange')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='Moov')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='227')
            setOperateur('227');
          if(res.data.paymentMethod.operateur==='229')
            setOperateur('229');

        }
        if (res.data.paymentMethod.expire) {
          setExpiredCard(res.data.paymentMethod.expire);
        }
      })
      .catch((error) => {});
  }, []);

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  function goBack() {
    window.history.back();
  }

  const envoyer = (e) => {
    e.preventDefault();
    const data = { clefUser: a.id };
    setOnSubmit(true)
    if (!choix) {
      handleAlertwar("veuiller choisir un moyen de payment.");
      return;
    }
    if (choix === "Visa") {
      const option = "Visa";
      data.option = option;

      if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(numeroCard)) {
        handleAlertwar("le numero de la carte n'est pas valide1");
        return;
      }
      if (!/^[0-9]{3}$/.test(cvc)) {
        handleAlertwar("le code de la carte n'est pas valide");
        return;
      }
      if (expiredCard.length <= 0) {
        handleAlertwar("veuiller selectionner la date d'expiration");
        return;
      }
      data.numeroCard = numeroCard;
      data.cvc = cvc;
      data.expire = expiredCard;
    } else if (choix === "master Card") {
      const option = "master Card";
      data.option = option;
      if (!/^(?:5[1-5][0-9]{14})$/.test(numeroCard)) {
        handleAlertwar("le numero de la carte n'est pas valide2");
        return;
      }
      if (!/^[0-9]{3}$/.test(cvc)) {
        handleAlertwar("le code de la carte n'est pas valide");
        return;
      }
      if (expiredCard.length <= 0) {
        handleAlertwar("veuiller selectionner la date d'expiration");
        return;
      }
      data.numeroCard = numeroCard;
      data.cvc = cvc;
      data.expire = expiredCard;
    } else if (choix === "Mobile Money") {
      const option = "Mobile Money";
      data.option = option;
      if (!regexPhone.test(numero.toString())) {
        return handleAlertwar("forma du numero non valid!");
      } else if (numero.length < 8 && operateur==="227") {

        handleAlertwar(
          "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Niger"
        );
        return;
      }else if (numero.length < 8 && operateur==="229") {
        console.log(2)
        handleAlertwar(
          "Le numéro de l'utilisateur doit contenir au moins 8 chiffres Benin"
        );
        return;
      }
       else if (numero.length === 8) {

        // Ajouter le préfixe "227" au début du numéro
        const userNumber = operateur==="227"? "227" + numero :"229" + numero;
        setNumero(userNumber);
        data.numero = userNumber;
      } else if (numero.length === 11) {
        data.numero = operateur + numero.substring(3, numero.length);
        // Vérifier si le préfixe est "227"
        if (numero.substring(0, 3) !== "227" && numero.substring(0, 3) !== "229") {
          handleAlertwar(
            "Le préfixe du numéro de l'utilisateur doit être '227 ou 229'"
          );
          return;
        }
      } else if (numero.length > 11) {

        handleAlertwar(
          "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
        );
        return;
      } else if (numero.length > 8 && numero.length < 11) {

        handleAlertwar(
          "Le numéro doit contenir 8, ou 11 chiffres avec l'identifiant"
        );
        return;
      }else{

        data.numero = numero;
      }

      data.operateur = operateur==="227"? '227' : '229';
    } else if (choix === "Payment a domicile") {
      const option = "Payment a domicile";
      data.option = option;
    } else {
    }

    axios
      .post(`${BackendUrl}/createMoyentPayment`, data)
      .then((res) => {
        handleAlert(res.data.message);
        setOnSubmit(false)
        const fromCartParam = new URLSearchParams(location.search).get(
          "fromCart"
        );
        if (fromCartParam === "true") {
          navigue(`/Cart?fromCart=true`);
          return;
        } else {
        }
      })
      .catch((error) => {
        setOnSubmit(false)
        console.log(error)});

    // console.log(data);
  };

  const optionS = operateur === "227"
    ? [
        { value: "227", label: "227" },
        { value: "229", label: "229" }
      ]
    : [
        { value: "229", label: "229" },
        { value: "227", label: "227" }
      ];

      const handleChange = (e) => {
        setOperateur(e.target.value);
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
          {
                    onSubmit?<div style={spinnerStyle}></div>:<input type="submit" onSubmit={envoyer} value="Submit" />
                  }

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
          {
                    onSubmit?<div style={spinnerStyle}></div>:<input type="submit" onSubmit={envoyer} value="Submit" />
                  }

        </form>
      </div>
    ) : choix === "Payment a domicile" ? (
      <div className="domicile">
        <h3>Payment a domicile</h3>
        {
                    onSubmit?<div style={spinnerStyle}></div>:<button onClick={envoyer}>Valide</button>
                  }

      </div>
    ) : choix === "Mobile Money" ? (
      <div className="mobile">
        <div className="MC">

        <h3>Mobile Money</h3>

<div className="img">
<img src={Airtel} alt="loading"/>
<img src={Moov} alt="loading"/>
<img src={Zamani} alt="loading"/>
<img src={Mtn} alt="loading"/>
</div>
</div>
        <form onSubmit={envoyer}>
          {/* <label htmlFor="operateur">
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
          </select> */}


          <label htmlFor="number">Compte Mobile Money</label>

          <div className="num">
          <select

              onChange={handleChange}

            id="operateur"
          >
            {optionS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

          </select>

          <input
            type="number"
            value={numero.length>8&&(numero.substring(0, 3)==='227' || numero.substring(0, 3)==='229')?numero.substring(3, numero.length):numero}
            onChange={(e) => {
              setNumero(e.target.value);
            }}
            placeholder="Tape Here"
            id="number"
          />
          </div>
          <div className="btn">
          {
                    onSubmit?<div style={spinnerStyle}></div>:<input type="submit" onSubmit={envoyer} value="Submit" />
                  }

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
                  // if (
                  //   param === "master Card" ||
                  //   param === "Visa" ||
                  //   param === "Mobile Money"
                  // ) {
                  //   handleAlertwar("L'Option Sera Bientot Disponible");
                  // } else {
                  setChoix(param);
                  // }
                }}
              >
                <div className="left">
                  <input
                    type="checkbox"
                    checked={param === choix ? true : false}
                    style={{ backgroundColor: "#ff6969", padding: 10 }}
                  />
                </div>
                <div className="right">
                  <span>
                    {param === "Visa" ? (
                      <img src={Visa} className="ii" alt="loading" />
                    ) : param === "master Card" ? (
                      <img src={Master} className="ii" alt="loading" />
                    ) : param === "Payment a domicile" ? (
                      <Home className="i" />
                    ) : (
                      <img src={Phone} className="ii" alt="loading" />
                    )}
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
    </div>
  );
}

export default PaymentMethode;
