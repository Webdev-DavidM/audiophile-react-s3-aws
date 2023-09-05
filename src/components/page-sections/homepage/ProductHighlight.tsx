import React from "react";
import "../../../scss/homepage.scss";
import { Link } from "react-router-dom";

export default function ProductHighlight() {
  return (
    <div className="homepage__product-highlight">
      <div className="homepage__product-highlight-image-container">
        <img
          className="homepage__product-highlight-image"
          src="https://audiophile-images-davidm.s3.eu-west-2.amazonaws.com/shared/desktop/image-speakers.png"
          alt="product"
        />
      </div>
      <div className="homepage__product-highlight-copy-section">
        <h2 className="homepage__product-hughlight-subtitle"> ZX9 SPEAKER</h2>
        <p className="homepage__product-highlight-copy">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Link
          className="homepage__product-highlight-cta"
          to="/product/zx9-speaker"
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
}
