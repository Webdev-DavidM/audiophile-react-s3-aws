import React from "react";
import CategorySummary from "../sections-used-on-multiple-pages/CategorySummary";
import Hero from "../page-sections/homepage/Hero";
import "../../scss/homepage.scss";
import ProductHighlight from "../page-sections/homepage/ProductHighlight";
import AlternatingCategories from "../page-sections/homepage/AlternatingCategories";
import BottomCopySection from "../sections-used-on-multiple-pages/BottomCopySection";

export default function Homepage() {
  return (
    <div className="homepage">
      <Hero />
      <div className="layout-block layout-block--max-width">
        <CategorySummary />
        <ProductHighlight />
        <AlternatingCategories />
        <BottomCopySection />
      </div>
    </div>
  );
}
