import React, { useState, useContext } from 'react';
import '../../scss/cart-modal.scss';
import { CartContext } from '../../ context/cartContext';
import '../../App.scss';

interface Items {
  name: string;
  value: number;
  quantity: number;
  image: string;
}

export default function CheckoutSummary() {
  const { items, showConfirmation } = useContext(CartContext);

  let itemsToCalculateTotal: Items[] = items;

  const total = itemsToCalculateTotal.reduce(
    (prevTotal, currentTotal) =>
      prevTotal + currentTotal.value * currentTotal.quantity,
    0
  );

  return (
    <>
      <div className="cart">
        <h5>SUMMARY</h5>
        {items.length > 0 &&
          items.map((item) => (
            <>
              <div key={item.name} className="cart-modal__item">
                <img src={item.image} alt="product" className="cart-modal__image" />
                <div className="cart-modal__item-details">
                  <div
                    data-testid="product-name"
                    className="cart-modal__item-name"
                  >
                    {item.name.split(' ')[0]}
                  </div>
                  <div className="cart-modal__copy-grey">£{item.value}</div>
                </div>
                <h6 className="cart-modal__quantity">x {item.quantity}</h6>
              </div>
            </>
          ))}
        <div className="cart-modal__total-section">
          <span className="cart-modal__copy-grey">TOTAL</span>
          <h6 data-testid="total">£{((total / 100) * 80).toFixed(2)}</h6>
        </div>
        <div className="cart-modal__total-section">
          <span className="cart-modal__copy-grey">SHIPPING</span>
          <h6 data-testid="total">£9.99</h6>
        </div>
        <div className="cart-modal__total-section">
          {' '}
          <span className="cart-modal__copy-grey">VAT</span>
          <h6 data-testid="total">£{((total / 100) * 20).toFixed(2)}</h6>
        </div>
        <div className="cart-modal__total-section">
          {' '}
          <span className="cart-modal__copy-grey">GRAND TOTAL</span>
          <h5 data-testid="total">£{(total + 9.99).toFixed(2)}</h5>
        </div>
        <button type="submit" className="checkout__pay-btn">
          CONTINUE &amp; PAY
        </button>
      </div>
    </>
  );
}
