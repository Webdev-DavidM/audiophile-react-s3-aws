import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import "../../scss/productpage.scss";
import CategorySummary from "../sections-used-on-multiple-pages/CategorySummary";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ProductsObject } from "../../Interfaces/productObject";
import Carousel from "../sections-used-on-multiple-pages/Carousel";
import ImageGallery from "../page-sections/product/ImageGallery";
import { CartContext } from "../../ context/cartContext";
import BottomCopySection from "../sections-used-on-multiple-pages/BottomCopySection";
import axios from "axios";

export default function Product() {
  const { items, addProduct, setLoadingPage } = useContext(CartContext);
  let paramsProduct = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  let [quantity, setQuantity] = useState<number>(1);
  let [product, setProduct] = useState<ProductsObject | undefined>(undefined);
  let [quantityError, setQuantityError] = useState<boolean>(false);
  let [addedToCart, setAddedToCart] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://9dzlvevp22.execute-api.eu-west-2.amazonaws.com/dev/products/product/${paramsProduct?.slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setProduct(response.data[0]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProduct();
  }, [paramsProduct]);

  // useEffect(() => {
  //   // I will also add the items to local storage here in this function
  //   if (items.length !== 0) {
  //     items.map((item, index) => {
  //       return localStorage.setItem(`item${index}`, JSON.stringify(item));
  //     });
  //   }
  //   //clear the product state when the product component unmounts
  //   data && setProduct(data.getProduct.product);
  //   return () => {
  //     setProduct(undefined);
  //   };
  // }, [paramsProduct, data, items]);

  // useEffect(() => {
  //   loading ? setLoadingPage(true) : setLoadingPage(false);
  // }, [loading, setLoadingPage]);

  const addToCart = () => {
    if (product) {
      let itemToAdd = {
        name: product.name,
        value: product.price,
        quantity: quantity,
        image: product.image.mobile,
      };
      addProduct(itemToAdd);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 4000);
    }
  };

  const updateQuantity = (operator: string) => {
    if (product && operator === "+" && quantity === product.stock) {
      return setQuantityError(true);
    }
    if (operator === "+") {
      setQuantity((PrevQuantity) => (PrevQuantity += 1));
    } else {
      setQuantityError(false);
      setQuantity((PrevQuantity) => (PrevQuantity -= 1));
    }
  };

  console.log(product);

  return (
    <div className="product">
      <span className="product__go-back-btn" onClick={() => navigate(-1)}>
        Go back
      </span>
      {product ? (
        <>
          {" "}
          <div className="product__product-details">
            <div className="product__image-container">
              <picture>
                <source
                  className="product__image"
                  media="(max-width: 767px)"
                  srcSet={`${product?.image.mobile}`}
                />
                <source
                  className="product__image"
                  media="(min-width: 1024px)"
                  srcSet={`${product?.image.mobile}`}
                />
                <source
                  className="product__image"
                  media="(min-width: 768px), (max-width: 1023px)"
                  srcSet={`${product?.image.tablet}`}
                />

                <img
                  className="product__image"
                  src={`${product?.image.mobile}`}
                  alt="product"
                />
              </picture>
            </div>
            <div className="product__copy-container">
              {product && product.new && (
                <h6 className="product__new-product">NEW PRODUCT</h6>
              )}

              <h3 className="product__title">{product.name.toUpperCase()}</h3>
              <p className="product__copy">{product.description}</p>
              <h3 className="product__price">£ {product.price}</h3>
              <div className="product__buttons-section">
                <div className="product__amount-button-section">
                  <button
                    onClick={() => updateQuantity("-")}
                    disabled={quantity === 1}
                    className="product__minus-button"
                  >
                    -
                  </button>
                  <span data-testid="quantity" className="product__amount">
                    {quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity("+")}
                    className="product__plus-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart()}
                  className="product__product-cta"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="product__warning">
                {quantityError && "Maximum in stock selected"}
              </div>
              <div className="product__added-to-cart">
                {addedToCart && "Added to cart"}
              </div>
            </div>
          </div>
          <div className="product__features-and-in-the-box-container">
            <div className="product__features-section">
              <h3 className="product__title">FEATURES</h3>
              <p className="product__copy">{product.features}</p>
            </div>
            <div className="product__in-the-box-section">
              <h3 className="product__title product__title--half-width">
                IN THE BOX
              </h3>
              <div className="product__in-the-box-list">
                {product.items.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="product__copy product__copy--no-margin-top"
                  >
                    <span className="product__item-quantity">
                      {item.quantity} x
                    </span>
                    {item.item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {product && <ImageGallery imageGallery={product.gallery[0]} />}
          <h3 className="product__title product__title--center">
            YOU MAY ALSO LIKE
          </h3>
          <div className="product__carousel">
            {!loading && product && <Carousel products={product.others} />}
          </div>
        </>
      ) : (
        <p className="product__not-found">Product not found</p>
      )}

      <CategorySummary />
      <div className="product__carousel-section"></div>
      <BottomCopySection />
    </div>
  );
}
