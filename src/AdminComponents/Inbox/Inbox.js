import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./Inbox.css";
// import image1 from "../../Images/sac2.png";
import image1 from "../../Images/icon_user.png";
import { ChevronRight, Search, Delete } from "react-feather";
import axios from "axios";
import ReactQuill from "react-quill";
const BackendUrl = process.env.REACT_APP_Backend_Url;
const socket = io(BackendUrl);
function Inbox() {
  const [allUsers, setAllUsers] = useState(null);
  const [allProfiles, setallprofiles] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [userSearch, setUserSearch] = useState(null);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const [istrue, setIstrue] = useState(false);
  const messageContainerRef = useRef(null);
  const provenance = false;

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [allMessage]);

  const handleMessageChange = (value) => {
    setMessage(value);
  };
  useEffect(() => {
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
      .get(`${BackendUrl}/getAllUserMessages`)
      .then((res) => {
        setAllMessages(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Écouter les nouveaux messages du serveur
    socket.on("new_message_user", (message) => {
      // console.log("oui");
      axios
        .get(`${BackendUrl}/getAllUserMessages`)
        .then((res) => {
          setAllMessages(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      if (message) {
        // console.log(message.data.clefUser);

        axios
          .get(
            `${BackendUrl}/getUserMessagesByClefUser/${message.data.clefUser}`
          )
          .then((res) => {
            setAllMessage(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    return () => {
      // Nettoyer l'écouteur du socket lors du démontage du composant
      socket.off("new_message_user");
    };
  }, [socket]);

  const getMessages = (param) => {
    axios
      .get(`${BackendUrl}/getUserMessagesByClefUser/${param}`)
      .then((res) => {
        setAllMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .put(`${BackendUrl}/lecturAdminMessage`, { userKey: param })
      .then((resp) => {
        // console.log(resp);
      })
      .catch((erro) => {
        console.log(erro);
      });
    axios
      .get(`${BackendUrl}/getAllUserMessages`)
      .then((res2) => {
        setAllMessages(res2.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // getAllUserMessages
  const envoyer = (e) => {
    e.preventDefault();
    if (message.length <= 0) {
      return;
    }
    axios
      .post(`${BackendUrl}/createUserMessage`, {
        message: message,
        clefUser: istrue?._id,
        provenance: provenance,
      })
      .then((res) => {
        // alert(res.data);
        socket.emit("new_message_u", {
          data: {
            message: message,
            clefUser: istrue?._id,
            provenance: provenance,
          },
        });
        setMessage("");
        axios
          .get(`${BackendUrl}/getUserMessagesByClefUser/${istrue?._id}`)
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
      .get(`${BackendUrl}/getUserByName/${name}`)
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
      .delete(`${BackendUrl}/deleteUserMessageById/${param}`)
      .then((res) => {
        alert(res.data.message);
        socket.emit("delete_message", res.data.message);

        axios
          .get(`${BackendUrl}/getUserMessagesByClefUser/${istrue?._id}`)
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
                    onClick={() => {
                      getMessages(param._id);
                      setIstrue(param);
                    }}
                  >
                    {/* https://chagona.onrender.com/images/image-1688253105925-0.jpeg */}

                    <img
                      src={
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image &&
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image !=
                          "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
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
                          : param?.phoneNumber
                          ? param?.phoneNumber
                          : "none"}{" "}
                        <span> Bonjour...</span>
                      </p>
                      <span className="nbr">
                        {
                          allMessages.filter(
                            (item) =>
                              item.clefUser === param._id &&
                              item.lusAdmin === false &&
                              item.provenance === true
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                );
              })
            : userSearch?.map((param, index) => {
                return (
                  <div
                    className="carde"
                    key={index}
                    onClick={() => {
                      getMessages(param._id);
                      setIstrue(param);
                    }}
                  >
                    <img
                      src={
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image &&
                        allProfiles?.find((prof) => prof.clefUser === param._id)
                          ?.image !=
                          "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
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
                          : param?.phoneNumber
                          ? param?.phoneNumber
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
                      ?.image &&
                    allProfiles?.find((prof) => prof.clefUser === istrue._id)
                      ?.image !=
                      "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
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
                      : istrue?.phoneNumber
                      ? istrue?.phoneNumber
                      : "none"}{" "}
                    {/* <span> Bonjour...</span> */}
                  </p>
                </div>
              </div>
              <div className="plus">
                <Search />
                <span>...</span>
              </div>
            </div>
            <div className="main">
              <div className="top" ref={messageContainerRef}>
                {allMessage?.map((param, index) => {
                  return (
                    <div className="carde" key={index}>
                      <div
                        dangerouslySetInnerHTML={{ __html: param?.message }}
                      ></div>
                      {/* <p>{param.message}</p> */}

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
                  {/* <textarea
                    placeholder="Tape here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button>
                    <ChevronRight onClick={envoyer} />
                  </button> */}
                  <ReactQuill
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Écrivez votre message ici..."
                    className="custom-editor" // Ajoutez une classe CSS personnalisée ici
                  />
                  <button className="button" onClick={envoyer}>
                    Envoyer
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
