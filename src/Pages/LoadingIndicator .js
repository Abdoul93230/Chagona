import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

import "./styles.css"; // Import your CSS file containing the .loading-indicator class

const LoadingIndicator = (props) => {
  return (
    <div>
      {props.loading ? (
        <div className="loading-indicator">
          <PropagateLoader color="#FF6969" size={15} />
        </div>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default LoadingIndicator;
