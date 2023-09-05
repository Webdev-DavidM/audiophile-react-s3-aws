import React, { useContext } from "react";
import "../../scss/category-summary.scss";
import arrow from "../../assets/shared/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../ context/cartContext";

interface Category {
  category: string;
  image: string;
}

export default function CategorySummary() {
  const { categories } = useContext(CartContext);

  return (
    <div className="category-summary">
      {categories &&
        categories.map((cat: Category, index) => (
          <div key={index} className="category-summary__item">
            <img
              className="category-summary__image"
              src={`${cat.image}`}
              alt=""
            />
            <h6 className="category-summary__category-name">
              {cat.category.toUpperCase()}
            </h6>
            <Link
              to={`/category/${cat.category}`}
              className="category-summary__cta"
            >
              <span className="category-summary__cta-text">SHOP</span>
              <img className="category-summary__arrow" src={arrow} alt="" />
            </Link>
          </div>
        ))}
    </div>
  );
}
