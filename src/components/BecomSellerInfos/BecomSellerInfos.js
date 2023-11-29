import React from "react";
import { ChevronLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import "./BecomSellerInfos.css";

function BecomSellerInfos() {
  const data = [
    {
      id: 1,
      title: "Pour devenir vendeur sur notre plateforme",
      description:
        "L'inscription est obligatoire et vous devez fournir des informations précises, y compris vos coordonnées valides.",
    },
    {
      id: 2,
      title: "Vérification d'identité",
      description:
        "Nous demandons à nos vendeurs de se soumettre à une vérification d'identité. Vous devrez fournir une pièce d'identité ou un numéro d'entreprise, conformément à la réglementation en vigueur, ainsi que les documents pertinents, tels que des licences commerciales ou fiscales, le cas échéant.",
    },
    {
      id: 3,
      title: "Qualité des produits",
      description:
        "Nous exigeons que les produits que vous proposez respectent les normes de qualité, de sécurité et de légalité. La vente de produits contrefaits, piratés ou illégaux est strictement interdite.",
    },
    {
      id: 4,
      title: "Frais et commissions",
      description:
        "Nos frais de transaction, nos commissions et nos modalités de paiement sont spécifiés en détail pour l'utilisation de notre plateforme.",
    },
    {
      id: 5,
      title: "Politique de remboursement et de retour",
      description:
        "Nous avons établi des règles claires en ce qui concerne les retours, les remboursements et les garanties pour les produits vendus.",
    },
    {
      id: 6,
      title: "Gestion des stocks",
      description:
        "Nous vous demandons de maintenir votre inventaire à jour en retirant les produits en rupture de stock.",
    },
    {
      id: 7,
      title: "Fraude et sécurité",
      description:
        "Nous avons mis en place des mesures de sécurité pour lutter contre la fraude et la contrefaçon. Nous encourageons nos vendeurs à adopter de bonnes pratiques en matière de sécurité des données.",
    },
    {
      id: 8,
      title: "Normes de service client",
      description:
        "Nous attendons de nos vendeurs qu'ils répondent rapidement aux clients, traitent les commandes efficacement et communiquent de manière professionnelle.",
    },
    {
      id: 9,
      title: "Respect de la vie privée",
      description:
        "Le respect de la vie privée est essentiel. Nous exigeons que nos vendeurs respectent les règles de confidentialité et de protection des données de nos clients.",
    },
    {
      id: 10,
      title: "Contenu et médias",
      description:
        "Les descriptions de produits doivent être précises, informatives et conformes aux lois sur la publicité. La diffusion de contenus offensants, illégaux ou discriminatoires est strictement interdite.",
    },
    {
      id: 11,
      title: "Propriété intellectuelle",
      description:
        "Nous insistons sur le respect des droits de propriété intellectuelle des tiers, tels que les marques déposées et les droits d'auteur.",
    },
    {
      id: 12,
      title: "Conformité légale et fiscale",
      description:
        "Nous exigeons que nos vendeurs respectent toutes les lois et réglementations fiscales et commerciales applicables.",
    },
    {
      id: 13,
      title: "Suspension ou exclusion",
      description:
        "Des critères clairs sont établis pour la suspension temporaire ou l'exclusion permanente des vendeurs en cas de non-respect de nos règles.",
    },
    {
      id: 14,
      title: "Règlement des litiges",
      description:
        "Nous offrons un processus de résolution des litiges entre les vendeurs et les acheteurs, le cas échéant.",
    },
    {
      id: 15,
      title: "Révisions des politiques",
      description:
        "Sachez que nos politiques et règles peuvent être mises à jour périodiquement, et nous vous informerons de ces changements.",
    },
  ];

  function goBack() {
    window.history.back();
  }
  const navigue = useNavigate();

  return (
    <div className="BecomSellerInfos">
      <span onClick={goBack}>
        <ChevronLeft className="i" />
      </span>
      <h2>SELLER Informations :</h2>
      <ul>
        {data.map((param, index) => {
          return (
            <div key={index} style={{ width: "100%", height: "auto" }}>
              <li>
                {index + 1} {param.title}
                <li key={index} className="li">
                  {param.description}
                </li>
              </li>
            </div>
          );
        })}
      </ul>
      <div className="Btn">
        <button
          onClick={() => window.open("https://habou227-seller.onrender.com")}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default BecomSellerInfos;
