import { Box, Text } from "@chakra-ui/react";
import React from "react";
import BottomMenuMob from "../components/BottomMenuMob";
import TradeContainer from "../components/TradeContainer";
import Header from "../components/Header";

const Buy = () => {
  return (
    <Box display='flex' justifyContent='center' minH='100vh'>
    <Box width='100%' h='100%' maxW='1280px'>
      <Header/>
      <TradeContainer/>
      <BottomMenuMob/>
    </Box>
  </Box>
  )
}

export default Buy