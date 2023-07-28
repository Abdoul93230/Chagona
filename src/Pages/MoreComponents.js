import React from "react";
import ShippingAdress from "../components/ShippingAdress/ShippingAdress";
import PaymentMethode from "../components/PaymentMethode/PaymentMethode";
import Frequestion from "../components/Frequestion/Frequestion";
import InfosLegales from "../components/InfosLegales/InfosLegales";
import PrivacyNotice from "../components/PrivacyNotice/PrivacyNotice";
import { useParams } from "react-router-dom";

function MoreComponents() {
  const parms = useParams();

  return (
    <>
      {parms.op === "shipping_address" ? (
        <ShippingAdress />
      ) : parms.op === "payment_method" ? (
        <PaymentMethode />
      ) : parms.op === "frequently_asked_questions" ? (
        <Frequestion />
      ) : parms.op === "legal_infomation" ? (
        <InfosLegales />
      ) : parms.op === "privacy_notice" ? (
        <PrivacyNotice />
      ) : (
        <></>
      )}
    </>
  );
}

export default MoreComponents;
