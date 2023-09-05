import React from "react";
import "../../../scss/homepage.scss";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="homepage__hero">
      <div className="homepage__hero-image">
        <picture className="homepage__image">
          <source
            className="homepage__image"
            srcSet="https://audiophile-images-davidm.s3.eu-west-2.amazonaws.com/home/desktop/image-hero.jpg"
            media="(min-width: 1024px)"
          />
          <source
            className="homepage__image"
            srcSet="https://audiophile-images-davidm.s3.eu-west-2.amazonaws.com/home/mobile/image-header.jpg"
            media="(max-width: 767px)"
          />
          <source
            className="homepage__image"
            srcSet="https://audiophile-images-davidm.s3.eu-west-2.amazonaws.com/home/tablet/image-header.jpg"
            media="(min-width: 768px, max-width: 1023px)"
          />
          <img
            className="homepage__image"
            src="https://audiophile-images-davidm.s3.eu-west-2.amazonaws.com/home/mobile/image-header.jpg"
            alt="hero product"
          />
        </picture>
      </div>
      <div className="homepage__hero-copy-section">
        <h6 className="homepage__hero-title">NEW PRODUCT</h6>
        <h2 className="homepage__hero-subtitle">XX99 MARK 11 HEADPHONE</h2>
        <p className="homepage__hero-copy">
          {" "}
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Link
          className="homepage__hero-cta"
          to="/product/xx99-mark-one-headphones"
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
}
