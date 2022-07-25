import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import useStore from "../global_state";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const HomeCover = () => {
  const realUSD = useStore((state) => state.realUSD);
  const tokensInAcc = useStore((state) => state.tokensInAcc);

  return (
    <Stack align="center">
      <Heading>IR A DEPOSITAR</Heading>
      <Text>Cargar falsos créditos (número tarjeta + 4200)</Text>
      <hr/>
      <Heading>IR A BUY/SELL</Heading>
      <Text>Hacer compra de alguna crypto con los USD disponibles</Text>
      <hr/>
      <Stack direction="row" align="center" spacing={0}>
        <Heading>CREDITS: {realUSD ? realUSD : "0"} USD </Heading>
      </Stack>
      <Stack>
        <ul>
          {tokensInAcc?.map((el) => (
            <li key={Math.random() * 99999}>
              {el.token}: {el.amount}
            </li>
          ))}
        </ul>
      </Stack>
    </Stack>
  );
};

export default HomeCover;
