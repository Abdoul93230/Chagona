import React from "react";
import "./ValidCarde.css";
import { Check, ChevronRight } from "react-feather";

function ValidCarde({ op }) {
  return (
    <div className="ValidCarde">
      <div className="carde">
        <span>
          <Check style={{ width: "50px", height: "50px" }} />
        </span>
        <h2>order placed!</h2>
        <p>
          Your order was placed successfully. For more details, check All My
          Orders page under Profile tab
        </p>
        <button onClick={() => op("un")}>
          my Orders{" "}
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ValidCarde;
