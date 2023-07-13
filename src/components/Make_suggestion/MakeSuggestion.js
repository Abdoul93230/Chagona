import React, { useState } from "react";
import "./Make_suggestion.css";
import { useNavigate } from "react-router-dom";
import image from "../../Images/suggetions.webp";

function MakeSuggestion() {
  const [comment, setComment] = useState(null);

  const navigue = useNavigate();
  return (
    <div className="Makesuggestion">
      <img src={image} alt="loading" />
      <form>
        <label htmlFor="comment">Your suggetions</label>
        <textarea
          placeholder="Tape Here"
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
      <button onClick={() => navigue("/Profile")}>Submit</button>
    </div>
  );
}

export default MakeSuggestion;
