import React from "react";
import "./Footer.css";
import { ChevronUp } from "react-feather";
import { useNavigate } from "react-router-dom";

function Footer({ scroll }) {
  const navigue = useNavigate();
  return (
    <div className="Footer">
      <div className="top" onClick={scroll}>
        <ChevronUp />
        <h6>Back to Top</h6>
      </div>
      <div className="midel">
        <ul>
          <li
            onClick={() => {
              navigue("/Profile/customer_suport");
            }}
          >
            HELP CENTER
          </li>
          <li
            onClick={() => {
              navigue("/ContactUs");
            }}
          >
            CONTACT US
          </li>
          <li>TERMS & CONDITIONS</li>
          <li
            onClick={() => {
              navigue("/More/privacy_notice");
            }}
          >
            PRIVACY NOTICE
          </li>
          <li
            onClick={() => {
              navigue("/More/legal_infomation");
            }}
          >
            COOKIE NOTICE
          </li>
          <li
            onClick={() => {
              navigue("/BecomSellerInfos");
            }}
          >
            BECOME A SELLER
          </li>
          <li
            onClick={() => {
              navigue("/PageNotRady");
            }}
          >
            REPORT A PRODUCT
          </li>
          <li
            onClick={() => {
              navigue("/PageNotRady");
            }}
          >
            SHIP YOUR PACKAGE ANYWHERE IN NIGER
          </li>
          <li
            onClick={() => {
              navigue("/PageNotRady");
            }}
          >
            Habou ANNIVERSARY 2023
          </li>
        </ul>
      </div>
      <div className="bottom">
        <h6>All Rights Reserved</h6>
      </div>
    </div>
  );
}

export default Footer;
