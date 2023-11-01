// CustomLoader.js
import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // Styles pour le loader

const CustomLoader = ({ loading }) => {
  return (
    <div className="custom-loader">
      {loading && (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )}
    </div>
  );
};

export default CustomLoader;
