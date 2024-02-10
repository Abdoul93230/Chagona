import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

import "./styles.css"; // Import your CSS file containing the .loading-indicator class

const LoadingIndicator = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(
        "Veuillez patienter un instant, la connexion est en cours d'établissement..."
      );
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [props.loading]); // Run the effect only when loading state changes

  return (
    <div>
      {props.loading ? (
        <div className="loading-indicator">
          <PropagateLoader color="#FF6969" size={15} />
          {message && <p>{message}</p>}
        </div>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default LoadingIndicator;
