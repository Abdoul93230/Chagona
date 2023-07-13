import React from "react";
import "./Footer.css";
import { ChevronUp } from "react-feather";

function Footer() {
  return (
    <div className="Footer">
      <div className="top">
        <ChevronUp />
        <h6>Back to Top</h6>
      </div>
      <div className="midel">
        <ul>
          <li>HELP CENTER</li>
          <li>CONTACT US</li>
          <li>TERMS & CONDITIONS</li>
          <li>PRIVACY NOTICE</li>
          <li>COOKIE NOTICE</li>
          <li>BECOME A SELLER</li>
          <li>REPORT A PRODUCT</li>
          <li>SHIP YOUR PACKAGE ANYWHERE IN NIGER</li>
          <li>Habou ANNIVERSARY 2023</li>
        </ul>
      </div>
      <div className="bottom">
        <h6>All Rights Reserved</h6>
      </div>
    </div>
  );
}

export default Footer;
