import React from "react";
import { Stack, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BottomMenuMob = () => {
  const navHead = useBreakpointValue({ base: "flex", lg: "none" });
  const bottomDir = useBreakpointValue({ base: "column", sm: "row" });

  return (
    <Stack
      zIndex={2}
      bgColor="purple.50"
      position="fixed"
      bottom="0px"
      maxW="1280px"
      w="100%"

      align="center"
      display={navHead}
    >
      <Stack
        direction="row"
        align="center"
        p={2}
        borderRadius={12}
      >
        <Stack direction={bottomDir} align='center'>
        <Link to="/payment">
          <Button
            display="flex"
            justifyContent="center"
            h={8}
            bgColor="purple.50"
            _active={{ backgroundColor: "purple.100", color: "#fff" }}
            _hover={{ backgroundColor: "purple.100", color: "#fff" }}
            color="gray.300"
          >
            Depositar
          </Button>
        </Link>
        <Link to="/">
          <Button
            display="flex"
            justifyContent="center"
            h={8}
            bgColor="purple.50"
            _active={{ backgroundColor: "purple.100", color: "#fff" }}
            _hover={{ backgroundColor: "purple.100", color: "#fff" }}
            color="gray.300"
          >
            Premios
          </Button>
        </Link>
        </Stack>


        <Stack direction={bottomDir} align='center'>

        <Link to="/">
          <Button
            display="flex"
            justifyContent="center"
            h={8}
            bgColor="purple.50"
            _active={{ backgroundColor: "purple.100", color: "#fff" }}
            _hover={{ backgroundColor: "purple.100", color: "#fff" }}
            color="gray.300"
          >
            Cuenta
          </Button>
        </Link>
        <Link to="/buy">
          <Button
            display="flex"
            justifyContent="center"
            h={8}
            bgColor="purple.50"
            _active={{ backgroundColor: "purple.100", color: "#fff" }}
            _hover={{ backgroundColor: "purple.100", color: "#fff" }}
            color="gray.300"
          >
            Buy/Sell
          </Button>
        </Link>
        </Stack>

      </Stack>
    </Stack>
  );
};

export default BottomMenuMob;
