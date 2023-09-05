/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-debugging-utils */

import { CartContextProvider } from '../../ context/cartContext';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import CartModal from './CartModal';
import Header from '../Header';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Product from '../pages/Product';
import data from '../../data.json';
import { server } from '../../mocks/server';
import Login from '../pages/Login';
import Category from '../pages/Category';
import Checkout from '../pages/Checkout';

// Below I am setting up a mock server to log the user in //
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// The modal uses react transition group to fade into the page but i will not be testing this, i have commented it out for now as it causes the all tests to fail

const renderWithContext = (url) => {
  render(
    <MemoryRouter initialEntries={[`${url}`]}>
      <CartContextProvider>
        <Header />
        <CartModal />
        <Routes>
          <Route
            path="/product/:slug"
            element={<Product productData={data.products} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/category/:category"
            element={<Category productData={data.products} />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartContextProvider>
    </MemoryRouter>
  );
};

describe('test the modal is shown and functionality, all tests without the user logged in', () => {
  beforeEach(() => {
    renderWithContext('/product/xx59-headphones');
    // This will select an add an item to the cart form the product page and then view cart so I can run all the tests on the cart which is now rendered to the page
    const cartButton = screen.getByText('ADD TO CART');
    userEvent.click(cartButton);
    const cartIcon = screen.getByTestId('cart-icon');
    userEvent.click(cartIcon);
  });

  test('When the user presses the add to cart button, a cart modal is displayed', async () => {
    let cartModal = await screen.findByTestId('cart');
    expect(cartModal).toBeInTheDocument();
  });
  test('Once a product is selected on the product page', async () => {
    const testName = await screen.findByTestId('product-name');
    expect(testName).toHaveTextContent('XX59');
  });

  test('If the user clicks remove all the empty becomes empty', async () => {
    // This first line makes sure the product has shown up in the cart as this is async before
    // I then test it is removed properly below
    const product = await screen.findByTestId('product-name');
    let emptyButton = screen.getByRole('button', {
      name: /remove all/i,
    });
    userEvent.click(emptyButton);
    await (() => expect(product).not.toBeInTheDocument());
  });

  test('If the user clicks the checkout and there is nothing in the cart has error message appears', async () => {
    await screen.findByTestId('product-name');
    let emptyButton = screen.getByRole('button', {
      name: /remove all/i,
    });
    userEvent.click(emptyButton);
    const checkoutButton = await screen.findByTestId('checkout-btn');
    userEvent.click(checkoutButton);
    let errorMessage = await screen.findByText(
      'Please select an item before trying to checkout'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('if the user clicks + then an item is added to their basket for that item', async () => {
    let plusButtonCart = await screen.findByTestId('plus-button-cart');
    userEvent.click(plusButtonCart);
    let quantity = await screen.findByTestId('quantity-cart-item');
    expect(quantity).toHaveTextContent('2');
  });

  test('the total in the cart is correct based on the items and their quantity', async () => {
    let plusButtonCart = await screen.findByTestId('plus-button-cart');
    userEvent.click(plusButtonCart);
    let quantity = await screen.findByTestId('quantity-cart-item');
    expect(quantity).toHaveTextContent('2');
    let total = await screen.findByTestId('total');
    expect(total).toHaveTextContent('£1798');
  });

  test('if the user clicks - then an item is subtracted to their basket for that item', async () => {
    let plusButtonCart = await screen.findByTestId('plus-button-cart');
    userEvent.click(plusButtonCart);
    let minusButtonCart = await screen.findByTestId('minus-button-cart');
    userEvent.click(minusButtonCart);
    let quantity = await screen.findByTestId('quantity-cart-item');
    expect(quantity).toHaveTextContent('1');
  });

  test('If the user clicks the checkout and they are not signed in a message says please sign in or sign up to checkout', async () => {
    await screen.findByTestId('product-name');
    const checkoutButton = await screen.findByTestId('checkout-btn');
    userEvent.click(checkoutButton);
    let errorMessage = await screen.findByText(
      'Please sign in or sign up to checkout'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('these cart tests are based on functionality if a user is logged in', () => {
  test('if the user is logged in and there is something in the basket, it is added to local storage', async () => {
    renderWithContext('/login');
    const logInButton = screen.getByRole('button', {
      name: /login/i,
    });
    userEvent.click(logInButton);
    let loginConfirmation = await screen.findByText('logged in now');
    expect(loginConfirmation).toBeInTheDocument();
    let speakersLinkButton = await screen.findAllByText('SPEAKERS');
    userEvent.click(speakersLinkButton[0]);
    let product = await screen.findAllByText('SEE PRODUCT');
    userEvent.click(product[0]);
    const cartButton = await screen.findByText('ADD TO CART');
    userEvent.click(cartButton);
    expect(window.localStorage.getItem('items')).not.toBeNull();
  });

  test('If the user clicks checkout with something in the basket and they are logged in, they are taken to the checkout page', async () => {
    renderWithContext('/login');
    const logInButton = screen.getByRole('button', {
      name: /login/i,
    });
    userEvent.click(logInButton);
    let loginConfirmation = await screen.findByText('logged in now');
    expect(loginConfirmation).toBeInTheDocument();
    let speakersLinkButton = await screen.findAllByText('SPEAKERS');
    userEvent.click(speakersLinkButton[0]);
    let product = await screen.findAllByText('SEE PRODUCT');
    userEvent.click(product[0]);
    const cartButton = await screen.findByText('ADD TO CART');
    userEvent.click(cartButton);
    const checkoutButton = screen.getByRole('button', {
      name: /CHECKOUT/i,
    });
    userEvent.click(checkoutButton);
    let checkoutPage = await screen.findByText('CHECKOUT SUMMARY');
    expect(checkoutPage).toBeInTheDocument();
  });
});
