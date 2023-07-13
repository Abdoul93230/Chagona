import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { ChevronRight, Menu, MessageCircle, ShoppingCart } from "react-feather";
import image1 from "../../Images/costume-homme-1.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigue = new useNavigate();
  const message = () => {
    navigue("/Messages");
  };
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  const [imageP, setImageP] = useState(null);

  const [produits, setProduits] = useState(0);

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://chagona.onrender.com/user", {
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
      .get("https://chagona.onrender.com/getUserProfile", {
        params: {
          id: a.id,
        },
      })
      .then((Profiler) => {
        // console.log(Profiler);
        if (
          Profiler.data.data.image !==
          "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
        ) {
          setImageP(Profiler.data.data.image);
          // console.log(Profiler.data.data);
        }
        // if (Profiler.data.data.numero) {
        //   if (phone.length <= 0) {
        //     setPhone(Profiler.data.data.numero);
        //   }
        // }
      })
      .catch((erro) => {
        if (erro.response.status === 404)
          console.log(erro.response.data.message);
        console.log(erro.response);
      });
  });

  return (
    <div className="Profile">
      <div className="top">
        <div className="l" onClick={message}>
          <MessageCircle />
          <span>5</span>
        </div>
        <div
          className="l"
          onClick={() => {
            navigue("/Cart");
          }}
        >
          <ShoppingCart />
          <span>{produits ? produits.length : 0}</span>
        </div>
      </div>

      <div className="prof">
        <div className="left">
          <img src={imageP ? imageP : image1} alt="loading" />
        </div>
        <div className="right">
          <h2>{nom}</h2>
          <h3 style={{ fontSize: 14 }}>{email}</h3>
          <Link to="/Profile/EditProfile" className="button">
            Edit Profile
          </Link>
        </div>
      </div>

      <ul>
        {[
          { name: "Invite Friends", link: "/Profile/Invite_Friends" },
          { name: "customer suport", link: "/Profile/customer_suport" },
          { name: "My Orders", link: "/Order" },
          { name: "make suggestion", link: "/Profile/make_suggestion" },
        ].map((param, index) => {
          return (
            <Link to={`${param.link}`} className="li" key={index}>
              <span>
                <Menu />
              </span>
              <ol>
                {param.name}{" "}
                <span>
                  <ChevronRight />
                </span>
              </ol>
            </Link>
          );
        })}
      </ul>

      <ul>
        {[
          { name: "Invite Friends", link: "Invite_Friends" },
          { name: "customer suport", link: "customer_suport" },
          { name: "rate our app", link: "rate_our_app" },
          { name: "make suggestion", link: "make_suggestion" },
        ].map((param, index) => {
          return (
            <Link to={`/Profile/${param.link}`} className="li" key={index}>
              <span>
                <Menu />
              </span>
              <ol>
                {param.name}{" "}
                <span>
                  <ChevronRight />
                </span>
              </ol>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Profile;
