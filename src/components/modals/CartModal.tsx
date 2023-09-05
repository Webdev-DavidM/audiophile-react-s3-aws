import React, { useState, useContext } from 'react';
import '../../scss/cart-modal.scss';
import { CartContext } from '../../ context/cartContext';
import '../../App.scss';
import { useNavigate } from 'react-router-dom';

interface Items {
  name: string;
  value: number;
  quantity: number;
  image: string;
}

export default function CartModal() {
  let navigate = useNavigate();
  const {
    items,
    isLoggedIn,
    showCart,
    removeAllProducts,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  let itemsToCalculateTotal: Items[] = items;

  const total = itemsToCalculateTotal.reduce(
    (prevTotal, currentTotal) =>
      prevTotal + currentTotal.value * currentTotal.quantity,
    0
  );

  const checkout = () => {
    setErrorMessage(null);
    if (items.length === 0) {
      setErrorMessage('Please select an item before trying to checkout');
    } else if (!isLoggedIn && items.length !== 0) {
      setErrorMessage('Please sign in or sign up to checkout');
    } else {
      showCart('false');
      navigate('/checkout');
    }
  };

  return (
    <div
      data-testid="cart"
      className="cart-modal cart-modal--navbar-not-covered"
    >
      <div className="cart-modal__container">
        <div className="cart-modal__header-and-remove-all-section">
          <span>CART ({items.length})</span>
          <button
            className="cart-modal__remove-btn"
            onClick={() => removeAllProducts()}
          >
            Remove all
          </button>
        </div>

        {items.length > 0 &&
          items.map((item) => (
            <div key={item.name} className="cart-modal__item">
              <img src={item.image} alt="chosen product" className="cart-modal__image" />
              <div className="cart-modal__item-details">
                <div
                  data-testid="product-name"
                  className="cart-modal__item-name"
                >
                  {item.name.split(' ')[0]}
                </div>
                <div className="cart-modal__copy-grey">£{item.value}</div>
              </div>
              <div className="product__buttons-section product__buttons-section--cart-modal">
                <div className="product__amount-button-section product__amount-button-section--cart-modal">
                  <button
                    onClick={() => decreaseQuantity(item.name)}
                    data-testid="minus-button-cart"
                    disabled={item.quantity === 1}
                    className="product__minus-button"
                  >
                    -
                  </button>
                  <span
                    data-testid="quantity-cart-item"
                    className="product__amount"
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.name)}
                    data-testid="plus-button-cart"
                    className="product__plus-button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="cart-modal__total-section">
          <span className="cart-modal__copy-grey">TOTAL</span>
          <h5 data-testid="total">£{total}</h5>
        </div>
        {errorMessage && (
          <div
            data-testid="error-message"
            className="cart-modal__error-message"
          >
            {errorMessage}
          </div>
        )}
        <button
          onClick={() => checkout()}
          data-testid="checkout-btn"
          className="cart-modal__checkout-btn"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
