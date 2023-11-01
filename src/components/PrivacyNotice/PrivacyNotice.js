import React from "react";
import "./PrivacyNotice.css";
import { ChevronLeft } from "react-feather";

function PrivacyNotice() {
  const data = [
    {
      titel: "Introduction  :",
      desc: [
        "Bienvenue sur notre page de confidentialité. Chez [VotreEntreprise], nous sommes attachés à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons, stockons et partageons vos informations. En utilisant notre site, vous acceptez les pratiques décrites dans cette politique de confidentialité.",
      ],
    },
    {
      titel: "Données personnelles collectées :",
      desc: [
        "Nous pouvons collecter les types suivants de données personnelles lorsque vous utilisez notre site : votre nom, adresse e-mail, adresse postale, numéro de téléphone, informations de paiement, et toute autre information que vous choisissez de nous fournir volontairement.",
      ],
    },
    {
      titel: "Buts de la collecte des données :",
      desc: [
        "Nous collectons vos données personnelles dans le but de traiter vos commandes, d'expédier des produits, de communiquer avec vous concernant votre commande, de personnaliser votre expérience sur notre site, et de vous envoyer des communications marketing si vous y avez consenti.",
      ],
    },
    {
      titel: "Base légale de la collecte des données :",
      desc: [
        "Nous collectons et traitons vos données personnelles sur la base de votre consentement, de l'exécution d'un contrat avec vous, de notre intérêt légitime à exploiter notre site et à vous fournir nos services, ainsi que pour respecter nos obligations légales.",
      ],
    },
    {
      titel: "Durée de conservation des données :",
      desc: [
        "Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les fins pour lesquelles elles ont été collectées, à moins que la loi ne l'exige autrement.",
      ],
    },
    {
      titel: "Droits des utilisateurs :",
      desc: [
        "Sous avez le droit d'accéder, de rectifier, de supprimer ou de restreindre l'utilisation de vos données personnelles. Vous pouvez également vous opposer au traitement de vos données à des fins de marketing. Pour exercer ces droits, veuillez nous contacter à l'adresse [adresse e-mail ou postale du responsable de la protection des données].",
      ],
    },
    {
      titel: "Sécurité des données :",
      desc: [
        "Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.",
      ],
    },
    {
      titel: "Mises à jour de la politique de confidentialité :",
      desc: [
        "Cette politique de confidentialité peut être mise à jour périodiquement pour refléter les changements dans nos pratiques de gestion des données. La date de la dernière mise à jour sera indiquée en haut de la page.",
      ],
    },
    {
      titel: "Consentement :",
      desc: [
        "En utilisant notre site, vous consentez à la collecte, à l'utilisation et au partage de vos données personnelles conformément à cette politique de confidentialité.",
      ],
    },
  ];

  function goBack() {
    window.history.back();
  }

  return (
    <div className="PrivacyNotice">
      <span onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h2>Legale Notice :</h2>
      <ul>
        {data.map((param, index) => {
          return (
            <div key={index} style={{ width: "100%", height: "auto" }}>
              <li>
                {index + 1} {param.titel}
                <ol>
                  {param.desc.map((param, index) => {
                    return (
                      <li key={index} className="li">
                        {param}
                      </li>
                    );
                  })}
                </ol>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default PrivacyNotice;
