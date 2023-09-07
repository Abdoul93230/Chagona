import React, { useState, useEffect } from "react";
import "./CategorieProduct.css";
import Navbar from "../NaveBar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Search, ChevronRight, Star } from "react-feather";
import ConteProduits from "../ConteProduits/ConteProduits";
import image1 from "../../Images/sac.png";
import axios from "axios";
import LoadingIndicator from "../../Pages/LoadingIndicator ";
import { shuffle } from "lodash";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function CategorieProduct({ allCategories, allProducts }) {
  function goBack() {
    window.history.back();
  }

  const [allTypes, setAllTypes] = useState([]);
  const [Allcommente, setAllCommente] = useState([]);
  const [choix, setChoix] = useState("Home");
  const params = useParams();
  const navigue = useNavigate();
  const [allPub, setAllPub] = useState(null);
  const [loading, setLoading] = useState(true);
  let Pub =
    allPub?.filter(
      (item) =>
        item.clefCategorie ===
        allCategories?.find((item) => item.name === params.Cat)._id
    ) || [];
  // console.log(params.Cat);
  function getRandomElementsSix(array, nbr) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, nbr);
  }

  useEffect(() => {
    axios
      .get(`${BackendUrl}/productPubget`)
      .then((pub) => {
        // console.log(pub);
        if (pub.data.length > 0) {
          setAllPub(pub.data);
        } else {
          setAllPub(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllType`)
      .then((types) => {
        setAllTypes(types.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllCommenteProduit`)
      .then((coments) => {
        setAllCommente(coments.data);
        setLoading(false);
        // console.log(coments.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const ClefCate = allCategories
    ? allCategories.find((item) => item.name === params?.Cat)
    : null;
  const ClefTypes = allTypes
    ? allTypes.find((item) => item.name === params?.product)
    : null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  let vf = true;
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const Home1 = params.product
    ? getRandomElementsSix(
        allProducts.filter((item) => item.ClefType === ClefTypes?._id ?? ""),
        9
      )
    : getRandomElementsSix(
        allProducts.filter((item) =>
          allTypes.some(
            (type) =>
              type.clefCategories === ClefCate?._id &&
              item.ClefType === type._id
          )
        ),
        9
      );
  const Home2 = params.product
    ? getRandomElementsSix(
        allProducts.filter((item) => item.ClefType === ClefTypes?._id ?? ""),
        6
      )
    : getRandomElementsSix(
        allProducts.filter((item) =>
          allTypes.some(
            (type) =>
              type.clefCategories === ClefCate?._id &&
              item.ClefType === type._id
          )
        ),
        6
      );
  const Pt1 = params.product
    ? getRandomElementsSix(
        allProducts.filter((item) => item.ClefType === ClefTypes?._id ?? ""),
        6
      )
    : getRandomElementsSix(
        allProducts.filter((item) =>
          allTypes.some(
            (type) =>
              type.clefCategories === ClefCate?._id &&
              item.ClefType === type._id
          )
        ),
        6
      );
  const Ptp = params.product
    ? getRandomElementsSix(
        allProducts.filter(
          (item) => item.ClefType === ClefTypes?._id && item.prixPromo > 0
        ),
        6
      )
    : getRandomElementsSix(
        allProducts.filter((item) =>
          allTypes.some(
            (type) =>
              type.clefCategories === ClefCate?._id &&
              item.ClefType === type._id &&
              item.prixPromo > 0
          )
        ),
        6
      );
  const pt2 = params.product
    ? getRandomElementsSix(
        allProducts
          .slice(0, 30)
          .filter((item) => item.ClefType === ClefTypes?._id),
        6
      )
    : getRandomElementsSix(
        allProducts
          .slice(0, 30)
          .filter((item) =>
            allTypes.some(
              (type) =>
                type.clefCategories === ClefCate?._id &&
                item.ClefType === type._id
            )
          ),
        6
      );
  const ptAll = params.product
    ? allProducts.filter((item) => item.ClefType === ClefTypes?._id)
    : allProducts.filter((item) =>
        allTypes.some(
          (type) =>
            type.clefCategories === ClefCate?._id && item.ClefType === type._id
        )
      );

  const option =
    choix === "Home" ? (
      <div style={{ marginBottom: "50px" }}>
        <div className="home">
          <h3>Trending</h3>
          {Pub.length > 0 ? (
            <>
              <div
                className="carde carousel-container"
                style={{ overflow: "hidden" }}
              >
                <Slider className="c" {...settings}>
                  {Pub.map((param, index) => {
                    return (
                      <div
                        key={index}
                        style={{ width: "100%", height: "auto" }}
                      >
                        <div className="slide">
                          <div className="sup">
                            <p>Colection</p>
                            <span>
                              <ChevronRight />
                            </span>
                          </div>
                          <img src={param.image} alt="loading" />
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="produits">
            {Home1.map((param, index) => {
              return (
                <div
                  key={index}
                  className="carde"
                  onClick={() => navigue(`/ProductDet/${param._id}`)}
                >
                  <img src={param.image1} alt="loading" />
                  <h5>{param.name.slice(0, 20)}</h5>
                  <h6>${param.prix}</h6>
                </div>
              );
            })}
          </div>
        </div>
        <ConteProduits
          products={Home2}
          name={params.product ? params.product : params.Cat}
        />
      </div>
    ) : choix === "Products" ? (
      <div className="prod" style={{ marginBottom: "30px" }}>
        <div className="options">
          <ul>
            {allTypes
              ?.filter((param) => param.clefCategories === ClefCate?._id)
              .map((param, index) => {
                if (index > 4) {
                  return null;
                }
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigue(`/Categorie/${params.Cat}/${param.name}`);
                    }}
                  >
                    {param.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="promo">
          <h2>{params.product ? params.product : params.Cat}</h2>

          {/* <div className="contCarde">
            <div className="conteneur">
              {Pt1.map((param, index) => {
                return (
                  <div
                    key={index}
                    className="carde"
                    onClick={() => navigue(`/ProductDet/${param._id}`)}
                  >
                    <img src={param.image1} alt="loading" />
                    <h5>{param.name}</h5>
                    <h6>${param.prix}</h6>
                  </div>
                );
              })}
            </div>
          </div> */}
          {pt2?.length > 0 ? (
            <ConteProduits
              products={pt2}
              name={params.product ? params.product : params.Cat}
            />
          ) : (
            <></>
          )}
          <div className="cardeCont">
            <h2>Promo</h2>
            <div className="c">
              {Ptp.map((param, index) => {
                return (
                  <div
                    key={index}
                    className="carde"
                    onClick={() => navigue(`/ProductDet/${param._id}`)}
                  >
                    <img src={param.image2} alt="loading" />
                    <h5>{param.name.slice(0, 20)}</h5>
                    {/* <p>
                      {param.description.slice(0, 17)}
                      ...
                    </p> */}
                    {/* <p >dangerouslySetInnerHTML={{
            __html: VP?.description,
          }}</p> */}
                    <h6>
                      $ <s>{param.prix}</s> <span>{param.prixPromo}</span>
                    </h6>
                    <span className="p">
                      -{" "}
                      {Math.round(
                        ((param.prix - param.prixPromo) / param.prix) * 100
                      )}
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <h2 style={{ marginTop: 80 }}>All</h2>
          <div className="contCarde">
            <div className="conteneur">
              {ptAll.map((param, index) => {
                return (
                  <div
                    key={index}
                    className="carde"
                    onClick={() => navigue(`/ProductDet/${param._id}`)}
                  >
                    <img src={param.image1} alt="loading" />
                    {/* <p>
                      {param.description
                        .replace(
                          /<\/?(div|ul|li|h\d|a|span|s|b|i|strong)>/g,
                          ""
                        )
                        .slice(0, 17)}
                      ...
                    </p> */}
                    <h5 style={{ textAlign: "left" }}>
                      {param.name.slice(0, 18)}...
                    </h5>
                    <h6>${param.prix}</h6>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* <ConteProduits /> */}
      </div>
    ) : (
      <div className="comment">
        {Allcommente.map((param, index) => {
          if (!(param.clefType === ClefTypes?._id)) {
            return null;
          }
          const etoiles = param.etoil;
          vf = false;
          return (
            <div key={index} className="carde">
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
                    <h2>
                      {[...Array(etoiles)].map((_, i) => (
                        <Star
                          key={i}
                          style={{ width: "20px", height: "20px" }}
                        />
                      ))}
                    </h2>
                    <h3>{param.userName}</h3>
                  </div>

                  <h5>{formatDate(new Date(param.date))}</h5>
                </div>
                <div className="bottom">
                  <p
                    className="plt"
                    style={{ height: "auto", paddingLeft: "5px", fontSize: 13 }}
                  >
                    {param.description}
                  </p>
                  <div className="cardeimg">
                    <img
                      className="img"
                      src={
                        allProducts?.find(
                          (item) => item._id === param.clefProduct
                        ).image1
                      }
                      alt="loading"
                    />
                    <img
                      className="img"
                      src={
                        allProducts?.find(
                          (item) => item._id === param.clefProduct
                        ).image2
                      }
                      alt="loading"
                    />
                    <img
                      className="img"
                      src={
                        allProducts?.find(
                          (item) => item._id === param.clefProduct
                        ).image3
                      }
                      alt="loading"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {vf ? <h2>Aucun commentaires pour le moment</h2> : ""}
      </div>
    );

  const changeChoix = (param) => {
    setChoix(param);
  };

  return (
    <div className="CategorieProduct">
      <LoadingIndicator loading={loading}>
        <div className="head">
          <span className="r">
            <ChevronLeft onClick={goBack} />
          </span>
          <span className="s">
            <Search />
          </span>
          {ClefCate ? <img src={ClefCate.image} alt="loadin" /> : ""}
          <div className="det">
            <h4>{ClefCate?.name}</h4>
            <p>All your fashion needs under one roof</p>
          </div>
        </div>
        <div className="menu">
          <ul>
            <li onClick={() => changeChoix("Home")}>Home</li>
            <li onClick={() => changeChoix("Products")}>Products</li>
            <li onClick={() => changeChoix("Reviews")}>Reviews</li>
          </ul>
        </div>
        {option}

        <Navbar />
      </LoadingIndicator>
    </div>
  );
}

export default CategorieProduct;
