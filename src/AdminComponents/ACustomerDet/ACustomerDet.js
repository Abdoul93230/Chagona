import React, { useEffect, useState } from "react";
import "./ACustomerDet.css";
import image1 from "../../Images/sac2.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Delete } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function ACustomerDet() {
  const [allUsers, setAllUsers] = useState(null);
  const [allProfiles, setallprofiles] = useState(null);
  const [allAddress, setallAdress] = useState(null);
  const [allcomandes, setAllcommandes] = useState(null);
  const [reduction, setReduction] = useState(0);
  const [dateExpired, setDateExpired] = useState(null);
  const [allCode, setAllCode] = useState(null);
  const params = useParams();

  function formatDate(date) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    return formattedDate;
  }

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

    axios
      .get(`${BackendUrl}/getCodePromoByClefUser/${params.id}`)
      .then((code) => {
        setAllCode(code.data.data);
        // console.log(code.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const ajoutter = (e) => {
    e.preventDefault();

    if (reduction <= 0) {
      alert("la reduction est incorrecte.");
      return;
    }
    if (!dateExpired) {
      alert("la date d'expiration est incorrecte.");
      return;
    }
    axios
      .post(`${BackendUrl}/createCodePromo`, {
        dateExpirate: dateExpired,
        prixReduiction: reduction,
        clefUser: params.id,
      })
      .then((reponse) => {
        alert(reponse.data.message);
        setReduction(0);
        setDateExpired(null);
        axios
          .get(`${BackendUrl}/getCodePromoByClefUser/${params.id}`)
          .then((code) => {
            setAllCode(code.data.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleCode = (id) => {
    axios
      .delete(`${BackendUrl}/deleteCodePromo/${id}`)
      .then((message) => {
        alert(message.data.message);
        axios
          .get(`${BackendUrl}/getCodePromoByClefUser/${params.id}`)
          .then((code) => {
            setAllCode(code.data.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ACustomerDet">
      <div className="left">
        <img
          src={
            allProfiles?.find((item) => item.clefUser === params.id)?.image
              ? allProfiles?.find((item) => item.clefUser === params.id)?.image
              : image1
          }
          alt="loading"
        />
        <h3>{allAddress?.find((item) => item.clefUser === params.id)?.name}</h3>
        <h3>Profession Du client</h3>
        <h3>
          WhatsApp :{" "}
          {allUsers?.find((item) => item._id === params.id)?.whatsapp
            ? "oui"
            : "non"}
          {/* {console.log(allUsers)} */}
        </h3>
        <div className="bon">
          <form id="add" onSubmit={ajoutter}>
            <h3>Ajouter un bons </h3>
            <label htmlFor="prix">Le prix a reduire</label>
            <input
              placeholder="Tape here"
              id="prix"
              type="Number"
              value={reduction}
              onChange={(e) => setReduction(e.target.value)}
            />

            <label htmlFor="date">Date d'expiration</label>
            <input
              id="date"
              type="date"
              onChange={(e) => setDateExpired(e.target.value)}
            />
            <input type="submit" value="Valide !" />
          </form>

          <form id="delet">
            <ol style={{ width: 150, marginTop: 14 }}>
              {allCode?.map((param, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      borderRadius: 5,
                      padding: 2,
                      boxShadow: "0px 0px 8px gray",
                    }}
                  >
                    <span>code : {param.code}</span>{" "}
                    <span>Create : {formatDate(param.date)}</span>
                    <span>Exp : {formatDate(param.dateExpirate)}</span>
                    <span>prix : {param.prixReduiction} f</span>
                    <Delete
                      style={{
                        cursor: "pointer",
                        width: 20,
                        margin: "2px auto",
                      }}
                      onClick={() => deleCode(param._id)}
                    />
                  </li>
                );
              })}
            </ol>
          </form>
        </div>
      </div>
      <div className="right">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>region</th>
              <th>Adress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {allAddress?.find((item) => item.clefUser === params.id)?.email}
              </td>
              <td>
                {
                  allAddress?.find((item) => item.clefUser === params.id)
                    ?.numero
                }
              </td>
              <td>
                {
                  allAddress?.find((item) => item.clefUser === params.id)
                    ?.region
                }
              </td>
              <td>
                {
                  allAddress?.find((item) => item.clefUser === params.id)
                    ?.quartier
                }
              </td>
            </tr>
            <tr>
              <th>nbr Commande</th>
              <th>Commande en cours</th>
              <th>nbr de bons</th>
              <th>moyen de payment</th>
            </tr>
            <tr>
              <td>
                {
                  allcomandes?.filter((item) => item?.clefUser === params.id)
                    ?.length
                }
              </td>
              <td>
                {
                  allcomandes?.filter(
                    (item) =>
                      item?.clefUser === params.id &&
                      item.statusLivraison === "en cours"
                  )?.length
                }
              </td>
              <td>0</td>
              <td>Mobil Money</td>
            </tr>
            <tr>
              <th>nbr de points</th>
            </tr>
            <tr>
              <td>
                <span>0</span> pts
              </td>
            </tr>
          </tbody>
        </table>
        <form>
          <label htmlFor="comment">
            Lui ecrire
            <select>
              <option>direct</option>
              <option>Email</option>
              <option>Sms</option>
            </select>
          </label>
          <textarea placeholder="Tape Here" id="comment" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default ACustomerDet;
