import React, { useEffect, useState } from "react";
import "./Inbox.css";
import image1 from "../../Images/sac2.png";
import { ChevronRight, Search, Delete } from "react-feather";
import axios from "axios";

function Inbox() {
  const [allUsers, setAllUsers] = useState(null);
  const [allProfiles, setallprofiles] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [userSearch, setUserSearch] = useState(null);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const [istrue, setIstrue] = useState(false);
  const provenance = false;
  useEffect(() => {
    axios
      .get("http://localhost:8080/getUsers")
      .then((users) => {
        setAllUsers(users.data.data);
        // console.log(users.data.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/getUserProfiles")
      .then((users) => {
        setallprofiles(users.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const getMessages = (param) => {
    setIstrue(param);

    axios
      .get(`http://localhost:8080/getUserMessagesByClefUser/${param._id}`)
      .then((res) => {
        setAllMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const envoyer = (e) => {
    e.preventDefault();
    if (message.length <= 0) {
      return;
    }
    axios
      .post("http://localhost:8080/createUserMessage", {
        message: message,
        clefUser: istrue?._id,
        provenance: provenance,
      })
      .then((res) => {
        // alert(res.data);
        setMessage("");
        axios
          .get(`http://localhost:8080/getUserMessagesByClefUser/${istrue?._id}`)
          .then((re) => {
            setAllMessage(re.data);
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((error) => console.log(error));
  };

  const searchByName = (name) => {
    if (name.length < 2) {
      return;
    }
    axios
      .get(`http://localhost:8080/getUserByName/${name}`)
      .then((res) => {
        setUserSearch(res.data.users);
      })
      .catch((error) => {
        // console.log(error);
        setUserSearch(null);
      });
  };

  const deletmessage = (param) => {
    axios
      .delete(`http://localhost:8080/deleteUserMessageById/${param}`)
      .then((res) => {
        // alert(res.data.message);

        axios
          .get(`http://localhost:8080/getUserMessagesByClefUser/${istrue?._id}`)
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
    <div className="AInbox">
      <div className="left">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              searchByName(e.target.value);
              setSearchName(e.target.value);
            }}
          />
          <Search />
        </div>
        <div className="conteCarde">
          {!userSearch || searchName.length < 2
            ? allUsers?.map((param, index) => {
                return (
                  <div
                    className="carde"
                    key={index}
                    onClick={() => getMessages(param)}
                  >
                    <img
                      src={
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image
                          ? allProfiles?.find(
                              (prof) => prof.clefUser === param._id
                            )?.image
                          : image1
                      }
                      alt="loading"
                    />
                    <div className="det">
                      <h4>{param.name}</h4>
                      <p>
                        {allProfiles?.find(
                          (prof) => prof.clefUser === param._id
                        )?.numero
                          ? allProfiles?.find(
                              (prof) => prof.clefUser === param._id
                            )?.numero
                          : "none"}{" "}
                        <span> Bonjour...</span>
                      </p>
                    </div>
                  </div>
                );
              })
            : userSearch?.map((param, index) => {
                return (
                  <div
                    className="carde"
                    key={index}
                    onClick={() => getMessages(param)}
                  >
                    <img
                      src={
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image
                          ? allProfiles?.find(
                              (prof) => prof.clefUser === param._id
                            )?.image
                          : image1
                      }
                      alt="loading"
                    />
                    <div className="det">
                      <h4>{param.name}</h4>
                      <p>
                        {allProfiles?.find(
                          (prof) => prof.clefUser === param._id
                        )?.numero
                          ? allProfiles?.find(
                              (prof) => prof.clefUser === param._id
                            )?.numero
                          : "none"}{" "}
                        <span> Bonjour...</span>
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="right">
        {istrue !== false ? (
          <>
            <div className="top">
              <div className="carde">
                <img
                  src={
                    allProfiles?.find((prof) => prof.clefUser === istrue._id)
                      ?.image
                      ? allProfiles?.find(
                          (prof) => prof.clefUser === istrue._id
                        )?.image
                      : image1
                  }
                  alt="loading"
                />
                <div className="det">
                  <h4>{istrue?.name}</h4>
                  <p>
                    {allProfiles?.find((prof) => prof.clefUser === istrue?._id)
                      ?.numero
                      ? allProfiles?.find(
                          (prof) => prof.clefUser === istrue?._id
                        )?.numero
                      : "none"}{" "}
                    <span> Bonjour...</span>
                  </p>
                </div>
              </div>
              <div className="plus">
                <Search />
                <span>...</span>
              </div>
            </div>
            <div className="main">
              <div className="top">
                {allMessage?.map((param, index) => {
                  return (
                    <div className="carde" key={index}>
                      <p>{param.message}</p>
                      {
                        <Delete
                          className="del"
                          onClick={() => deletmessage(param._id)}
                        />
                      }
                      <h6>{param.provenance ? "" : "vous"}</h6>
                    </div>
                  );
                })}
              </div>
              <div className="bottom">
                <form onSubmit={envoyer}>
                  <textarea
                    placeholder="Tape here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button>
                    <ChevronRight onClick={envoyer} />
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Inbox;
