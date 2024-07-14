import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { ChevronRight, Menu, MessageCircle, Plus, ShoppingCart, UserPlus,HelpCircle,ShoppingBag,PlusSquare,Smartphone } from "react-feather";
import image1 from "../../Images/icon_user.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import { handleAlert } from "../../App";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function Profile() {
  const navigue = new useNavigate();
  const message = () => {
    navigue("/Messages");
  };
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [nom, setNom] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageP, setImageP] = useState(null);

  const [produits, setProduits] = useState(0);

  useEffect(() => {
    if (a) {
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${a?.id}`)
        .then((res) => {
          setAllMessage(
            res.data.filter(
              (item) => item.lusUser === false && item.provenance === false
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // handleAlert("veuiller vous connectez pour plus de fonctionalites.");
      // navigue("/connection?fromProfile=true");
    }
  }, []);

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);

  useEffect(() => {
    if (a) {
      axios
        .get(`${BackendUrl}/user`, {
          params: {
            id: a.id,
          },
        })
        .then((response) => {
          const data = response.data.user;
          setNom(data.name);

          setEmail(data.email);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      axios
        .get(`${BackendUrl}/getUserProfile`, {
          params: {
            id: a.id,
          },
        })
        .then((Profiler) => {
          setLoading(false);
          // console.log(Profiler);
          if (
            Profiler.data.data.image &&
            Profiler.data.data.image !==
              `https://chagona.onrender.com/images/image-1688253105925-0.jpeg`
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
          setLoading(false);
          // if (erro.response.status === 404)
          //   console.log(erro.response.data.message);
          // console.log(erro.response);
        });
    }
  }, []);

  return (
    <LoadingIndicator loading={loading}>
      <div className="Profile">
        <div className="top">
          <div className="l" onClick={message}>
            <MessageCircle style={{ width: "40px" }} />{" "}
            <span>{allMessage.length > 0 ? allMessage.length : 0}</span>
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
            { name: "Invite Friends", link: "/Profile/Invite_Friends",icon:<UserPlus/> },
            { name: "customer suport", link: "/Profile/customer_suport",icon:<HelpCircle/>  },
            { name: "My Orders", link: "/Order",icon:<ShoppingBag/>  },
            { name: "make suggestion", link: "/Profile/make_suggestion",icon:<PlusSquare/>  },
          ].map((param, index) => {
            return (
              <Link to={`${param.link}`} className="li" key={index}>
                <span>
                  {param.icon}
                </span>
                <ol>
                  {param.name}{" "}
                  <span>
                    <ChevronRight  />
                  </span>
                </ol>
              </Link>
            );
          })}
        </ul>

        <ul>
          {[
            { name: "Invite Friends", link: "Invite_Friends",icon:<UserPlus/> },
            { name: "customer suport", link: "customer_suport",icon:<HelpCircle/> },
            { name: "rate our app", link: "rate_our_app",icon:<Smartphone/> },
            { name: "make suggestion", link: "make_suggestion",icon:<PlusSquare/> },
          ].map((param, index) => {
            return (
              <Link
                to={
                  param.name === "rate our app"
                    ? `/PageNotRady`
                    : `/Profile/${param.link}`
                }
                className="li"
                key={index}
              >
                <span>
                {param.icon}
                </span>
                <ol>
                  {param.name}{" "}
                  <span>
                    <ChevronRight  />
                  </span>
                </ol>
              </Link>
            );
          })}
        </ul>
      </div>
    </LoadingIndicator>
  );
}

export default Profile;
