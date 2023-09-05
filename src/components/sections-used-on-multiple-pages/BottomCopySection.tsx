import React from "react";
import "../../scss/bottom-copy-section.scss";

export default function BottomCopySection() {
  return (
    <div className="bottom-copy-section">
      <div className="bottom-copy-section__image"></div>
      <div className="bottom-copy-section__copy-section">
        <h3 className="bottom-copy-section-subtitle">
          BRINGING YOU THE <span style={{ color: "#d87d4a" }}>BEST</span> AUDIO
          GEAR
        </h3>
        <p className="bottom-copy-section__copy">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
}
