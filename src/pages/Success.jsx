import { Button, Flex, Paper } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <Flex justify={"center"} align={"center"} style={{ height: "100vh" }}>
      <Flex justify={"center"} direction={"column"} align={"center"} gap={10}>
        <iframe
          style={{ background: "transparent", height: "500px", width: "500px" }}
          src="https://embed.lottiefiles.com/animation/83548"
        ></iframe>
        <Link to="/">
          <Button size="xl" variant="gradient">
            Go to Shop
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Success;
