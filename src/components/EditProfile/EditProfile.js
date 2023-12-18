import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import "./EditProfile.css";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";
import image from "../../Images/icon_user.png";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function EditProfile() {
  const navigue = useNavigate();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageP, setImageP] = useState(image);
  const [messageEr, setMessageEr] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleAlert = (message) => {
    toast.success(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAlertwar = (message) => {
    toast.warn(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  useEffect(() => {
    if (a) {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${a.token}`;
      axios
        .get(`${BackendUrl}/user`, {
          params: {
            id: a.id,
          },
        })
        .then((response) => {
          const data = response.data.user;
          console.log(a);
          setNom(data.name);
          setPhone(data?.phoneNumber ? data?.phoneNumber : "");
          setEmail(data.email);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      axios
        .get(`${BackendUrl}/getUserProfile`, {
          params: {
            id: a.id,
          },
        })
        .then((Profiler) => {
          // console.log(Profiler);
          setLoading(false);
          if (
            Profiler.data.data.image !==
            `https://chagona.onrender.com/images/image-1688253105925-0.jpeg`
          ) {
            setImageP(Profiler.data.data.image);
          }
          if (Profiler.data.data.numero) {
            setPhone(Profiler.data.data.numero);
          }
        })
        .catch((erro) => {
          setLoading(false);
          if (erro.response.status === 404)
            setMessageEr(erro.response.data.message);
          // console.log(erro.response);
        });
    }
  }, []);

  const onSub = (e) => {
    e.preventDefault();
    if (nom.trim().length < 3) {
      return handleAlertwar(
        "Votre nom doit etre superieur ou inferieur a 3 caracteres"
      );
    } else if (!regexMail.test(email)) {
      return handleAlertwar("forma du mail non valid!");
    } else if (!regexPhone.test(phone.toString())) {
      return handleAlertwar("forma du numero non valid!");
    }
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const a = JSON.parse(localStorage.getItem(`userEcomme`));
    const formData = new FormData();
    formData.append("name", nom);
    formData.append("email", email);
    formData.append("phone", phone);
    if (photo !== null && allowedImageTypes.includes(photo.type)) {
      formData.append("image", photo);
    }
    formData.append("id", a.id);

    setLoading(true);
    axios
      .post(`${BackendUrl}/createProfile`, formData)
      .then((Profile) => {
        if (Profile.status === 200) {
          handleAlert(Profile.data.message);
          setEditingPhoto(false);
          setPhoto(null);
          axios
            .get(`${BackendUrl}/getUserProfile`, {
              params: {
                id: a.id,
              },
            })
            .then((Profiler) => {
              // console.log(Profiler);
              setLoading(false);
              if (
                Profiler.data.data.image !==
                `https://chagona.onrender.com/images/image-1688253105925-0.jpeg`
              ) {
                setImageP(Profiler.data.data.image);
              }
              if (Profiler.data.data.numero) {
                if (phone.length <= 0) {
                  setPhone(Profiler.data.data.numero);
                }
              }
            })
            .catch((erro) => {
              setLoading(false);
              if (erro.response.status === 404)
                setMessageEr(erro.response.data.message);
              console.log(erro.response);
            });
        } else {
          console.log({ err: Profile.data });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 402) {
          handleAlertwar(error.response.data.message);
        }
        if (error.response.data.data?.keyPattern?.email) {
          handleAlertwar("Un utilisateur avec le même email existe déjà ");
        }
        if (error.response.data.data?.keyPattern?.phoneNumber) {
          handleAlertwar("Un utilisateur avec le même Numero existe déjà ");
        }
        console.log(error.response);
      });
  };

  const handleFileInputChange = (param) => {
    const selectedFile = param;

    if (selectedFile) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedImageTypes.includes(selectedFile.type)) {
        setPhoto(selectedFile);
        return true;
      } else {
        handleAlertwar(
          "Le fichier sélectionné n'est pas une image valide (JPEG, PNG, GIF, WebP autorisés)."
        );
        // setEditingPhoto(false);
        setPhoto(null);
        return false;
      }
    }
  };

  const onChangeImg = () => {
    const a = JSON.parse(localStorage.getItem(`userEcomme`));

    // Vérifiez si l'éditeur de photos existe
    if (!editorRef.current) {
      console.log("L'éditeur de photos n'est pas défini");
      return;
    }

    // Récupérez le fichier image édité à partir de l'éditeur de photos
    const editedCanvas = editorRef.current.getImage();

    // Vérifiez si editedCanvas est défini
    if (!editedCanvas) {
      console.log("Aucune image dans l'éditeur de photos");
      return;
    }

    editedCanvas.toBlob((blob) => {
      const editedFile = new File([blob], "edited_image.png", {
        type: "image/png",
      });

      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const formData = new FormData();

      if (allowedImageTypes.includes(editedFile.type)) {
        setLoading(true);
        formData.append("name", nom);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("id", a.id);
        formData.append("image", editedFile);

        axios
          .post(`${BackendUrl}/createProfile`, formData)
          .then((user) => {
            if (user.status === 200) {
              axios
                .get(`${BackendUrl}/getUserProfile`, {
                  params: { id: a.id },
                })
                .then((Profiler) => {
                  setLoading(false);
                  setEditingPhoto(false);
                  setMessageEr("");
                  if (
                    Profiler.data.data.image !==
                    "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
                  ) {
                    setImageP(Profiler.data.data.image);
                  }
                  if (Profiler.data.data.numero) {
                    if (phone.length <= 0) {
                      setPhone(Profiler.data.data.numero);
                    }
                  }
                })
                .catch((erro) => {
                  setLoading(false);
                  if (erro.response.status === 404) console.log(erro.response);
                });
            } else {
              console.log({ err: user.data });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.response);
          });
      } else {
        console.log("Non, le type de fichier édité n'est pas autorisé");
      }
    });
  };

  return (
    <LoadingIndicator loading={loading}>
      <div className="EditProfile">
        {messageEr ? <h6 style={{ marginBottom: 20 }}>{messageEr}</h6> : <></>}
        <div className="img" style={{ marginBottom: 66 }}>
          <label htmlFor="image" onClick={() => setEditingPhoto(true)}>
            <img src={imageP} alt="loading" />
            <h6 style={{ margin: "10px auto" }}>Click me to select image</h6>
          </label>
        </div>
        <h6></h6>
        <input
          // disabled={photo ? "disabled" : ""}
          type="file"
          id="image"
          style={{ display: "none" }}
          onChange={(e) => handleFileInputChange(e.target.files[0])}
        />

        <form onSubmit={onSub}>
          <label htmlFor="nom">
            Nom : <span>(3 caracteres au moin)</span>
          </label>
          <input
            type="text"
            id="nome"
            defaultValue={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
            style={{ borderColor: nom.trim().length < 3 ? "red" : "gray" }}
          />
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{
              borderColor: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? "red"
                : "gray",
            }}
          />

          <label htmlFor="Phone">Phone :</label>
          <input
            type="number"
            id="Phone"
            value={phone}
            placeholder="************"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            style={{
              borderColor: !regexPhone.test(phone.toString()) ? "red" : "gray",
            }}
          />
          <label style={{ marginTop: 15, fontSize: 12, cursor: "pointer" }}>
            Change password?
          </label>

          <div className="btn">
            <input
              type="submit"
              value="retour"
              onClick={() => navigue("/Profile")}
            />
            <input type="submit" value="Submit" onSubmit={onSub} />
          </div>
        </form>
        {/* {editingPhoto && (
          <div
            className="editPhoto"
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: "0px",
              left: "0px",
              zIndex: 100,
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.747)",
              }}
            >
              <div className="item">
                <button
                  onClick={() => {
                    setEditingPhoto(false);
                    setPhoto(null);
                  }}
                >
                  Annuler
                </button>
                <AvatarEditor
                  ref={editorRef}
                  image={photo}
                  width={130}
                  height={130}
                  border={10}
                  borderRadius={50}
                  scale={scale}
                />
                <label htmlFor="image" onClick={() => setEditingPhoto(true)}>
                  Select Images
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                />
                {photo ? (
                  <button className="deux" onClick={onChangeImg}>
                    Enregistrer
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )} */}

        {editingPhoto && (
          <div
            className="editPhoto"
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              top: "0px",
              left: "0px",
              zIndex: 100,

              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",

                background: "rgba(0, 0, 0, 0.747)",
                paddingTop: "100px",
              }}
            >
              <div
                className="item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 0px 6px #ff6969",
                  borderRadius: "10px",
                  width: 320,
                  margin: "0px auto",
                }}
              >
                <AvatarEditor
                  ref={editorRef}
                  image={photo}
                  width={130}
                  height={130}
                  border={10}
                  borderRadius={50}
                  scale={scale}
                  style={{
                    width: "80%",
                    height: "230px",
                    margin: "10px auto",
                  }}
                />
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                  style={{
                    width: "80%",
                    margin: "0px auto",
                    marginBottom: "15px",
                  }}
                />
                <label
                  htmlFor="image"
                  onClick={() => setEditingPhoto(true)}
                  style={{
                    width: "280px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "#ff6969",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "15px",
                    fontFamily: "serif",
                    fontWeight: "bold",
                    margin: "10px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Select Images
                </label>
                <button
                  onClick={() => {
                    setEditingPhoto(false);
                    setPhoto(null);
                  }}
                  style={{
                    width: "280px",
                    color: "#fff",
                    cursor: "pointer",
                    background: "#ff6969",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "15px",
                    fontFamily: "serif",
                    fontWeight: "bold",
                    fontSize: "20px",
                    margin: "10px auto",
                  }}
                >
                  Annuler
                </button>
                {photo ? (
                  <button className="deux" onClick={onSub}>
                    Enregistrer
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </LoadingIndicator>
  );
}

export default EditProfile;
