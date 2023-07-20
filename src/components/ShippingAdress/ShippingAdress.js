import React, { useEffect, useState } from "react";
import "./ShippingAdress.css";
import { ChevronLeft } from "react-feather";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function ShippingAdress() {
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [Quartier, setQuartier] = useState("");
  const [plus, setPlus] = useState("");
  function goBack() {
    window.history.back();
  }
  useEffect(() => {
    const a = JSON.parse(localStorage.getItem(`userEcomme`));
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
  }, []);

  const envoyer = (e) => {
    e.preventDefault();
    if (nom.trim().length < 3) {
      alert("Votre nom doit etre superieur ou inferieur a 3 caracteres");
      return;
    }
    if (!regexMail.test(email)) {
      alert("forma du mail non valid!");
      return;
    }
    if (!regexPhone.test(phone.toString())) {
      alert("forma du numero non valid!");
      return;
    }
    if (region.trim().length <= 0 || region.trim() === "choisir") {
      alert("Vous avez pas selectionner votre region.");
      return;
    }
    if (Quartier.trim().length <= 2) {
      alert("Vous avez pas bien fourni votre nom de quartier.");
      return;
    }

    const a = JSON.parse(localStorage.getItem(`userEcomme`));

    const obj = {
      name: nom,
      email: email,
      numero: phone,
      region: region,
      quartier: Quartier,
      clefUser: a.id,
    };
    if (plus.length !== 0) {
      obj.description = plus;
    }

    axios
      .post(`${BackendUrl}/createOrUpdateAddress`, obj)
      .then((shipping) => {
        alert(shipping.data.message);
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
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div className="ShippingAdress">
      <div className="ret">
        <ChevronLeft className="rete" onClick={goBack} />
      </div>
      <h2>Shipping Adress</h2>
      <form onSubmit={envoyer}>
        <div className="left E">
          <label htmlFor="region">Name :</label>
          <input
            type="text"
            required
            id="name"
            placeholder="votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <label htmlFor="region">
            Region : {region.length !== 0 ? region : ""}
          </label>
          {/* <input type="text" required id="region" placeholder="Tape Here" /> */}
          <select
            id="region"
            style={{ width: "90%", marginRight: "10px", fontWeight: "bold" }}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>choisir</option>
            <option>Niamey</option>
            <option>Maradi</option>
            <option>Zinder</option>
            <option>Difa</option>
            <option>Agadez</option>
            <option>Dosso</option>
            <option>Tillaberi</option>
            <option>Tahoua</option>
          </select>
          <label htmlFor="quartier">Quartier :</label>
          <input
            type="text"
            required
            id="quartier"
            placeholder="Tape Here"
            value={Quartier}
            onChange={(e) => setQuartier(e.target.value)}
          />
        </div>
        <div className="right E">
          <label htmlFor="region">Email :</label>
          <input
            type="email"
            id="email"
            placeholder="Tape Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="quartier">Phone :</label>
          <input
            type="Number"
            required
            id="quartier"
            placeholder="Tape Here"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="plus">Plus de details :</label>
          <textarea
            placeholder="Details sur vorte localite"
            value={plus}
            onChange={(e) => setPlus(e.target.value)}
          />
        </div>
      </form>
      <button onClick={envoyer}>Submit</button>
    </div>
  );
}

export default ShippingAdress;
