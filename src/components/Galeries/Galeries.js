import React from "react";
import "./Galeries.css";

import { shuffle } from "lodash";

function Galeries({ products }) {
  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 6);
  }

  const prod1 = ["one", "two", "three", "four", "five", "six"];

  const produits = getRandomElements(products);

  const chg1 = (index) => {
    const a = document.getElementsByClassName("hover")[index].classList;
    if (a.contains("show")) {
      a.remove("show");
    } else {
      a.toggle("show");
    }
  };
  return (
    <div className="Galeries">
      <h2>Galeries</h2>
      <div className="wrapper">
        {produits ? (
          produits.map((param, index) => {
            return (
              <div
                key={index}
                className={`${prod1[index]} c`}
                onMouseDown={() => chg1(index)}
              >
                <div className={index === 0 ? "hover show" : "hover"}>
                  <p style={{ padding: 3 }}>
                    {param?.name.substring(0, 80)}
                    <span style={{ fontSize: 30, color: "#FF6969" }}>...</span>
                  </p>
                </div>
                <img src={param.image1} alt="loading" />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Galeries;
