import React, { useState } from "react";
import Carts from "../components/Carts/Carts";
import CartCheckout from "../components/CartCheckout/CartCheckout";
import ValidCarde from "../components/ValidCarde/ValidCarde";

function Cart() {
  const [option, setOption] = useState("un");

  const changeOption = (param) => {
    setOption(param);
  };

  return (
    <div className="carrr">
      {option === "un" ? (
        <Carts op={changeOption} />
      ) : option === "deux" ? (
        <CartCheckout op={changeOption} />
      ) : (
        <ValidCarde op={changeOption} />
      )}
    </div>
  );
}

export default Cart;
