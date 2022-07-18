import { Box, Text } from "@chakra-ui/react";
import React from "react";
import BottomMenuMob from "./BottomMenuMob";
import Header from "./Header";
import HomeCover from "./HomeCover";


const HomeLayout = () => {


  return (
    <Box display='flex' justifyContent='center' minH='100vh'>
      <Box width='100%' h='100%' maxW='1280px'>
        <Header/>
        <HomeCover/>
        <BottomMenuMob/>
      </Box>
    </Box>
  );
};

export default HomeLayout;
