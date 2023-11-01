import React, { useState, useEffect } from "react";

function InfiniteCarousel({ param, direction }) {
  const messages = [
    "Bienvenue sur [Nom de votre Plateforme] - Votre Destination pour des Achats Locaux Faciles !",
    "Découvrez la Magie du Shopping Local sur [Nom de votre Plateforme] !",
    "Explorez une Sélection Unique de Produits Locaux sur [Nom de votre Plateforme] !",
    "Rejoignez Notre Communauté de Connaisseurs Locaux sur [Nom de votre Plateforme] !",
    "Trouvez les Trésors Cachés de Votre Ville sur [Nom de votre Plateforme] !",
    "Faites des Achats en Ligne en Soutenant les Entreprises de Votre Région sur [Nom de votre Plateforme] !",
    "Bienvenue sur [Nom de votre Plateforme] - Où l'Économie Locale Rencontre la Technologie !",
    "Découvrez des Produits Locaux Exceptionnels sur [Nom de votre Plateforme] !",
    "Nous Croyons en la Puissance du Local. Bienvenue sur [Nom de votre Plateforme] !",
    "Rapprochez-vous de Votre Communauté en Faisant Vos Achats sur [Nom de votre Plateforme] !",
  ];

  return (
    <div
      className="carousel-container"
      style={{
        backgroundColor: "#FF6969",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontStyle: "initial",
        width: "99%",
        margin: "0px auto",
      }}
    >
      <marquee direction={direction} scrollamount="3">
        {param}
      </marquee>
    </div>
  );
}

export default InfiniteCarousel;
