import React from "react";
import ShippingAdress from "../components/ShippingAdress/ShippingAdress";
import PaymentMethode from "../components/PaymentMethode/PaymentMethode";
import { useParams } from "react-router-dom";

function MoreComponents() {
  const parms = useParams();

  return (
    <>
      {parms.op === "shipping_address" ? (
        <ShippingAdress />
      ) : parms.op === "payment_method" ? (
        <PaymentMethode />
      ) : (
        <></>
      )}
    </>
  );
}

export default MoreComponents;
