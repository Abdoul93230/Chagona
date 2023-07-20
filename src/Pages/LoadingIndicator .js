import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

import "./styles.css"; // Import your CSS file containing the .loading-indicator class

const LoadingIndicator = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate the data loading process here
    // Replace this with your actual data fetching logic
    setTimeout(() => {
      setIsLoading(false);
    }, props.time); // Simulating a 2-second loading time, you can adjust this as needed
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-indicator">
          <PropagateLoader color="#FF6969" size={15} />
        </div>
      ) : (
        // Display the children passed to the component
        <>{props.children}</>
      )}
    </div>
  );
};

export default LoadingIndicator;
