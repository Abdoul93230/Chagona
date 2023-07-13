import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./EditProfile.css";
import axios from "axios";
import image from "../../Images/costume-homme-1.jpg";
function EditProfile() {
  const navigue = useNavigate();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageP, setImageP] = useState(image);
  const [messageEr, setMessageEr] = useState(null);

  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  useEffect(() => {
    if (a) {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${a.token}`;
      axios
        .get("http://localhost:8080/user", {
          params: {
            id: a.id,
          },
        })
        .then((response) => {
          const data = response.data.user;
          if (nom.length <= 0) {
            setNom(data.name);
          } else if (email.length <= 0) {
            setEmail(data.email);
          } else {
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      axios
        .get("http://localhost:8080/getUserProfile", {
          params: {
            id: a.id,
          },
        })
        .then((Profiler) => {
          // console.log(Profiler);
          if (
            Profiler.data.data.image !==
            "http://localhost:8080/images/image-1688253105925-0.jpeg"
          ) {
            setImageP(Profiler.data.data.image);
          }
          if (Profiler.data.data.numero) {
            if (phone.length <= 0) {
              setPhone(Profiler.data.data.numero);
            }
          }
        })
        .catch((erro) => {
          if (erro.response.status === 404)
            setMessageEr(erro.response.data.message);
          console.log(erro.response);
        });
    }
  });

  const onSub = (e) => {
    e.preventDefault();

    if (nom.trim().length < 3) {
      return alert("Votre nom doit etre superieur ou inferieur a 3 caracteres");
    } else if (!regexMail.test(email)) {
      return alert("forma du mail non valid!");
    } else if (!regexPhone.test(phone.toString())) {
      return alert("forma du numero non valid!");
    }

    const a = JSON.parse(localStorage.getItem(`userEcomme`));
    const formData = new FormData();
    formData.append("name", nom);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", photo);
    formData.append("id", a.id);

    axios
      .post("http://localhost:8080/createProfile", formData)
      .then((user) => {
        if (user.status === 200) {
          alert(user.data.message);

          axios
            .get("http://localhost:8080/getUserProfile", {
              params: {
                id: a.id,
              },
            })
            .then((Profiler) => {
              console.log(Profiler);
              if (
                Profiler.data.data.image !==
                "http://localhost:8080/images/image-1688253105925-0.jpeg"
              ) {
                setImageP(Profiler.data.data.image);
              }
              if (Profiler.data.data.numero) {
                if (phone.length <= 0) {
                  setPhone(Profiler.data.data.numero);
                }
              }
            })
            .catch((erro) => {
              if (erro.response.status === 404)
                setMessageEr(erro.response.data.message);
              console.log(erro.response);
            });
        } else {
          console.log({ err: user.data });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="EditProfile">
      {messageEr ? <h6 style={{ marginBottom: 20 }}>{messageEr}</h6> : <></>}
      <div className="img" style={{ marginBottom: 66 }}>
        <label htmlFor="image">
          <img src={imageP} alt="loading" />
          <h6 style={{ margin: "10px auto" }}>Click me to select image</h6>
        </label>
      </div>
      <h6></h6>
      <input
        type="file"
        id="image"
        style={{ display: "none" }}
        onChange={(e) => {
          setPhoto(e.target.files[0]);
        }}
      />

      <form onSubmit={onSub}>
        <label htmlFor="nom">Nom (3 caracteres au moin)</label>
        <input
          type="text"
          id="nome"
          defaultValue={nom}
          onChange={(e) => {
            setNom(e.target.value);
          }}
          style={{ borderColor: nom.trim().length < 3 ? "red" : "gray" }}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{
            borderColor: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              ? "red"
              : "gray",
          }}
        />

        <label htmlFor="Phone">Phone</label>
        <input
          type="number"
          id="Phone"
          value={phone}
          placeholder="************"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          style={{
            borderColor: !regexPhone.test(phone.toString()) ? "red" : "gray",
          }}
        />
        <label style={{ marginTop: 15, fontSize: 12, cursor: "pointer" }}>
          Change password?
        </label>

        <div className="btn">
          <input
            type="submit"
            value="retour"
            onClick={() => navigue("/Profile")}
          />
          <input type="submit" value="Submit" onSubmit={onSub} />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
