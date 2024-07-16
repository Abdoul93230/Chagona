import React from "react";
import "./Customer_suport.css";
import { Mail, Phone } from "react-feather";

function CustomerSuport() {
  return (
    <div className="CustomerSuport">
      <div className="top">
        <h5>
          <Mail style={{ width: "20px", marginRight: "10px" }} />{" "}
          abdoulrazak9323@gmail.com
        </h5>
        <h5>
          <Phone style={{ width: "20px", marginRight: "10px" }} /> + 227
          87727501
        </h5>
      </div>
      {/* <h1>Tutoriel Sur l'utilisation du site</h1> */}
      <h2>Seras Bientot Disponible !</h2>
    </div>
  );
}

export default CustomerSuport;
