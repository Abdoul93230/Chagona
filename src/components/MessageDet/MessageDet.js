import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./MessageDet.css";
import { ChevronLeft, Plus, ChevronUp, Delete } from "react-feather";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function MessageDet({ chg }) {
  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const provenance = true;

  function goBack() {
    window.history.back();
  }

  function formatDate(date) {
    const options = { weekday: "long", hour: "numeric", minute: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-US", options);
    return formattedDate;
  }

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getUserMessagesByClefUser/${a.id}`)
      .then((res) => {
        setAllMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const envoyer = () => {
    if (message.length <= 0) {
      return;
    }
    axios
      .post(`${BackendUrl}/createUserMessage`, {
        message: message,
        clefUser: a.id,
        provenance: provenance,
      })
      .then((res) => {
        // alert(res.data);
        setMessage("");
        axios
          .get(`${BackendUrl}/getUserMessagesByClefUser/${a.id}`)
          .then((re) => {
            setAllMessage(re.data);
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((error) => console.log(error));
  };

  const deletmessage = (param) => {
    axios
      .put(`${BackendUrl}/updateUserMessageAttributeById/${param}`, {
        use: false,
      })
      .then((res) => {
        console.log(res.data);

        axios
          .get(`${BackendUrl}/getUserMessagesByClefUser/${a.id}`)
          .then((re) => {
            setAllMessage(re.data);
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="MessageDet">
      <div className="top">
        <div className="left">
          <span>
            <ChevronLeft
              onClick={() => {
                // chg("All")
                goBack();
              }}
              style={{ width: "40px", height: "40px" }}
            />
          </span>
          <div className="det">
            <h4>Smiley's Store</h4>
            <h5>Active</h5>
          </div>
        </div>

        <h2>ss</h2>
      </div>

      <div className="main">
        {allMessage.map((param, index) => {
          if (!param.use) {
            return null;
          }
          return (
            <Fragment key={index}>
              <h5>{formatDate(param.date)}</h5>
              <div className="message">
                <p>{param.message}</p>
                <Delete
                  className="del"
                  onClick={() => deletmessage(param._id)}
                />
              </div>
              <h6>{param.provenance ? "vous" : ""}</h6>
            </Fragment>
          );
        })}
      </div>

      <div className="bottom">
        <Plus className="un" />
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ChevronUp className="deux" onClick={envoyer} />
      </div>
    </div>
  );
}

export default MessageDet;
