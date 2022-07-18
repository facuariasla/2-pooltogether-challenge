import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Text,
  FormControl,
  Input,
  Button,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { FaChevronRight, FaStar, FaRegStar } from "react-icons/fa";

import useStore from "../global_state";

const BuyPanel = () => {
  const navigate = useNavigate();

  const tokens = useStore((state) => state.tokens);
  const fetchTokens = useStore((state) => state.fetchTokens);

  const ETHprice = useStore((state) => state.ETHprice);
  const fetchETHPrice = useStore((state) => state.fetchETHPrice);

  const tokenToReceive = useStore((state) => state.tokenToReceive);
  const setTokenToReceive = useStore((state) => state.setTokenToReceive);

  const addToFav = useStore((state) => state.addToFav);
  const favTokens = useStore((state) => state.favTokens);

  const standarTradePrice = useStore((state) => state.standarTradePrice);
  const setStandarTradePrice = useStore((state) => state.setStandarTradePrice);

  // Objeto con 3 favs, que tienen los 5 ultimos precios de c/u
  const favLastPrices = useStore((state) => state.favLastPrices);
  const setBestAverage = useStore((state) => state.setBestAverage);

  const [isFav, setIsFav] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);

  const [quantitySell, setQuantitySell] = useState(0);
  const [quantityBuy, setQuantityBuy] = useState(0);

  const realUSD = useStore((state) => state.realUSD);
  const setRealUSD = useStore((state) => state.setRealUSD);
  const setTokensInAcc = useStore((state) => state.setTokensInAcc);
  const [enoughBalance, setEnoughBalance] = useState(true);

  // Trae todos los tokens, y setea el precio de ETH
  useEffect(() => {
    fetchETHPrice();
    fetchTokens();
  }, [fetchETHPrice, fetchTokens]);

  // Setea el precio para el token seleccionado
  useEffect(() => {
    if (tokenToReceive) {
      setStandarTradePrice();
      setDisabledInput(false);
      const newPrice = async () => {
        const newStandarP = await setStandarTradePrice();
        console.log("estandar price", newStandarP?.price);
        return setQuantityBuy(quantitySell * newStandarP?.price);
      };
      newPrice();
    } else {
      setDisabledInput(true);
    }
  }, [tokenToReceive]);

  // Cambia el color de la estrella, si esta en fav ese token
  // agregar otras condiciones, como la de disableBtn etc
  useEffect(() => {
    console.log(favTokens);
    console.log(tokenToReceive);
    if (favTokens.length !== 0 && tokenToReceive)
      if (favTokens.includes(tokenToReceive)) {
        setIsFav(true);
        setDisabledBtn(true);
      } else {
        setIsFav(false);
        setDisabledBtn(false);
      }
  }, [tokenToReceive]);

  // Hace una call a la peticion fetch para saber los precios y calcular mejor promedio
  useEffect(() => {
    const interval = setInterval(async () => {
      let ActualToken = tokenToReceive?.symbol;
      // setBestAverage();
      const fivePrices = async () => {
        let dataPrices = await setBestAverage();
        console.log(dataPrices);
        if (dataPrices[ActualToken]) {
          if (dataPrices[ActualToken].lastValues.length === 5) {
            let newArray = dataPrices[ActualToken].lastValues;
            let sum = 0;
            for (let i = 0; i < newArray.length; i++) {
              const element = parseFloat(newArray[i]);
              sum = sum + element;
            }
            let average = sum / newArray.length;
            if (newArray[0] <= average) {
              setDisabledBtn(false);
              console.log({ actual: newArray[0], prom: average });
            } else {
              setDisabledBtn(true);
              console.log({ actual: newArray[0], prom: average });
            }
          }
        }
      };
      fivePrices();
    }, 30000);
    return () => clearInterval(interval);
  }, [tokenToReceive]);

  // setea/elimina favorito
  const favBuy = () => {
    if (!tokenToReceive) return;
    setIsFav(!isFav);
    setDisabledBtn(!disabledBtn);
    //
    addToFav(tokenToReceive);
    console.log(favTokens);
  };

  // setea el precio en el input Receive a comprar
  const setPrices = (sellQuantity) => {
    setQuantitySell(sellQuantity);
    let sellToInt = parseFloat(sellQuantity);
    console.log("se vende USD:", sellToInt);
    console.log("se tiene USD: ", realUSD);
    if (sellToInt > realUSD) {
      setEnoughBalance(false);
      return;
    } 
    setEnoughBalance(true);
      if (standarTradePrice) {
        let standarToInt = parseFloat(standarTradePrice.price);
        setQuantityBuy(sellQuantity * standarToInt);
        console.log(standarToInt);
        console.log(sellQuantity * standarToInt);

        if (favTokens?.includes(tokenToReceive)) {
          setIsFav(true);
          setDisabledBtn(true);
        } else {
          setIsFav(false);
        }
      } else {
        console.log("no entro");
      }
    
  };

  const handlBuy = (e) => {
    e.preventDefault();
    let quantitySellFloat = parseFloat(quantitySell);
    if(quantitySellFloat > realUSD) {
      alert("No tenes dinero suficiente");
      console.log("Aca iria toast de error");
      return
    }
    if (quantityBuy <= 0) {
      alert("Selecciona un token y una cantidad");
      console.log("Aca iria toast de error");
    } else {
      let newToken = {
        token: tokenToReceive?.symbol,
        amount: quantityBuy,
      };
      setTokensInAcc(newToken);
      setRealUSD(-quantitySell);

      alert("Compra realizada");
      console.log("Nuevos tokens en la cuenta");
      // Se le restan los USD a la wallet, y se agrega nuevo valor


      navigate("/");
    }
  };

  return (
    <Stack pb={10}>
      <Stack align="center">
        <Text fontWeight={500} color="gray.300">
          1 ETH = {ETHprice} USDT
        </Text>
      </Stack>

      <form autoComplete="off">
        <FormControl>
          <Stack spacing={4}>
            <Stack>
              <FormLabel htmlFor="inputSell" m={0}>
                You sell
              </FormLabel>

              <Stack
                size="md"
                display="flex"
                direction="row"
                align="flex-start"
              >
                <Stack width="80%">
                  <Input
                    id="inputSell"
                    type="number"
                    max={2}
                    h={16}
                    placeholder="0.000"
                    borderRadius={12}
                    required
                    color="#fff"
                    _placeholder={{ fontWeight: "400" }}
                    fontWeight={500}
                    bgColor="#493171"
                    border="none"
                    fontSize={20}
                    value={quantitySell}
                    onChange={(e) => setPrices(e.target.value)}
                    disabled={disabledInput}
                  />
                  {!enoughBalance && (
                    <FormHelperText color="red.400">
                      You do not have enough balance in your account
                    </FormHelperText>
                  )}
                </Stack>

                <Stack direction="row" align="center" width="20%">
                  <select className="buypanel_select" type="text">
                    <option className="buypanel_option">USD</option>
                  </select>
                  <Stack opacity="0" fontSize={18}>
                    <FaRegStar />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack>
              <FormLabel htmlFor="inputBuy" m={0}>
                Receive
              </FormLabel>

              <Stack size="md" display="flex" direction="row" align="center">
                <Input
                  id="inputBuy"
                  type="number"
                  required
                  maxLength={10}
                  h={16}
                  placeholder="0.000"
                  borderRadius={12}
                  color="#fff"
                  _placeholder={{ fontWeight: "400" }}
                  fontWeight={500}
                  bgColor="#493171"
                  border="none"
                  fontSize={20}
                  value={quantityBuy}
                  // onChange={(e) => setQuantityBuy(e.target.value)}
                  readOnly
                  disabled={true}
                />
                <Stack direction="row" align="center">
                  <select
                    className="buypanel_select"
                    type="text"
                    value={tokenToReceive?.symbol}
                    onChange={(e) => setTokenToReceive(e.target.value)}
                  >
                    <option className="buypanel_option">-</option>
                    {tokens?.map((el) => (
                      <option className="buypanel_option" key={el.symbol}>
                        {el.symbol}
                      </option>
                    ))}
                  </select>
                  <Stack
                    fontSize={18}
                    color={tokenToReceive ? "#fff" : "gray.600"}
                    cursor={tokenToReceive ? "pointer" : "not-allowed"}
                    onClick={() => favBuy()}
                  >
                    {/* <FaRegStar /> */}
                    {isFav ? <FaStar /> : <FaRegStar />}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Button
              disabled={disabledBtn ? true : false}
              fontWeight={500}
              h={10}
              borderRadius={12}
              bgColor="cian.100"
              color="purple.100"
              type="submit"
              onClick={(e) => handlBuy(e)}
            >
              {disabledBtn ? "Best average..." : "Complete"}
            </Button>
          </Stack>
        </FormControl>
      </form>

      <p>
        You sell 1 USD --- you get{" "}
        {standarTradePrice ? standarTradePrice.price : ""}{" "}
        {tokenToReceive?.symbol}
      </p>
    </Stack>
  );
};

export default BuyPanel;
