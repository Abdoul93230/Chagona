import React, { useEffect, useState } from "react";
import "./ACustomers.css";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function ACustomers() {
  const navigue = useNavigate();
  const [allUsers, setAllUsers] = useState(null);
  const [allProfiles, setallprofiles] = useState(null);
  const [allAddress, setallAdress] = useState(null);
  const [allcomandes, setAllcommandes] = useState(null);

  const Ueserdet = (id) => {
    navigue(`/Admin/ACustomerDet/${id}`);
  };

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
        // console.log(users.data.data);
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

  return (
    <div className="ACustomers">
      <div className="top">
        <h3>Customers</h3>
        <div className="search">
          <input type="search" placeholder="Search Customers" />
          <input type="submit" value="search" />
        </div>
      </div>
      <div className="midel">
        <div className="tab" style={{ width: "100%", height: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>img</th>
                <th>First name</th>
                <th>Identifiant</th>
                <th>Email</th>

                <th>Phone number</th>
                <th>nbr orders</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((param, index) => {
                return (
                  <tr key={index} onClick={() => Ueserdet(param._id)}>
                    <td>
                      <div className="img">
                        {allProfiles?.find(
                          (prof) => prof.clefUser === param._id
                        )?.image ? (
                          <img
                            src={
                              allProfiles?.find(
                                (prof) => prof.clefUser === param._id
                              )?.image
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              margin: "0px auto",
                            }}
                          />
                        ) : (
                          <User />
                        )}
                      </div>
                    </td>
                    <td>
                      {allAddress?.find((prof) => prof.clefUser === param._id)
                        ?.name
                        ? allAddress?.find(
                            (prof) => prof.clefUser === param._id
                          )?.name
                        : param?.name
                        ? param?.name
                        : "none"}
                    </td>
                    <td>{param._id}</td>
                    <td>{param.email}</td>
                    <td>
                      {allProfiles?.find((prof) => prof.clefUser === param._id)
                        ?.numero
                        ? allProfiles?.find(
                            (prof) => prof.clefUser === param._id
                          )?.numero
                        : param?.phoneNumber
                        ? param?.phoneNumber
                        : "none"}
                    </td>
                    <td>
                      {
                        allcomandes?.filter(
                          (item) => item?.clefUser === param._id
                        )?.length
                      }
                    </td>
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

export default ACustomers;
