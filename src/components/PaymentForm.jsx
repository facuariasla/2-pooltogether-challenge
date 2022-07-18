import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  FormLabel,
  Input,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CardCVV, cardNumberLengthValid, positiveAmount } from "../validations";
import useStore from "../global_state";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [validForm, setValidForm] = useState(false);
  const setRealUSD = useStore((state) => state.setRealUSD);
  const setUserData = useStore((state) => state.setUserData);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setValidForm(true);
    if (data.usd_amount) {
      // Validacion en el backend...
      console.log("se pagaron: ", data.usd_amount);
      setRealUSD(data.usd_amount);
      setUserData(data);
      alert("Dinero agregado a la cuenta, redireccionando");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const currentDate = () => {
    let actualMonth = new Date().getMonth() + 1;
    let actualYear = new Date().getFullYear();
    if (actualMonth.toString().length === 1) {
      return `${actualYear}-0${actualMonth}`;
    } else {
      return `${actualYear}-${actualMonth}`;
    }
  };

  return (
    <Box display="flex" justifyContent="center" pb={["100px", null, "80px"]}>
      <Box width="100%" h="100%" maxW="1280px" align="center">
        <Stack maxW="500px" px={4}>
          <Stack>
            <Heading color='gray.300'>Payment Details</Heading>
            <Text>
              Complete your purchase by providing your payment details
            </Text>
            {/* FORM CONTAINER */}
            <Stack>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <FormControl isRequired>
                  <Stack spacing={4} color='gray.200'>
                    <Stack spacing={1} align="flex-start">
                      <FormLabel m={0} p={0} htmlFor='email'>
                        Email address
                      </FormLabel>
                      <Input
                        id='email'
                        type="email"
                        {...register("email", {
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          required: true,
                        })}
                      />
                      {errors.email?.type === "pattern" && (
                        // <p>EL formato del email es incorrecto</p>
                        <FormHelperText color="red.400">
                          Email format is not correct
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack spacing={1} align="flex-start">
                      <FormLabel m={0} p={0} htmlFor='cardholdername'>
                        Cardholder name
                      </FormLabel>
                      <Input
                        id='cardholdername'
                        type="text"
                        {...register("cardholder_name", {
                          required: true,
                        })}
                      />
                      {errors.cardholder_name && (
                        <FormHelperText color="red.400">
                          Introduce the cardholder name
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack spacing={1} align="flex-start">
                      <FormLabel m={0} p={0} htmlFor='cardnumber'>
                        Card number
                      </FormLabel>
                      <Input
                        id='cardnumber'
                        type="number"
                        {...register("card_number", {
                          required: true,
                          validate: cardNumberLengthValid,
                        })}
                      />
                      {errors.card_number && (
                        <FormHelperText color="red.400">
                          Invalid card number
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack direction="row">
                      <Stack spacing={1} w="50%" align="flex-start">
                        <FormLabel m={0} p={0} htmlFor='carddate'>
                          Month/Year
                        </FormLabel>
                        <Input
                        id='carddate'
                          type="month"
                          min={`${currentDate()}`}
                          {...register("card_date", {
                            required: true,
                          })}
                        />
                        {errors.card_date && (
                          <FormHelperText color="red.400">
                            Specify a date
                          </FormHelperText>
                        )}
                      </Stack>

                      <Stack spacing={1} w="50%" align="flex-start">
                        <FormLabel m={0} p={0} htmlFor='cardcvv'>
                          CVV
                        </FormLabel>
                        <Input
                          id='cardcvv'
                          type="password"
                          {...register("card_cvv", {
                            required: true,
                            validate: CardCVV,
                          })}
                        />
                        {errors.card_cvv && (
                          <FormHelperText color="red.400">
                            Must be 3 digits
                          </FormHelperText>
                        )}
                      </Stack>
                    </Stack>

                    {validForm && (
                      <Stack align="flex-start">
                        <FormLabel m={0} p={0} htmlFor='usdamount'>
                          Amount (USD)
                        </FormLabel>
                        <Input
                        id='usdamount'
                          type="number"
                          placeholder="eg: 10"
                          {...register("usd_amount", {
                            required: true,
                            validate: positiveAmount,
                          })}
                        />
                        {errors.usd_amount && (
                          <FormHelperText color="red.400">
                            Minimum value 10 USD
                          </FormHelperText>
                        )}
                      </Stack>
                    )}

                    <Button
                      type="submit"
                      bgColor="cian.100"
                      color="purple.100"
                      fontWeight={500}
                    >
                      Send
                    </Button>
                  </Stack>
                </FormControl>
              </form>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default PaymentForm;
