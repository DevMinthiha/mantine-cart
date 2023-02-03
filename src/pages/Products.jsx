import { Button, Flex, Input } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { RiSearchEyeLine } from "react-icons/ri";
import { TbShoppingCart } from "react-icons/tb";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [serchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [cart, setCart] = useState(cartItems ? [...cartItems] : []);
  console.log(cart);
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cart, product]));
  };
  const removeFromCart = (id) => {
    setCart(cart?.filter((item) => item.id !== id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart?.filter((item) => item.id !== id))
    );
  };

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    setProducts(data);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Flex align={"center"}>
            <Input
              style={{ width: "250px" }}
              my={"xl"}
              icon={<RiSearchEyeLine />}
              placeholder="Search"
              size="md"
              value={serchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/cart">
              <Button size="md" ml="5px" variant="outline">
                <TbShoppingCart fontSize={"20px"} />{" "}
                {cartItems?.length ? cartItems.length : "0"}
              </Button>
            </Link>
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            wrap={"wrap"}
            gap={"20px"}
            my="xl"
          >
            {products
              ?.filter((pd) => {
                if (serchTerm === "") {
                  return pd;
                } else if (
                  pd.title.toLowerCase().includes(serchTerm.toLocaleLowerCase())
                ) {
                  return pd;
                }
              })
              ?.map((product) => (
                <ProductCard
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  key={product?.id}
                  product={product}
                />
              ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default Products;
