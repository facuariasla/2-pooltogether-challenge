import React, { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import BuyPanels from './TradePanels';


const TradeContainer = () => {

  return (
    <Stack>
      <Stack pt={8}>
        <BuyPanels/>
      </Stack>
    </Stack>
  )
}

export default TradeContainer