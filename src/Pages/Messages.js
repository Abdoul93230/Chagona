import React, { useState } from "react";
import AllMessages from "../components/AllMessages/AllMessages";
import MessageDet from "../components/MessageDet/MessageDet";

function Messages() {
  const [option, setOption] = useState("det");
  const changeOption = (param) => {
    setOption(param);
  };

  return (
    <>
      {option === "All" ? (
        <AllMessages chg={changeOption} />
      ) : option === "det" ? (
        <MessageDet chg={changeOption} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Messages;
