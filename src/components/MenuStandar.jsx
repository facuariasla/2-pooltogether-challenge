import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CgMenuLeft } from "react-icons/cg";
import useStore from "../global_state";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// CgMenuLeft
const MenuStandar = () => {
  const realUSD = useStore((state) => state.realUSD);

  return (
    <Menu>
      <MenuButton
        as={Button}
        h={8}
        bgColor="purple.100"
        _hover={{ bgColor: "purple.100", color: "#fff" }}
        _active={{ bgColor: "purple.100", color: "#fff" }}
        fontSize={30}
        display="flex"
      >
        <CgMenuLeft />
      </MenuButton>
      <MenuList bgColor="purple.50" color="#fff" border="none">
        <Link to="/">
          <MenuItem _hover={{ color: "black", backgroundColor: "#fff" }}>
            Home
          </MenuItem>
        </Link>

        <Link to="/buy">
          <MenuItem _hover={{ color: "black", backgroundColor: "#fff" }}>
            Buy/Sell
          </MenuItem>
        </Link>

        <Link to="/payment">
          <MenuItem _hover={{ color: "black", backgroundColor: "#fff" }}>
            Depositar
          </MenuItem>
        </Link>
        <MenuItem _hover={{ background: "none" }} w="100%" cursor="auto">
          <Stack direction="row" align="center" justify="space-around">
            <Text>{realUSD ? realUSD : "0"} USD</Text>
            <RiMoneyDollarCircleLine color="yellow" />
          </Stack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuStandar;
