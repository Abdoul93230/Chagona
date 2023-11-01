import React, { useState } from "react";
import "./AllCategories.css";
import { X, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AllCategories({ allCategories }) {
  const [allTypes, setAllTypes] = useState([]);
  const [nameCategorie, setNameCategorie] = useState("electronics");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllType`)
      .then((types) => {
        setAllTypes(types.data.data);
        setLoading(false);
        // console.log(allCategories[0].name);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <LoadingIndicator loading={loading}>
      <div className="AllCategories">
        <div className="Top">
          <h2>All Categories</h2>
          <Link className="ferme" to="/Home">
            <X style={{ width: "40px", height: "40px" }} />
          </Link>
        </div>
        <div className="Bottom">
          <div className="left">
            {allCategories.map((param, index) => {
              return (
                <div
                  key={index}
                  className="carde"
                  onClick={() => setNameCategorie(param.name)}
                >
                  <div
                    className="img"
                    style={{
                      boxShadow: `0px 0px 10px #77A5F8`,
                    }}
                  >
                    <img src={param.image} alt="loading" />
                  </div>
                  <h4>{param.name}</h4>
                </div>
              );
            })}
          </div>
          <div className="right">
            <div className="top">
              <h3 style={{ textTransform: "uppercase" }}>{nameCategorie}</h3>
              <div className="carde">
                <ul>
                  {allTypes
                    .filter(
                      (param) =>
                        param.clefCategories ===
                        allCategories.find(
                          (item) => item.name === nameCategorie
                        )?._id
                    )
                    .map((param, index) => (
                      <Link
                        key={index}
                        className="li"
                        to={`/Categorie/${nameCategorie}/${param.name}`}
                      >
                        {param.name}
                        <span>
                          <ChevronRight />
                        </span>
                      </Link>
                    ))}
                </ul>
              </div>
            </div>

            <div className="bottom"></div>
          </div>
        </div>
      </div>
    </LoadingIndicator>
  );
}

export default AllCategories;
