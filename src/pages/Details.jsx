import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Rating,
  Text,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import { TbShoppingCart } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import Loader from "../components/Loader/Loader";

const Details = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [cart, setCart] = useState(cartItems);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const pds = await axios.get(
      `https://fakestoreapi.com/products/category/${data?.category}`
    );
    setProduct(data);
    setProducts(pds?.data);
    setIsLoading(false);
  };
  console.log(products?.filter((item) => item.id !== product?.id));
  useEffect(() => {
    setIsLoading(true);
    fetchProduct();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Flex align={"center"} gap={5}>
            <Link to="/">
              <Button my="md" color={"red"}>
                <IoIosArrowBack fontSize={"20px"} />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline" my="md">
                <TbShoppingCart fontSize={"20px"} />
                {cart?.length ? cart?.length : "0"}
              </Button>
            </Link>
          </Flex>
          <Grid my="xl" gutter={"xl"}>
            <Grid.Col md={4} span={12}>
              <Flex direction={"column"}>
                <Paper shadow={"lg"} p="xl">
                  <Image
                    mx={"auto"}
                    radius="md"
                    src={product?.image}
                    width={300}
                  />
                </Paper>
                <Flex wrap={"wrap"} justify={"space-between"} my={"md"}>
                  {products
                    ?.filter((item) => item.id !== product?.id)
                    ?.map((pd) => (
                      <Link to={`/details/${pd?.id}`}>
                        <Paper
                          key={pd?.id}
                          shadow={"lg"}
                          p="xl"
                          style={{ cursor: "pointer" }}
                        >
                          <Image radius="md" src={pd?.image} height={100} />
                        </Paper>
                      </Link>
                    ))}
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col md={8} span={12}>
              <Text fz={"xl"} weight={700} color={"dark"}>
                {product?.title}
              </Text>
              <Text my="md" color={"gray"}>
                {product?.description}
              </Text>
              <Group position="left" my="lg">
                <Rating value={product?.rating?.rate} fractions={2} readOnly />
              </Group>
              <Divider my="xs" />
              <Badge
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                {product?.category}
              </Badge>
              <Text my="md" fz={"xl"}>
                ${product?.price}
              </Text>
              {/* <Button.Group>
                <Button variant="default">-</Button>
                <Button variant="default">1</Button>
                <Button variant="default">+</Button>
              </Button.Group> */}

              <Flex my="md" gap="15px">
                <Link to="/success">
                  <Button radius="md" size="md" color={"gray"}>
                    Buy Now
                  </Button>
                </Link>
                {/* <Button radius="md" variant="outline" color={"gray"} size="md">
                  Add to Cart
                </Button> */}
              </Flex>

              <Flex direction={"column"}>
                <Paper shadow={"lg"} p={"xl"} withBorder>
                  <Flex align={"center"} gap="10px">
                    <FaTruck fontSize={"20px"} color="orange" />
                    <Text>Free Delivery</Text>
                  </Flex>
                  <Text underline fz={"sm"} color={"gray"}>
                    Enter your Postal code for Delivery Availability
                  </Text>
                </Paper>
                <Paper shadow={"lg"} p={"xl"} withBorder>
                  <Flex align={"center"} gap="10px">
                    <GrScorecard fontSize={"20px"} color="orange" />
                    <Text>Return Delivery</Text>
                  </Flex>
                  <Text fz={"sm"} color={"gray"}>
                    Free 30days Delivery Return.
                    <Text display={"inline"} underline>
                      Details
                    </Text>
                  </Text>
                </Paper>
              </Flex>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
};

export default Details;
