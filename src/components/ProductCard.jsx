import { Card, Image, Text, Badge, Button, Group, Rating } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart, removeFromCart }) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: "300px" }}>
      <Link to={`/details/${product?.id}`}>
        <img
          src={product.image}
          height={100}
          style={{ margin: "10px auto", display: "block" }}
        />
      </Link>
      <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
        {product.category}
      </Badge>

      <Text my={"xs"} weight={500} truncate>
        {product.title}
      </Text>
      <Text size="sm" color="dimmed" truncate>
        {product.description}
      </Text>
      <Group position="left" my="lg">
        <Rating value={product.rating.rate} fractions={2} readOnly />
      </Group>
      <Text size="xl" color={"cyan"}>
        ${product.price}
      </Text>
      {cartItems?.find((item) => item.id === product?.id) ? (
        <Button
          color="red"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => removeFromCart(product?.id)}
        >
          Remove from Cart
        </Button>
      ) : (
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          fullWidth
          mt="md"
          radius="md"
          onClick={() => addToCart({...product, qty: 1})}
        >
          Add to Cart
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
