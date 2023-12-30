import React, { useEffect, useState } from "react";
import LogIn from "../components/LogIn/LogIn";
import ConnectionBar from "../components/ConnectionBar/ConnectionBar";
import SingnUp from "../components/SingnUp/SingnUp";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import { useLocation } from "react-router-dom";
import { handleAlert, handleAlertwar } from "../App";

function Connection({ chg }) {
  const [option, setOption] = useState("LogIn");
  const location = useLocation();
  const changeOption = (param) => {
    setOption(param);
  };

  const fromCartParam = new URLSearchParams(location.search).get("fromCart");
  const fromCartMore = new URLSearchParams(location.search).get("fromMore");
  const fromCartProfile = new URLSearchParams(location.search).get(
    "fromProfile"
  );
  const fromCartMessages = new URLSearchParams(location.search).get(
    "fromMessages"
  );
  useEffect(() => {
    if (fromCartParam) {
      handleAlert("Veuiller vous connectez pour poursuivre votre commande");
    } else if (fromCartProfile) {
      handleAlertwar("veuiller vous connectez pour plus de fonctionalites.");
    } else if (fromCartMore) {
      handleAlertwar("veuiller vous connectez pour plus de fonctionalites.");
    } else if (fromCartMessages) {
      handleAlertwar("veuiller vous connectez pour acceder a vos messages");
    }
  }, [fromCartParam]);

  return (
    <>
      <ConnectionBar chg={changeOption} />
      {option === "SingnUp" ? (
        <SingnUp chg={chg} />
      ) : option === "LogIn" ? (
        <LogIn chg={chg} creer={changeOption} />
      ) : (
        <ForgotPassword />
      )}
    </>
  );
}

export default Connection;
