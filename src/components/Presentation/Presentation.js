import React, { useState, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import image1 from "../../Images/sac.png";
import image2 from "../../Images/pub3.jpg";
import image3 from "../../Images/pub2.jpg";
import "./Presentation.css";
import axios from "axios";
import { ChevronRight, Menu } from "react-feather";
import "swiper/swiper-bundle.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function Presentation({ categories }) {
  const [allPub, setAllPub] = useState(null);
  // const [allCategories, setAllCategories] = useState([]);
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

    // axios
    //   .get(`${BackendUrl}/getAllCategories`)
    //   .then((All) => {
    //     if (All.data.data) {
    //       setAllCategories(All.data.data);
    //     } else {
    //       console.log("rien");
    //     }
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {allPub && allPub.length > 0 ? (
        <div className="Presentation">
          <h2>Latest</h2>
          <div className="Con">
            <div className="pub">
              <h5>
                <Menu /> Categories
              </h5>
              <ul>
                {categories?.map((param, index) => {
                  return (
                    <Link
                      key={index}
                      className="li"
                      to={`/Categorie/${param.name}`}
                    >
                      <Menu
                        style={{
                          width: "10px",
                          height: "10px",
                          marginRight: 8,
                        }}
                      />
                      {param.name}
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="carousel-container">
              <Slider {...settings}>
                {allPub && allPub.length > 0 ? (
                  allPub.map((param, index) => {
                    return (
                      <div className="slide" key={index}>
                        <img src={param.image} alt="loading" />
                        {param.pub ? (
                          <div className="button">
                            <h6 onClick={() => navigue(`/PubDet/${param._id}`)}>
                              SEE MORE
                            </h6>
                            <span>
                              <ChevronRight />
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}

                {/* Ajoutez d'autres éléments de diapositives ici */}
              </Slider>
            </div>

            <div className="pub1">
              <div className="contPub">
                <div className="section">
                  <img src={image3} alt="loadin" />
                </div>
                <div className="section">
                  <img src={image2} alt="loadin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Presentation;
