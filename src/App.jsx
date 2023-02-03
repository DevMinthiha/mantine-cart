import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Details from "./pages/Details";
import { Container } from "@mantine/core";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

const App = () => {
  return (
    <Container size={"xl"}>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Container>
  );
};

export default App;
