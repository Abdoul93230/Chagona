import React, { useEffect, useState } from "react";
import "./AFournisseurs.css";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AFournisseurs() {
  const navigue = useNavigate();

  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchName, setSearchName] = useState("");

  const AFournisseurDet = (id) => {
    navigue(`/Admin/AFournisseurDet/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${BackendUrl}/fournisseurs`)
      .then((res) => {
        setFournisseurs(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchFounisseur = () => {
    if (searchName.length < 2) {
      alert("le nom a recherche doit avoir au moins 2 string");
      return;
    }
    axios
      .get(`${BackendUrl}/findFournisseurByName/${searchName}`)
      .then((res) => {
        setFournisseurs(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AllF = () => {
    axios
      .get(`${BackendUrl}/fournisseurs`)
      .then((res) => {
        setFournisseurs(res.data.data);
        setSearchName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AFournisseurs">
      <div className="top">
        <h3>Fournisseurs</h3>

        <div className="search">
          <input
            type="search"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder="Search Fournisseurs"
          />
          <input type="submit" value="search" onClick={searchFounisseur} />
        </div>
      </div>
      <button
        onClick={AllF}
        style={{
          border: "none",
          backgroundColor: "transparent",
          fontWeight: "bolder",
          display: "block",
          cursor: "pointer",
        }}
      >
        All
      </button>
      <div className="midel">
        <div className="tab" style={{ width: "100%", height: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>img</th>
                <th>Nom</th>
                <th>Region</th>
                <th>Email</th>

                <th>Numero</th>
                <th>localite</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurs.map((param, index) => {
                return (
                  <tr key={index} onClick={() => AFournisseurDet(param._id)}>
                    <td>
                      <div className="img">
                        {param.image ? (
                          <img
                            src={param.image}
                            alt="loading"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <User className="CI" />
                        )}
                      </div>
                    </td>
                    <td>{param.name}</td>
                    <td>{param.region}</td>
                    <td>{param.email}</td>
                    <td>+227 {param.numero}</td>
                    <td>{param.quartier}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Prev</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>Next</span>
        </div>
        <div className="b">
          <button
            onClick={() => {
              navigue("/Admin/AddFournisseur");
            }}
          >
            Ajoutter !
          </button>
        </div>
      </div>
    </div>
  );
}

export default AFournisseurs;
