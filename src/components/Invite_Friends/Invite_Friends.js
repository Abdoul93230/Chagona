import React, { useState } from "react";
import "./Invite_Friends.css";
import { useNavigate } from "react-router-dom";
import image from "../../Images/produit4.jpg";

function InviteFriends() {
  const navigue = useNavigate();
  const [message, setMessage] = useState(
    `Salut [Nom de votre ami], Je viens de découvrir un super site de commerce électronique avec des produits de haute qualité à des prix compétitifs. Si tu t'inscris en utilisant mon lien de parrainage, tu bénéficieras d'une réduction sur ta première commande, et moi aussi ! Ne rate pas cette occasion, rejoins-moi sur ce site génial ! Amicalement, [Ton nom]`
  );

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="InviteFriends">
      <img src={image} alt="loading" />

      <form>
        <textarea
          defaultValue={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <label htmlFor="email">Email de votre ami</label>
        <input
          required
          type="email"
          id="email"
          placeholder="Tape here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="num">OU Numero de votre ami</label>
        <input
          required
          type="number"
          id="num"
          placeholder="Tape here"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
      </form>
      <button onClick={() => navigue("/Profile")}>Submit</button>
    </div>
  );
}

export default InviteFriends;
