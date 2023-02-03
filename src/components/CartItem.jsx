import { Button, CloseButton, Flex, Image, Paper, Text } from "@mantine/core";
import React from "react";

const CartItem = ({ item, increment, decrement, removeFromCart }) => {
  return (
    <Paper shadow={"lg"} p="lg" withBorder pos={"relative"}>
      <Flex direction={"column"}>
        <Flex gap={15}>
          <img src={item?.image} height={100} />
          <div className="">
            <Text fz={"lg"}>{item?.title}</Text>
            <Text fz={"25px"} color={"gray"}>
              ${item?.price * item?.qty}
            </Text>
            <Button.Group>
              <Button variant="default" onClick={() => decrement(item?.id)}>-</Button>
              <Button variant="default">{item?.qty}</Button>
              <Button variant="default" onClick={() => increment(item?.id)}>
                +
              </Button>
            </Button.Group>
          </div>
        </Flex>
      </Flex>
      <CloseButton onClick={() => removeFromCart(item?.id)} pos={"absolute"} right={5} top={5} />
    </Paper>
  );
};

export default CartItem;
