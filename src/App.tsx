import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Homepage from "./components/pages/Homepage";
import Checkout from "./components/pages/Checkout";
import Category from "./components/pages/Category";
import Product from "./components/pages/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import CartModal from "./components/modals/CartModal";
import { CSSTransition } from "react-transition-group";
import { CartContext } from "./ context/cartContext";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import PrivateRoute from "./helpers/PrivateRoute";
import { CircularProgress } from "@material-ui/core";

function App() {
  const {
    showCartModal,
    showConfirmationModal,
    isLoggedIn,
    items,
    addProduct,
    loadingPage,
  } = useContext(CartContext);
  const { pathname } = useLocation();
  const myRef = useRef(null);

  // useEffect(() => {
  //     if (items.length === 0) {
  //       let localStorageItemKeys = Object.keys(localStorage);
  //       let itemsToAdd: any = []
  //       if (localStorageItemKeys.length > 0) {
  //         localStorageItemKeys.map((keyName) => {
  //           let item = localStorage.getItem(`${keyName}`);
  //           let result = item !== null && JSON.parse(item);
  //           return itemsToAdd.push(result)
  //          })
  //          addProduct(itemsToAdd)
  //       }
  //     }
  // //   below makes each page loaded scroll to the top
  //   // @ts-ignore: Object is possibly 'null'.
  //   myRef.current.scrollTo(0, 0);
  // }, [pathname, items, addProduct]);

  return (
    <div id="top" ref={myRef} className="App">
      <CSSTransition
        in={showCartModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <CartModal />
      </CSSTransition>
      <CSSTransition
        in={showConfirmationModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <ConfirmationModal />
      </CSSTransition>
      <Header />
      {loadingPage && (
        <div className="App__loading-spinner">
          <CircularProgress />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute loggedIn={isLoggedIn}>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
