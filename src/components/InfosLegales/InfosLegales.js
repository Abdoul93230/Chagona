import React from "react";
import "./InfosLegales.css";
import { ChevronLeft } from "react-feather";

function InfosLegales() {
  const data = [
    {
      titel: "Mentions légales :",
      desc: [
        "HabouCom SARL",
        "Niamey/Niger/Bobiel",
        "Chagona-ne@gmail.com",
        "+227 87727501",
      ],
    },
    {
      titel: "Conditions générales d'utilisation (CGU) :",
      desc: [
        "Bienvenue sur Chagona-ne.onrender.com. En utilisant ce site, vous acceptez nos CGU et notre politique de confidentialité. Assurez-vous de lire attentivement ces conditions avant d'utiliser le site.",
      ],
    },
    {
      titel: "Politique de confidentialité :",
      desc: [
        "Chez Chagona-ne, nous respectons la confidentialité de nos utilisateurs. Nous collectons uniquement les données personnelles nécessaires pour traiter les commandes et améliorer l'expérience utilisateur. Pour plus d'informations, veuillez consulter notre politique de confidentialité complète.",
      ],
    },
    {
      titel: "Politique de cookies :",
      desc: [
        "Notre site utilise des cookies pour améliorer votre expérience de navigation. En continuant à utiliser notre site, vous acceptez notre utilisation des cookies conformément à notre politique de cookies.",
      ],
    },
    {
      titel: "Conditions de vente :",
      desc: [
        "En passant commande sur Chagona-ne.onrender.com, vous acceptez nos conditions de vente. Les prix des produits incluent la TVA et excluent les frais d'expédition. Les paiements peuvent être effectués par carte de crédit/débit ou via les Mobiles Money.",
      ],
    },
    {
      titel: "Politique de retour et de remboursement :",
      desc: [
        "Si vous n'êtes pas satisfait de votre achat, vous pouvez retourner le produit dans les 30 jours suivant la réception pour un remboursement complet ou un échange. Veuillez consulter notre politique de retour pour les conditions détaillées.",
      ],
    },
    {
      titel: "Droits d'auteur et propriété intellectuelle :",
      desc: [
        "Le contenu et les images présents sur chagona-ne.onrender.com sont protégés par des droits d'auteur et appartiennent à chagona-ne SARL. Toute utilisation non autorisée du contenu est strictement interdite.",
      ],
    },
    {
      titel: "Responsabilité :",
      desc: [
        "Nous nous efforçons de fournir des informations précises sur notre site, mais nous ne pouvons garantir leur exhaustivité et leur exactitude. Votre utilisation de ce site est à vos propres risques.",
      ],
    },
    {
      titel: "Clause de non-responsabilité :",
      desc: [
        "Les informations fournies sur ce site sont à titre informatif uniquement et ne constituent pas un avis professionnel. Consultez toujours un professionnel qualifié pour des conseils spécifiques.",
      ],
    },
  ];

  function goBack() {
    window.history.back();
  }

  return (
    <div className="InfosLegales">
      <span onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h2>Legale Informations :</h2>
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

export default InfosLegales;
