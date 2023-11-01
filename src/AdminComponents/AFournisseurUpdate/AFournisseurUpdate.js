import React, { useEffect, useState } from "react";
import "./AFournisseurUpdate.css";
import axios from "axios";
import image1 from "../../Images/sac2.png";
import { useParams, useNavigate } from "react-router-dom";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function AFournisseurUpdate() {
  const params = useParams();
  const navigue = useNavigate();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

  const [photo, setPhoto] = useState(null);
  const [imP, setImp] = useState(image1);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [quartier, setQuartier] = useState("");
  const [fournisseur, setFournisseur] = useState(null);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/fournisseur/${params.id}`)
      .then((res) => {
        setFournisseur(res.data.data);
        if (nom.length <= 0) {
          setNom(res.data.data.name);
        }
        if (email.length <= 0) {
          setEmail(res.data.data.email);
        }
        if (quartier.length <= 0) {
          setQuartier(res.data.data.quartier);
        }
        if (region.length <= 0) {
          setRegion(res.data.data.region);
        }
        if (phone.length <= 0) {
          setPhone(res.data.data.numero);
        }
        if (res.data.data.image) {
          setImp(res.data.data.image);
          if (!photo) {
            setPhoto(res.data.data.image);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    formData.set("image", photo);

    axios
      .put(`${BackendUrl}/updateFournisseur/${params.id}`, formData)
      .then((res) => {
        // console.log(res);
        alert(res.data.message);
        navigue(`/Admin/AFournisseurDet/${params.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AFournisseurUpdate">
      <div className="left">
        <label htmlFor="image">
          <img src={imP} alt="loading" style={{ cursor: "pointer" }} />
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
          defaultValue={fournisseur ? fournisseur.name : ""}
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
                  defaultValue={fournisseur ? fournisseur.email : ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={fournisseur ? fournisseur.numero : ""}
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
                  defaultValue={fournisseur ? fournisseur.region : ""}
                  onChange={(e) => {
                    setRegion(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={fournisseur ? fournisseur.quartier : ""}
                  onChange={(e) => {
                    setQuartier(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={createFournisseur}
          style={{
            padding: "8px 13px",
            color: "white",
            backgroundColor: "blue",
            border: "none",
            borderRadius: 5,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Modifier!
        </button>
      </div>
    </div>
  );
}

export default AFournisseurUpdate;
