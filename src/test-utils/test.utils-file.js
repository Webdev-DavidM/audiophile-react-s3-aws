import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";

// Props will need to added as part of the component if required
// so calling this function with a component with props would look like
// renderwithRouter("/product/xx59-headphones", <Product productData={data/products />})

export const renderWithRouter = (url, component) => {
  render(
    <MemoryRouter initialEntries={[`${url}`]}>
      <Routes>
        <Route path="/product/:slug" element={component}></Route>
      </Routes>
    </MemoryRouter>
  );
};

export const renderWithRouterAndState = () => {};
