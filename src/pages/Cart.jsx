import { Button, Flex, Grid, Paper, Text } from "@mantine/core";
import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [cart, setCart] = useState(cartItems);
  const navigate = useNavigate();

  const total = cart?.reduce((a, c) => a + c.price * c.qty, 0);
  const clearHandler = () => {
    setCart([]);
    localStorage.removeItem("cartItems");
  };
  const removeFromCart = (id) => {
    setCart(cart?.filter((item) => item.id !== id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart?.filter((item) => item.id !== id))
    );
  };
  const purchaseHandler = () => {
    setCart([]);
    localStorage.removeItem("cartItems");
    navigate("/success");
  };

  const increment = (id) => {
    setCart(
      cart?.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
        return item;
      })
    );
  };
  const decrement = (id) => {
    setCart(
      cart?.map((item) => {
        if (item.id === id && item.qty > 1) {
          item.qty -= 1;
        }
        return item;
      })
    );
  };

  return (
    <>
      <Link to="/">
        <Button mt={10} variant="outline" color={"red"}>
          Shop
        </Button>
      </Link>
      <Grid my="lg">
        <Grid.Col span={12} md={6}>
          {!cart?.length && (
            <Paper shadow={"lg"} p="lg">
              <Flex direction={"column"}>
                <Text fz={"30px"} color={"cyan"} weight={"bold"} mb={10}>
                  Your Cart is Empty!
                </Text>
                <iframe src="https://embed.lottiefiles.com/animation/9091"></iframe>
                <Flex gap={10}>
                  <Link to="/">
                    <Button
                      mt={10}
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      size="lg"
                    >
                      Go to Shop
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </Paper>
          )}
          {cart?.map((item) => (
            <CartItem
              removeFromCart={removeFromCart}
              key={item?.id}
              item={item}
              increment={increment}
              decrement={decrement}
              total={total}
            />
          ))}
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Paper shadow={"lg"} p="lg">
            <Flex direction={"column"}>
              <Text fz={"30px"} color={"cyan"} weight={"bold"}>
                Total Price - ${total?.toFixed(2)}
              </Text>
              <Flex gap={10}>
                <Button onClick={clearHandler} variant="outline" color={"red"}>
                  Clear
                </Button>
                <Button
                  disabled={cartItems?.length ? false : true}
                  onClick={purchaseHandler}
                  variant="gradient"
                >
                  Purchase
                </Button>
              </Flex>
            </Flex>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Cart;
