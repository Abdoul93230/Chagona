import React, { useEffect } from "react";
import "swiper/swiper-bundle.css";
import "./ProductsSli.css";
import { ChevronsRight, Minus } from "react-feather";
import { Link } from "react-router-dom";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Swiper,
  // SwiperSlide,
} from "swiper";
import "swiper/swiper-bundle.css";

function ProductsSli({ products, name }) {
  useEffect(() => {
    Swiper.use([Navigation, Pagination, Scrollbar, A11y]);

    const swiper = new Swiper(".swiper-container", {
      autoplay: {
        delay: 1000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 25,
      breakpoints: {
        1000: {
          slidesPerView: 7,
        },
        780: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        300: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
      },
    });

    // return () => swiper.destroy();
  }, []);

  return (
    <div className="ProductsSli">
      <div className="Top">
        <Link
          style={{ textTransform: "capitalize" }}
          className="Titel l"
          to="/"
        >
          {name}
        </Link>
        <Link className="More l" to={`/Categorie/${name}`}>
          View More
          <ChevronsRight />
        </Link>
      </div>
      <div className="Bottom">
        <div className="contCarde swiper-container">
          <div
            className="swiper-wrapper"
            style={{ width: "100%", height: "auto", marginBottom: "30px" }}
          >
            {products?.map((param, index) => {
              return (
                <div className="carde swiper-slide" key={index}>
                  {param.prixPromo > 0 ? (
                    <span className="pro">
                      <Minus />{" "}
                      {Math.round(
                        ((param.prix - param.prixPromo) / param.prix) * 100
                      )}{" "}
                      %
                    </span>
                  ) : (
                    <></>
                  )}
                  <div className="midel">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/ProductDet/${param._id}`}
                    >
                      <img src={param.image1} alt="loading" />
                    </Link>
                  </div>
                  <div className="bottom">
                    <h5>{param.name.slice(0, 9)}...</h5>

                    {param.prixPromo > 0 ? (
                      <>
                        <h6>f {param.prix}</h6>
                        <h4>f {param.prixPromo}</h4>
                      </>
                    ) : (
                      <h4>f {param.prix}</h4>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination my-pagination"></div>
          <div
            className="swiper-button-prev my-prev-button"
            style={{ color: "#FF6969" }}
          ></div>
          <div
            style={{ color: "#FF6969" }}
            className="swiper-button-next my-next-button"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProductsSli;
