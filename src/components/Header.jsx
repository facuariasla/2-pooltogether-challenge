import React from "react";
import {
  Button,
  Box,
  Stack,
  Image,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import desklogo from "../public/desk-logo.svg";
import moblogo from "../public/mob-logo.svg";
import MenuStandar from "./MenuStandar";
import { Link } from "react-router-dom";

// COLOR BG #2D0B5A
const Header = () => {
  const logo = useBreakpointValue({ base: moblogo, lg: desklogo });
  const menuChange = useBreakpointValue({ base: true, lg: false });
  const navHead = useBreakpointValue({ base: "none", lg: "flex" });


  return (
    <Box
      p={4}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack>
        <Link to="/">
          <Image src={logo} h="50px" />
        </Link>
      </Stack>

      <Stack>
        <Stack
          h={8}
          direction="row"
          display={navHead}
          bgColor="purple.50"
          align="center"
          p={2}
          borderRadius={12}
        >
          <Link to="/payment">
            <Button
              display="flex"
              justifyContent="center"
              h={6}
              bgColor="purple.50"
              _active={{ backgroundColor: "purple.100", color: '#fff' }}
              _hover={{ backgroundColor: "purple.100", color: '#fff' }}
              color="gray.300"
              borderRadius={12}
            >
              Depositar
            </Button>
          </Link>
          <Link to="/">
            <Button
              display="flex"
              justifyContent="center"
              h={6}
              bgColor="purple.50"
              _active={{ backgroundColor: "purple.100", color: '#fff' }}
              _hover={{ backgroundColor: "purple.100", color: '#fff' }}
              color="gray.300"
              borderRadius={12}

            >
              Premios
            </Button>
          </Link>
          <Link to="/">
            <Button
              display="flex"
              justifyContent="center"
              h={6}
              bgColor="purple.50"
              _active={{ backgroundColor: "purple.100", color: '#fff' }}
              _hover={{ backgroundColor: "purple.100", color: '#fff' }}
              color="gray.300"
              borderRadius={12}

            >
              Cuenta
            </Button>
          </Link>
          <Link to="/buy">
            <Button
              display="flex"
              justifyContent="center"
              h={6}
              bgColor="purple.50"
              _active={{ backgroundColor: "purple.100", color: '#fff' }}
              _hover={{ backgroundColor: "purple.100", color: '#fff' }}
              color="gray.300"
              borderRadius={12}

            >
              Buy/Sell
            </Button>
          </Link>
        </Stack>
      </Stack>

        <Box display='flex' flexDirection="row" alignItems="center">
          <Button h={9} bgColor="cian.100" color="purple.100" >
            Connect Wallet
          </Button>
          <MenuStandar />
        </Box>
      
    </Box>
  );
};

export default Header;
