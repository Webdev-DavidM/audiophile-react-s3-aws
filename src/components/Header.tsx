import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../scss/header.scss";

/* Note when using typescript below is the only import style which will work is below, 
importing an image/svg as a component wont work, I also need to create a index.d.ts 
file to include svg and jpg and any other files */
import hamburger from "../assets/shared/icon-hamburger.svg";
import logo from "../assets/shared/logo.svg";
import cart from "../assets/shared/icon-cart.svg";
import arrow from "../assets/shared/icon-arrow-right.svg";
import { CartContext } from "../ context/cartContext";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { items, showCart, categories } = useContext(CartContext);

  let headerMenu = showMenu ? `header header--open` : `header`;

  let dropdown = showMenu
    ? `header__dropdown`
    : `header__dropdown header__dropdown--hidden`;

  const closeDropDown = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div id="top" className={headerMenu}>
        <div className="header__hamburger" onClick={() => closeDropDown()}>
          <img src={`${hamburger}`} alt="hamburger menu" />
        </div>
        <div className="header__title">
          <img src={logo} alt="audiophile logo" />
        </div>
        <ul className="header__nav-links">
          <NavLink
            onClick={() => showCart("false")}
            to="/"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => showCart("false")}
            to="/category/headphones"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            HEADPHONES
          </NavLink>
          <NavLink
            onClick={() => showCart("false")}
            to="category/speakers"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            SPEAKERS
          </NavLink>
          <NavLink
            onClick={() => showCart("false")}
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
            to="/category/earphones"
          >
            EARPHONES
          </NavLink>
        </ul>
        <div className="header__login-and-register">
          <NavLink
            onClick={() => showCart("false")}
            className="header__sign-up"
            to="/sign-up"
          >
            SIGN UP
          </NavLink>
          <NavLink
            onClick={() => showCart("false")}
            className="header__log-in"
            to="/login"
          >
            LOGIN
          </NavLink>
        </div>
        <div
          data-testid="cart-icon"
          className="header__cart"
          onClick={() => showCart("toggle")}
        >
          {items.length > 0 && (
            <div
              data-testid="cart-quantity"
              className="header__cart-quantity header__cart-quantity--added-to-cart"
            >
              {items.length}
            </div>
          )}
          <img className="header__cart-svg" src={cart} alt="cart" />
        </div>
        <div className={dropdown}>
          <NavLink
            onClick={() => setShowMenu(false)}
            className="header__drop-down-sign-up"
            to="/sign-up"
          >
            SIGN UP
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            className="header__drop-down-log-in"
            to="/login"
          >
            LOGIN
          </NavLink>
          <div className="category-summary">
            {categories &&
              categories.map((cat, index) => (
                <div key={index} className="category-summary__item">
                  <img
                    className="category-summary__image"
                    src={`${cat.image}`}
                    alt="product"
                  />
                  <h6 className="category-summary__category-name">
                    {cat.category.toUpperCase()}
                  </h6>
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to={`/category/${cat.category}`}
                    className="category-summary__cta"
                  >
                    <span className="category-summary__cta-text">SHOP</span>
                    <img
                      className="category-summary__arrow"
                      src={arrow}
                      alt="product"
                    />
                  </NavLink>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
