import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ products }) {
  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products &&
        products.map((product, index) => (
          <div key={index} className="product__carousel-image-container">
            <img
              className="product__carousel-image"
              src={`${product.image}`}
              alt="product"
            />

            <div className="product__title product__title--margin-top-and-bottom">
              {product.name}
            </div>
            <Link
              to={`/product/${product.slug}`}
              data-test="product-cta"
              className="product__product-cta product__product-cta--margin-top-and-bottom"
            >
              SEE PRODUCT
            </Link>
          </div>
        ))}
    </Slider>
  );
}
