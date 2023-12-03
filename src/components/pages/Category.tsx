import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../scss/categorypage.scss";
import CategorySummary from "../sections-used-on-multiple-pages/CategorySummary";

import { CartContext } from "../../ context/cartContext";
import BottomCopySection from "../sections-used-on-multiple-pages/BottomCopySection";
import axios from "axios";

const Category = () => {
  let cat = useParams();

  const [products, setProducts] = React.useState([]);

  const categoryProducts = async () => {
    try {
      const response = await axios.get(
        `https://bxg98szdc8.execute-api.eu-west-2.amazonaws.com/dev/products/category/${cat.category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cat.category) {
      categoryProducts();
    }
  }, [cat.category]);

  return (
    <>
      <div className="category">
        <div className="category__hero">
          <h3 data-test="category-header" className="category__hero-title">
            {cat.category && cat.category.toUpperCase()}
          </h3>
        </div>

        {products &&
          products?.map((product: any, index: any) => (
            <div key={index} className="category__product">
              <div
                data-test="category-image"
                className="category__image-container"
              >
                <picture>
                  <source
                    className="category__image"
                    media="(min-width: 1024px )"
                    srcSet={`${product.image.desktop}`}
                  />{" "}
                  <source
                    className="category__image"
                    media="(max-width: 767px )"
                    srcSet={`${product.image.mobile}`}
                  />{" "}
                  <source
                    className="category__image"
                    media="(min-width: 768px, max-width: 1023px)"
                    srcSet={`${product.image.tablet}`}
                  />
                  <img
                    className="category__image"
                    src={`${product.image.mobile}`}
                    alt="product"
                  />
                </picture>
              </div>
              <div className="category__copy-container">
                {product.new && (
                  <h6 className="category__new-product">NEW PRODUCT</h6>
                )}
                <h3 data-test="category-title" className="category__title">
                  {product.name.toUpperCase()}
                </h3>
                <p data-test="category-copy" className="category__copy">
                  {product.description}
                </p>
                <Link
                  data-testid="category-cta"
                  to={`/product/${product.slug}`}
                  className="category__product-cta"
                >
                  SEE PRODUCT
                </Link>
              </div>
            </div>
          ))}
        <CategorySummary />
        <BottomCopySection />
      </div>
    </>
  );
};

export default Category;
