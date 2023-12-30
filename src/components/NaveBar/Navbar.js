import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Menu, Home, Search, ShoppingCart, User } from "react-feather";
import { NavLink } from "react-router-dom";

function Navbar({}) {
  const [a, seta] = useState(JSON.parse(localStorage.getItem(`userEcomme`)));

  useEffect(() => {
    seta(JSON.parse(localStorage.getItem(`userEcomme`)));
  }, []);
  return (
    <div className="Navbar">
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
      <NavLink
        className="NavLink"
        to={a ? "/Profile" : "/connection?fromProfile=true"}
      >
        <User />
        <span>Profile</span>
      </NavLink>
      <NavLink
        className="NavLink"
        to={a ? "/More" : "/connection?fromMore=true"}
      >
        <Menu />
        <span>More</span>
      </NavLink>
    </div>
  );
}

export default Navbar;
