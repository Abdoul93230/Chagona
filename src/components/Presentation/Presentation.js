import image1 from "../../Images/sac.png";
import image2 from "../../Images/pub3.jpg";
import image3 from "../../Images/pub2.jpg";
import "./Presentation.css";
import { ChevronRight, Menu } from "react-feather";
import "swiper/swiper-bundle.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Presentation({ categories }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
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
                    style={{ width: "10px", height: "10px", marginRight: 8 }}
                  />
                  {param.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="carousel-container">
          <Slider {...settings}>
            <div className="slide">
              <img src={image1} alt="loading" />
              <div className="button">
                <h6>SEE MORE</h6>
                <span>
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="slide">
              <img src={image1} alt="loading" />
              <div className="button">
                <h6>SEE MORE</h6>
                <span>
                  <ChevronRight />
                </span>
              </div>
            </div>
            <div className="slide">
              <img src={image1} alt="loading" />
              <div className="button">
                <h6>SEE MORE</h6>
                <span>
                  <ChevronRight />
                </span>
              </div>
            </div>
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
  );
}

export default Presentation;
