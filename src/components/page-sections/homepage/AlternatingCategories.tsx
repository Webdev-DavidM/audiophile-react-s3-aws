import React from "react";
import { Link } from "react-router-dom";
import "../../../scss/homepage.scss";

export default function AlternatingCategories() {
  return (
    <>
      <div className="homepage__alternating-category-one">
        <div className="homepage__alternating-category-one-copy">
          <h3 className="homepage__alternating-category-title">ZX7 SPEAKER</h3>
          <Link
            className="homepage__alternating-category-cta"
            to="product/zx7-speaker"
          >
            SEE PRODUCT
          </Link>
        </div>
      </div>
      <div className="homepage__alternating-category-two">
        <div className="homepage__alternating-category-two-image"></div>
        <div className="homepage__alternating-category-copy-container">
          <div className="homepage__alternating-category-two-copy">
            <h3 className="homepage__alternating-category-title">
              ZX1 EARPHONES
            </h3>
            <Link
              className="homepage__alternating-category-cta"
              to="product/zx7-speaker"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
