import React from "react";
import "./Frequestion.css";
import { ChevronLeft } from "react-feather";

function Frequestion() {
  const questions = [
    {
      question: "Quels sont les modes de paiement acceptés sur votre site ?",
      reponse:
        "Nous acceptons les paiements par carte de crédit/débit (Visa, MasterCard,), Mobile Money (Airtel,Orange,Moov)",
    },
    {
      question:
        " Quelle est la politique de livraison et combien de temps cela prendra-t-il ?",
      reponse:
        "Nous proposons une livraison standard et express. Le délai de livraison dépend de votre emplacement, mais en général, cela prend entre 3 à 7 jours ouvrables pour la livraison standard et 1 à 3 jours ouvrables pour la livraison express.",
    },
    {
      question: "Puis-je suivre ma commande en ligne ?",
      reponse:
        "Oui, une fois que votre commande a été expédiée, vous recevrez un numéro de suivi par e-mail, qui vous permettra de suivre l'état de votre commande en ligne.",
    },
    {
      question: "Proposez-vous des remises pour les achats en gros ?",
      reponse:
        "Oui, nous offrons des remises pour les achats en gros. Veuillez nous contacter pour plus de détails sur nos offres spéciales pour les grossistes.",
    },
  ];

  function goBack() {
    window.history.back();
  }

  return (
    <div className="Frequestion">
      <span onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h2>Frequently Questions : </h2>
      <ul>
        {questions.map((param, index) => {
          return (
            <div key={index}>
              <li>{param.question}</li>
              <p>{param.reponse}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Frequestion;
