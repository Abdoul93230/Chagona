import React, { useState } from "react";
import "./AddFournisseurs.css";
import axios from "axios";
import image1 from "../../Images/sac2.png";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function AddFournisseur() {
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

  const [photo, setPhoto] = useState(null);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [quartier, setQuartier] = useState("");
  const [message, setMessage] = useState("");

  const createFournisseur = (e) => {
    e.preventDefault();

    if (nom.trim().length < 2) {
      alert("Le nom du fournisseur doit comporter au moins 2 caractères");
      return;
    }

    if (!regexMail.test(email)) {
      alert("Le format de l'adresse e-mail n'est pas valide");
      return;
    }

    if (!regexPhone.test(phone.toString())) {
      alert("Le format du numéro de téléphone n'est pas valide");
      return;
    }

    if (region.trim().length < 4) {
      alert("Le nom de la région doit comporter au moins 4 caractères");
      return;
    }

    if (quartier.trim().length < 3) {
      alert("Le nom du quartier doit comporter au moins 3 caractères");
      return;
    }

    const formData = new FormData();

    formData.set("name", nom);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("region", region);
    formData.set("quartier", quartier);
    if (photo) {
      formData.set("image", photo);
    }

    axios
      .post(`${BackendUrl}/fournisseur`, formData)
      .then((res) => {
        // console.log(res);
        alert(res.data.message);
      })
      .catch((error) => {
        // alert(error.response.data.message);
        console.log(error);
      });
    // console.log(photo);
  };

  return (
    <div className="AddFournisseur">
      <div className="left">
        <label htmlFor="image">
          <img src={image1} alt="loading" style={{ cursor: "pointer" }} />
        </label>
        <input
          type="file"
          id="image"
          style={{ display: "none" }}
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
        />

        <input
          className="n"
          type="text"
          placeholder="Nom Du Fournisseur"
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />

        <div className="AddStore">
          <h2>Create an Store !</h2>
          <form>
            <label>
              Name of Store
              <input type="texe" placeholder="tape here" required />
            </label>
            <label>
              Slug of Store
              <input type="texe" placeholder="tape here" required />
            </label>
            <label>
              Image/logo of Store
              <input type="file" required />
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div className="right">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="email"
                  placeholder="abdourazak9323@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="+227 87727501"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>region</th>
              <th>Quartier</th>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Niamey"
                  onChange={(e) => {
                    setRegion(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Saga"
                  onChange={(e) => {
                    setQuartier(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={createFournisseur}>
          <label htmlFor="comment">Lui ecrire un Email :</label>
          <textarea
            value={message}
            id="comment"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddFournisseur;
