import React from "react";
import "./AOrders.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import image from "../../Images/sac2.png";
import image from "../../Images/icon_user.png";
import { useEffect } from "react";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function AOrders() {
  const navigue = useNavigate();
  const [allcomandes, setAllcommandes] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allProfiles, setallprofiles] = useState(null);
  const [allAddress, setallAdress] = useState(null);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllCommandes`)
      .then((commandes) => {
        setAllcommandes(commandes.data.commandes);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getUsers`)
      .then((users) => {
        setAllUsers(users.data.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getUserProfiles`)
      .then((users) => {
        setallprofiles(users.data.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BackendUrl}/getAllAddressByUser`)
      .then((users) => {
        setallAdress(users.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const orderDet = (id) => {
    navigue(`/Admin/AodersDet/${id}`);
  };

  return (
    <div className="AOrders">
      <div className="top">
        <div className="right">
          <h3>Orders</h3>
          <ul>
            <NavLink
              // style={({ isActive }) => ({ color: isActive ? "red" : "gray" })}
              className="li"
            >
              Last Month
            </NavLink>
            <NavLink className="li">Last week</NavLink>
            <NavLink className="li">Last 24h</NavLink>
            <NavLink className="li">All</NavLink>
          </ul>
        </div>
        <div className="search">
          <input type="search" placeholder="search orders" />
          <input type="submit" value="search" />
        </div>
      </div>
      <div className="midel">
        <div className="tab" style={{ width: "100%", height: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Img</th>
                <th>Customers-Name</th>
                <th>Customers-Email</th>
                <th>Customers-Phone</th>
                <th>Customers-Area</th>
                <th>payment</th>
                <th>Statu</th>
                <th>Nbr-Product</th>
              </tr>
            </thead>
            <tbody>
              {allcomandes?.map((param, index) => {
                let profile = allProfiles?.find(
                  (prof) => prof.clefUser === param.clefUser
                );
                let imageUrl = profile ? profile.image : image;
                return (
                  <tr key={index} onClick={() => orderDet(param._id)}>
                    <td>
                      <div className="img">
                        {/* <User /> */}
                        <img
                          src={imageUrl}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            margin: "0px auto",
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      {
                        allAddress?.find(
                          (prof) => prof.clefUser === param.clefUser
                        ).name
                      }
                    </td>
                    <td>
                      {
                        allUsers?.find((item) => item._id === param.clefUser)
                          ?.email
                      }
                    </td>
                    <td>
                      {
                        allAddress?.find(
                          (prof) => prof.clefUser === param.clefUser
                        )?.numero
                      }
                    </td>
                    <td>
                      {
                        allAddress?.find(
                          (prof) => prof.clefUser === param.clefUser
                        )?.quartier
                      }
                    </td>
                    <td>{param.statusPayment}</td>
                    <td>{param.statusLivraison}</td>
                    <td>{param.nbrProduits.length}</td>
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
      </div>
    </div>
  );
}

export default AOrders;
