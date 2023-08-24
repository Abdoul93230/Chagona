import React, { useState } from "react";
import LogIn from "../components/LogIn/LogIn";
import ConnectionBar from "../components/ConnectionBar/ConnectionBar";
import SingnUp from "../components/SingnUp/SingnUp";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

function Connection({ chg }) {
  const [option, setOption] = useState("SingnUp");
  const changeOption = (param) => {
    setOption(param);
  };
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
