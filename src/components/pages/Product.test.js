/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-debugging-utils */
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from "././Product";
import Header from "../Header";
import data from "../../data.json";
import { CartContextProvider } from "../../ context/cartContext";

describe("functionality on the page is all working", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[`/product/xx59-headphones`]}>
        <Routes>
          <Route
            path="/product/:slug"
            element={<Product productData={data.products} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
  });

  test("When a product is shown in the url, the correct product title is shown in the product section", async () => {
    let productName = await screen.findByText("XX59 HEADPHONES");
    expect(productName).toBeInTheDocument();
    // screen.debug();
  });

  test("When quality of 1 is selected, the - button is disabled", async () => {
    let minusButton = await screen.findByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\-/i,
    });
    expect(minusButton).toBeDisabled();
  });

  test("When the quantity is more than 1, then the minus button is not disabled anymore", async () => {
    let plusButton = screen.getByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\+/i,
    });
    userEvent.click(plusButton);
    let minusButton = await screen.findByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\-/i,
    });
    expect(minusButton).not.toBeDisabled();
  });

  test("if the user presses the plus button, the quantity shown is increased by one", async () => {
    let plusButton = screen.getByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\+/i,
    });
    userEvent.click(plusButton);
    let quantity = await screen.findByTestId("quantity");
    expect(quantity).toHaveTextContent("2");
  });

  test("if the user presses the minus button, the quantity shown is decreased by one", async () => {
    let plusButton = screen.getByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\+/i,
    });
    userEvent.click(plusButton);
    userEvent.click(plusButton);
    let minusButton = screen.getByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\-/i,
    });
    userEvent.click(minusButton);
    let quantity = await screen.findByTestId("quantity");
    expect(quantity).toHaveTextContent("2");
  });

  test("if you user tries to select more than amount in stock, a warning is shown and they cant increase it more than the total in stock", async () => {
    let plusButton = screen.getByRole("button", {
      // eslint-disable-next-line no-useless-escape
      name: /\+/i,
    });
    userEvent.click(plusButton);
    userEvent.click(plusButton);
    userEvent.click(plusButton);
    let error = await screen.findByText("Maximum in stock selected");
    expect(error).toBeInTheDocument();
  });
});

describe("These tests check the functionality of the add to cart button and adding tiems ot context", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[`/product/xx59-headphones`]}>
        <Routes>
          <Route
            path="/product/:slug"
            element={
              <CartContextProvider>
                <Header />
                <Product productData={data.products} />
              </CartContextProvider>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    const cartButton = screen.getByText("ADD TO CART");
    userEvent.click(cartButton);
  });
  test("When an item is put in the basket via context, the basket icon show a number in it, need mount and context for this", async () => {
    let cartNumber = await screen.findByTestId("cart-quantity");
    expect(cartNumber).toBeInTheDocument();
  });
});
