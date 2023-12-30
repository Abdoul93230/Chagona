import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  ShoppingCart,
  Search,
  User,
  Menu,
  Home,
} from "react-feather";
import io from "socket.io-client";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../../Images/E-HABOU-removebg-preview.png";
import axios from "axios";

import "./HomeTop.css";

const BackendUrl = process.env.REACT_APP_Backend_Url;
const socket = io(BackendUrl);
function HomeTop() {
  const [produits, setProduits] = useState(0);
  const navigue = useNavigate();
  const [allMessage, setAllMessage] = useState([]);
  const [nbr, setNbr] = useState(0);
  const a = JSON.parse(localStorage.getItem(`userEcomme`));

  useEffect(() => {
    if (a) {
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${a?.id}`)
        .then((res) => {
          setNbr(
            res.data.filter(
              (item) => item.lusUser == false && item.provenance === false
            )?.length
          );
          setAllMessage(
            res.data.filter(
              (item) => item.lusUser == false && item.provenance === false
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    // Écouter les nouveaux messages du serveur
    socket.on("new_message_user", (message) => {
      if (message) {
        console.log("oui");
        if (a) {
          axios
            .get(`${BackendUrl}/getUserMessagesByClefUser/${a?.id}`)
            .then((res) => {
              setNbr(
                res.data.filter(
                  (item) => item.lusUser == false && item.provenance === false
                )?.length
              );
              setAllMessage(
                res.data.filter(
                  (item) => item.lusUser == false && item.provenance === false
                )
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
    return () => {
      // Nettoyer l'écouteur du socket lors du démontage du composant
      socket.off("new_message_user");
    };
  }, [socket]);

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);

  // lecturUserMessage

  return (
    <div className="HomeTop">
      <div className="one">
        <div className="h">
          <img src={logo} alt="loadin" />
          <Link
            className="l"
            to={a ? "/Messages" : "/Messages?fromMessages=true"}
          >
            <MessageCircle style={{ width: "40px" }} />{" "}
            <span>{nbr > 0 ? allMessage.length : 0}</span>
          </Link>
          <Link className="l" to="/Cart">
            <ShoppingCart style={{ width: "40px" }} />
            <span>{produits ? produits.length : 0}</span>
          </Link>
        </div>
        <div className="search">
          <form>
            <input
              type="search"
              placeholder="Search"
              onClick={() => navigue("/Search")}
            />
            {/* <input type="submit" value="Search" /> */}
          </form>
        </div>
        <ul>
          <NavLink className="NavLink" to="/home">
            <Home />
            <span>Home</span>
          </NavLink>
          <NavLink className="NavLink" to="/Search">
            <Search />
            <span>Search</span>
          </NavLink>
          <NavLink className="NavLink" to="/Cart">
            <ShoppingCart />
            <span>Cart</span>
          </NavLink>
          <NavLink className="NavLink" to="/Profile">
            <User />
            <span>Profile</span>
          </NavLink>
          <NavLink className="NavLink" to="/More">
            <Menu />
            <span>More</span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default HomeTop;
