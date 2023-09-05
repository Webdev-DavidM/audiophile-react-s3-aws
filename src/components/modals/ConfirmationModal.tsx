import React, { useContext } from 'react';
import '../../scss/confirmation-modal.scss';
import { CartContext } from '../../ context/cartContext';
import { Link } from 'react-router-dom';
import tick from '../../assets/shared/tick.svg';

export default function ConfirmationModal() {
  const { showConfirmation } = useContext(CartContext);

  return (
    <div className='confirmation-modal'>
      <div className='confirmation-modal__container'>
        <div className='confirmation-modal__svg-container'>
          <img src={tick} alt='' />
        </div>
        <h5>THANKYOU FOR YOUR ORDER</h5>
        <p className='confirmation-modal__copy'>
          You will receive an email confirmation shortly
        </p>
        <Link
          onClick={() => showConfirmation(false)}
          to='/'
          className='confirmation-modal__btn'>
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
