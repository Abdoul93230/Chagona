import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDet.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import image from "../../Images/sac2.png";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import whatsapp from "../../Images/whatsapp.png";
import { ArrowDownRight, Copy, Phone, Share } from "react-feather";
import {
  ChevronLeft,
  ShoppingCart,
  Star,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function ProductDet() {
  const params = useParams();
  const [poppup, setPoppup] = useState(false);
  const [poppup2, setPoppup2] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [VP, setVp] = useState(null);
  const [commente, setCommente] = useState("");
  const [Allcommente, setAllCommente] = useState([]);
  const [etoil, setEtoil] = useState(5);
  const [color, setColor] = useState(null);
  const [taille, setTaille] = useState(null);
  const [nbrCol, setNbrCol] = useState(null);
  const [option, setOption] = useState("Details");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("userEcomme"));
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Products = useSelector((state) => state.products.data);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      handleAlert("Url Copier");
    });
  };

  const shareProductViaWhatsApp = (
    productName,
    productURL,
    productImageURL
  ) => {
    // Ajouter l'image du produit à la fin du message WhatsApp
    // const message = `Découvrez ce produit incroyable : ${productName} \n\n${productURL}\n\n${productImageURL}`;

    const message = `Découvrez ce produit incroyable : ${productName} \n\n${productURL}}`;
    const encodedMessage = encodeURIComponent(message);

    // Vérifier si l'utilisateur est sur mobile
    const isMobile =
      /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
        navigator.userAgent
      );

    // Générer le lien de partage sur WhatsApp pour le Web
    const whatsappWebURL = `https://web.whatsapp.com/send?text=${encodedMessage}`;

    if (isMobile) {
      // Si sur mobile, utiliser le schéma whatsapp:// pour ouvrir WhatsApp
      const whatsappAppURL = `whatsapp://send?text=${encodedMessage}`;
      window.location.href = whatsappAppURL;
    } else {
      // Si sur desktop, simplement afficher le lien
      window.open(whatsappWebURL, "_blank");
    }
  };

  const handleChatButtonClick = (
    productName,
    productLink,
    phoneNumber,
    productImageURL
  ) => {
    // Vérification des données du produit et du numéro de téléphone
    if (!productName || !productLink || !phoneNumber) {
      console.error(
        "Les informations du produit et le numéro de téléphone sont requis."
      );
      return;
    }

    // Création du message pré-rempli avec les informations du produit
    let message = `Bonjour, je suis intéressé(e) par le produit ${productName}.\n`;

    // Si une URL d'image est fournie, l'ajouter au message
    if (productImageURL) {
      message += `Voici le lien vers l'image : \n\n ${productImageURL} \n`;
    }
    if (productLink) {
      message += `et lE lien vers details du produit\n\n${productLink}`;
    }

    // Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(message);

    // Création de l'URL WhatsApp avec le numéro de téléphone et le message pré-rempli
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Ouvrir WhatsApp dans une nouvelle fenêtre ou un nouvel onglet
    window.open(whatsappURL, "_blank");
  };

  const [produitsL, setProduitsL] = useState(0);
  function goBack() {
    window.history.back();
  }
  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduitsL(JSON.parse(local));
    } else {
      setProduitsL(0);
    }
  }, []);

  // Déclare une fonction pour sélectionner des commentaires aléatoires
  const selectRandomComments = (comments, maxCount) => {
    // Vérifie si le nombre de commentaires disponibles est inférieur ou égal à maxCount
    if (comments.length <= maxCount) {
      return comments; // Retourne tous les commentaires disponibles
    }

    const shuffled = comments.sort(() => 0.5 - Math.random()); // Mélange les commentaires de manière aléatoire
    return shuffled.slice(0, maxCount); // Sélectionne les premiers maxCount commentaires
  };

  // Utilise la fonction selectRandomComments pour obtenir une liste de commentaires aléatoires
  const randomComments = selectRandomComments(Allcommente, 10);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/Product/${params.id}`)
      .then((res) => {
        setVp(res.data.data);
        // console.log(res.data.data);
        // setOption(
        //   res.data.data?.taille[0].split(",").length >= 2 ||
        //     res.data.data?.couleur[0].split(",").length >= 2
        //     ? "Product"
        //     : "Details"
        // );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    // axios
    //   .get(`${BackendUrl}/getAllCategories`)
    //   .then((Categories) => {
    setAllCategories(DATA_Categories);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // axios
    //   .get(`${BackendUrl}/products`)
    //   .then((Categories) => {
    setAllProducts(DATA_Products);
    // })
    // .catch((error) => {
    //   console.log(error.response.data.message);
    // });
  }, []);

  const envoyer = () => {
    const regexNumber = /^[0-5]$/;
    if (commente.trim().length < 3) {
      handleAlertwar("votre commentaire doit contenire au moin 3 carracteres.");
      return;
    }
    if (!etoil) {
      handleAlertwar("veuiller noter ce produit s'il vous plait.");
      return;
    }
    if (!regexNumber.test(etoil.toString())) {
      handleAlertwar("forma non valid de 1 a 5 s'il vous plait!");
      return;
    }
    axios
      .post(`${BackendUrl}/createCommenteProduit`, {
        description: commente,
        clefProduct: VP?._id,
        clefType: VP?.ClefType,
        etoil: etoil,
        userName: user.name,
      })
      .then((resp) => {
        alert(resp.data.message);
        setPoppup(false);
        setEtoil(null);
        setCommente("");

        axios
          .get(`${BackendUrl}/getAllCommenteProduitById/${params.id}`)
          .then((coments) => {
            setAllCommente(coments.data);
            // console.log(coments.data);
          })
          .catch((error) => {
            alert(error.response.data);
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error.response.data);
        console.log(error);
      });
  };

  const navigue = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const AddProduct = () => {
    const existingProducts = JSON.parse(localStorage.getItem("panier")) || [];

    const isProductInCart = existingProducts.some((p) => p.id === params.id);

    if (isProductInCart) {
      const updatedProducts = existingProducts.map((p) => {
        if (p.id === params.id) {
          const updatedColors = [...p.colors, color]; // Ajouter la nouvelle couleur
          const updatedSizes = [...p.sizes, taille]; // Ajouter la nouvelle taille

          return {
            ...p,
            colors: updatedColors,
            sizes: updatedSizes,
            quantity: p.quantity + 1,
            id: params.id,
          };
        }
        return p;
      });

      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      handleAlert("La quantité du produit a été incrémentée dans le panier !");
      const local = localStorage.getItem("panier");
      if (local) {
        setProduitsL(JSON.parse(local));
      } else {
        setProduitsL(0);
      }
      return;
    }

    if (VP?.couleur[0].split(",").length >= 2 && !color) {
      if (VP.pictures.length >= 2) {
        handleAlertwar(
          `Veuillez choisir un model parmis les ${VP?.pictures.length}`
        );
      } else {
        handleAlertwar(
          `Veuillez choisir une couleur parmis les ${
            VP?.couleur[0].split(",").length
          }`
        );
      }
      chgOption("Details", 0);
      return;
    }

    if (VP?.taille[0].split(",").length >= 2 && !taille) {
      handleAlertwar(
        `Veuillez choisir une taille parmis les ${
          VP?.taille[0].split(",").length
        }`
      );
      chgOption("Details", 0);
      return;
    }

    const updatedProducts = [
      ...existingProducts,
      {
        ...VP,
        colors: [color], // Ajouter la couleur sélectionnée comme tableau
        sizes: [taille], // Ajouter la taille sélectionnée comme tableau
        quantity: 1,
        id: params.id,
      },
    ];

    localStorage.setItem("panier", JSON.stringify(updatedProducts));
    handleAlert("Produit ajouté au panier !");
    const local = localStorage.getItem("panier");
    if (local) {
      setProduitsL(JSON.parse(local));
    } else {
      setProduitsL(0);
    }
  };

  const [allTypes, setAllTypes] = useState(null);

  const CVCate = allTypes
    ? allTypes.find((item) => item?._id === VP?.ClefType)?.clefCategories
    : null;

  const Categorie = allCategories
    ? allCategories.find((item) => item?._id === CVCate)?.name
    : null;

  useEffect(() => {
    // axios
    //   .get(`${BackendUrl}/getAllType`)
    //   .then((types) => {
    setAllTypes(DATA_Types);

    axios
      .get(`${BackendUrl}/getAllCommenteProduitById/${params.id}`)
      .then((coments) => {
        setAllCommente(coments.data);
        // console.log(coments.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const chgOption = (param, index) => {
    setOption(param);

    const cls = document.getElementsByClassName("x");
    for (let i = 0; i < cls.length; i++) {
      if (i === index) {
        if (!cls[i].classList.contains("d")) cls[i].classList.add("d");
      } else {
        cls[i].classList.remove("d");
      }
    }
  };
  const [plus, setPlus] = useState(false);
  const plust = () => {
    setPlus(!plus);
    const a = document.getElementsByClassName("detplus")[0].classList;
    if (a.contains("PLUS")) {
      a.remove("PLUS");
    } else {
      a.add("PLUS");
    }
  };

  const [plustM, setPlustM] = useState(false);

  const plusM = (index) => {
    setPlustM(!plustM);
    const a = document.getElementsByClassName("PLM")[index].classList;
    if (a.contains("PLUS")) {
      a.remove("PLUS");
    } else {
      a.add("PLUS");
    }
  };

  const shareURL = () => {
    const currentURL = window.location.href;
    // Utilisez la fonction de partage ici avec l'URL actuelle
    shareProductViaWhatsApp(VP?.name ?? "nom", currentURL, VP?.image1);
  };
  const Discuite = () => {
    const currentURL = window.location.href;
    // Utilisez la fonction de partage ici avec l'URL actuelle
    handleChatButtonClick(
      VP?.name ?? "nom",
      currentURL,
      22787727501,
      VP?.image1
    );
  };

  const setBorder = (index) => {
    const cls = document.getElementsByClassName("setBorder");
    for (let i = 0; i < cls.length; i++) {
      if (i === index) {
        if (!cls[i].classList.contains("active"))
          cls[i].classList.add("active");
      } else {
        cls[i].classList.remove("active");
      }
    }
  };
  const setBorderT = (index) => {
    const cls = document.getElementsByClassName("setBorderT");
    for (let i = 0; i < cls.length; i++) {
      if (i === index) {
        if (!cls[i].classList.contains("active"))
          cls[i].classList.add("active");
      } else {
        cls[i].classList.remove("active");
      }
    }
  };

  const OP =
    option === "Details" ? (
      <div className="Details">
        <table>
          <tr>
            <td style={{ textAlign: "left" }}>
              <h2>Brand</h2>
              <p>{VP?.marque}</p>
            </td>
            <td style={{ textAlign: "right" }}>
              <h2>Categoriy</h2>
              <p>{Categorie}</p>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>
              <h2>Livraison</h2>
              <p>
                {VP?.prixLivraison
                  ? `${VP?.prixLivraison && VP?.prixLivraison > 0}f (Niamey)`
                  : // : `750F (Niamey)`
                    "offerte(Niamey)"}
              </p>
            </td>
            <td style={{ textAlign: "right" }}>
              <h2>fitting</h2>
              <p>true to size</p>
            </td>
          </tr>
        </table>

        <div style={{ width: "100%", height: "auto" }}>
          {VP?.couleur[0].split(",").length >= 2 ? (
            <div className="color">
              {VP?.pictures.length !== 0 ? (
                <>
                  <h3>SELECT COLOR : {nbrCol ? `color:${nbrCol}` : ""}</h3>
                  <div className="coli">
                    {VP?.pictures.map((param, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: param,
                          // boxShadow: `0px 0px 7px ${param}`,
                        }}
                        onClick={() => {
                          setColor(param);
                          setNbrCol(+index + 1);
                          setBorder(index);
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          className="setBorder"
                          src={param}
                          alt="loading"
                        />
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3>SELECT COLOR : {color ? color : ""}</h3>
                  <div className="col">
                    {VP?.couleur[0].split(",").map((param, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: param,
                          boxShadow: `0px 0px 7px ${param}`,
                        }}
                        onClick={() => setColor(param)}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}

          {VP?.taille[0].split(",").length >= 2 ? (
            <div className="size">
              <h3>SELECT SIZE (US) : {taille ? taille : ""}</h3>
              <div className="siz">
                {VP?.taille[0].split(",").map((param, index) => {
                  return (
                    <span
                      className="setBorderT"
                      key={index}
                      onClick={() => {
                        setTaille(param);
                        setBorderT(index);
                      }}
                    >
                      {param}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* <div className="detplus" onClick={plust}> */}
        {/* <p>{VP?.description}</p> */}
        <div
          className="ddet"
          style={{
            // display: "flex",
            textAlign: "left",
            padding: "2px 7px",
          }}
          dangerouslySetInnerHTML={{
            __html: VP?.description,
          }}
        ></div>
        {/* <span onClick={plust}>
            {plus ? (
              <ChevronUp onClick={plust} />
            ) : (
              <ChevronDown onClick={plust} />
            )}
          </span>
        </div> */}
        {VP?.pictures.length !== 0 ? (
          <div className="ImgPlus">
            {VP?.pictures.map((param, index) => {
              return <img key={index} alt="loading" src={param} />;
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    ) : option === "Reviews" ? (
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "70px",
        }}
      >
        {randomComments.length > 0 ? (
          randomComments.map((param, index) => {
            const etoiles = param.etoil;
            return (
              <div key={index} className="Reviews">
                <div className="left">
                  <h2>
                    {param.userName
                      ?.split(" ")
                      .map((word) => word.charAt(0))
                      .join("")}
                  </h2>
                </div>
                <div className="right">
                  <div className="top">
                    <div className="l">
                      <h3>
                        {[...Array(etoiles)].map((_, i) => (
                          <Star key={i} />
                        ))}
                      </h3>
                      <h4>{param.userName}</h4>
                      <div className="PLM" onClick={() => plusM(index)}>
                        <p>{param.description}</p>
                        <span>{plustM ? <ChevronUp /> : <ChevronDown />}</span>
                      </div>
                    </div>
                    <h3 className="r">{formatDate(param.date)}</h3>
                  </div>
                  <div className="bottom">
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image1
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image2
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image3
                      }
                      alt="loading"
                    />
                    <img
                      src={
                        allProducts.find(
                          (item) => item?._id === param?.clefProduct
                        ).image1
                      }
                      alt="loading"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>Aucun commentaire disponible pour ce produit pour le moment.</h3>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <LoadingIndicator loading={loading}>
      <div className="ProductDet">
        <Helmet>
          <title>{VP?.name}</title>
          {/* <link rel="icon" href="/chemin/vers/votre/nouveau/favicon.ico" /> */}
          <link rel="icon" type="image" href={VP?.image1} />
          <link rel="apple-touch-icon" href={VP?.image1} />
          <meta property="og:title" content={VP?.name} />
          <meta property="og:description" content={VP?.description} />
          <meta property="og:image" content={VP?.image1} />
        </Helmet>

        <ToastContainer />
        <div className="conte">
          <div className="top">
            <ul>
              <li className="retour" onClick={goBack}>
                <ChevronLeft style={{ width: "30px", height: "30px" }} />
              </li>
              <li className="NP">
                <h6>{VP?.name}</h6>
                {VP?.prixPromo > 0 ? (
                  <>
                    <span>
                      <s>cfa: {VP?.prix}</s>
                    </span>
                    <br />
                    <h5>
                      cfa: {VP?.prixPromo}{" "}
                      <span>
                        <Star style={{ width: "12px" }} />
                        4.9
                      </span>
                    </h5>
                  </>
                ) : (
                  <h5>
                    Cfa {VP?.prix}{" "}
                    <span>
                      <Star style={{ width: "12px" }} />
                      4.9
                    </span>
                  </h5>
                )}
              </li>
              <li className="Scarde" onClick={() => navigue("/Cart")}>
                <ShoppingCart /> <span>{produitsL ? produitsL.length : 0}</span>
              </li>
            </ul>
          </div>
          <div className="midel carousel-container">
            <Slider {...settings}>
              <div className="slide">
                <div
                  style={{
                    backgroundImage: `url(${VP?.image1})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "100%", // Ajustez la hauteur selon vos besoins
                    width: "100%", // Ajustez la largeur selon vos besoins
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff9696", // Couleur du texte, ajustez selon vos besoins
                    // border:'2px solid crimson',
                    borderRadius:'20px'
                  }}
                ></div>
                {/* <img src={VP?.image1} alt="loading" /> */}
              </div>
              <div className="slide">
                {/* <img src={VP?.image2} alt="loading" /> */}
                <div
                  style={{
                    backgroundImage: `url(${VP?.image2})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "100%", // Ajustez la hauteur selon vos besoins
                    width: "100%", // Ajustez la largeur selon vos besoins
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff9696", // Couleur du texte, ajustez selon vos besoins
                    borderRadius:'20px'
                  }}
                ></div>
              </div>
              <div className="slide">
                {/* <img src={VP?.image3} alt="loading" /> */}
                <div
                  style={{
                    backgroundImage: `url(${VP?.image3})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "100%", // Ajustez la hauteur selon vos besoins
                    width: "100%", // Ajustez la largeur selon vos besoins
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff9696", // Couleur du texte, ajustez selon vos besoins
                    borderRadius:'20px'
                  }}
                ></div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="menu">
          {/* {VP?.taille[0].split(",").length >= 2 ||
          VP?.couleur[0].split(",").length >= 2 ? (
            <>
              <h5
                className={
                  VP?.taille[0].split(",").length >= 2 ||
                  VP?.couleur[0].split(",").length >= 2
                    ? "x d"
                    : "x"
                }
                onClick={() => chgOption("Product", 0)}
              >
                Product <ArrowDownRight style={{ width: 15 }} />
              </h5>
            </>
          ) : (
            <></>
          )} */}
          <h5 className={"x d"} onClick={() => chgOption("Details", 0)}>
            Details <ArrowDownRight style={{ width: 15 }} />
          </h5>
          <h5 className="x" onClick={() => chgOption("Reviews", 1)}>
            Reviews <ArrowDownRight style={{ width: 15 }} />
          </h5>
        </div>
        {OP}
        <div className="button">
          <div className="top">
            <button
              className="btn1"
              // onClick={() => navigue("/Profile/Invite_Friends")}

              onClick={() => {
                setPoppup2(true);
              }}
            >
              SHARE THIS{" "}
              <span>
                <Share />
              </span>
            </button>
            <button className="btn2" onClick={Discuite}>
              DISCUTEZ EN{" "}
              <span>
                {/* <Phone /> */}
                <img src={whatsapp} alt="loading"/>
              </span>
            </button>
            <button className="btn2" onClick={AddProduct}>
              ADD TO CART{" "}
              <span>
                <ShoppingCart />
              </span>
            </button>
          </div>
          <div className="bottom">
            {/* A faire : Un button pour La possibilite de pouvoir commander via Whatsapp */}
          </div>
        </div>
        <div
          className="comment"
          onClick={() => {
            setPoppup(true);
          }}
        >
          <h4>Comment?</h4>
        </div>
        {poppup ? (
          <div className="poppupConte">
            <div className="poppup">
              <div className="top">
                <h3>Ecrire un commentaitre</h3>
                <span>
                  <X onClick={() => setPoppup(!poppup)} />
                </span>
              </div>
              <div className="CodeClef">
                <textarea
                  type="text"
                  onChange={(e) => setCommente(e.target.value)}
                  placeholder="tape the commente here"
                ></textarea>
                <label className="T">Notez ce produit</label>
                <section
                  onChange={(e) => {
                    setEtoil(Number(e.target.value));
                  }}
                >
                  <label htmlFor="un">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      id="un"
                      name="etoille"
                      value={1}
                    />
                    <Star
                      style={{ color: etoil === 1 ? "#FF6969" : "white" }}
                      className="i"
                    />
                  </label>
                  <label htmlFor="deux">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      id="deux"
                      name="etoille"
                      value={2}
                    />
                    <Star
                      style={{ color: etoil === 2 ? "#FF6969" : "white" }}
                      className="i"
                    />
                  </label>
                  <label htmlFor="trois">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      id="trois"
                      name="etoille"
                      value={3}
                    />
                    <Star
                      style={{ color: etoil === 3 ? "#FF6969" : "white" }}
                      className="i"
                    />
                  </label>
                  <label htmlFor="quatre">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      id="quatre"
                      name="etoille"
                      value={4}
                    />
                    <Star
                      style={{ color: etoil === 4 ? "#FF6969" : "white" }}
                      className="i"
                    />
                  </label>
                  <label htmlFor="cinq">
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      id="cinq"
                      name="etoille"
                      value={5}
                    />
                    <Star
                      style={{ color: etoil === 5 ? "#FF6969" : "white" }}
                    />
                  </label>
                </section>
                <button onClick={envoyer}>Envoyer</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* ///////////////////////////////////////////////////////// */}

        {poppup2 ? (
          <div className="poppupConte">
            <div className="poppup">
              <div className="top">
                <h3>Partagez ce Lien</h3>
                <span>
                  <X style={{color:'#515c6f'}} onClick={() => setPoppup2(!poppup2)} />
                </span>
              </div>
              <div className="CodeClef">
                <div className="group">
                  <span onClick={handleCopyClick}><Copy/> Copier :</span>
                  <input type="text" value={window.location.href} />
                </div>
                <div className="group">
                  <span>Via whatsapp :</span>
                  <img src={whatsapp} alt="loading" onClick={shareURL} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </LoadingIndicator>
  );
}

export default ProductDet;
