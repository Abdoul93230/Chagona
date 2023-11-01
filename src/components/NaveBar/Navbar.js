import React from "react";
import "./Navbar.css";
import { Menu, Home, Search, ShoppingCart, User } from "react-feather";
import { NavLink } from "react-router-dom";

function Navbar() {
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
      <NavLink className="NavLink" to="/Profile">
        <User />
        <span>Profile</span>
      </NavLink>
      <NavLink className="NavLink" to="/More">
        <Menu />
        <span>More</span>
      </NavLink>
    </div>
  );
}

export default Navbar;
