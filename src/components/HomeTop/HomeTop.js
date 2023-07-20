import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  ShoppingCart,
  Search,
  User,
  Menu,
  Home,
} from "react-feather";
import { Link, useNavigate, NavLink } from "react-router-dom";

import "./HomeTop.css";

function HomeTop() {
  const [produits, setProduits] = useState(0);
  const navigue = useNavigate();

  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);

  return (
    <div className="HomeTop">
      <div className="one">
        <div className="h">
          <Link className="l" to="/Messages">
            <MessageCircle style={{ width: "40px" }} /> <span>5</span>
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
