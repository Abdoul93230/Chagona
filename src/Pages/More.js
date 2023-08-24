import React from "react";
import Navbar from "../components/NaveBar/Navbar";
import Mores from "../components/Mores/Mores";
// import HomeTop from '../components/HomeTop/HomeTop'

function More({ chg }) {
  return (
    <>
      <Mores chg={chg} />
      <Navbar />
    </>
  );
}

export default More;
