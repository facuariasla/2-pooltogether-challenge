export const createTokenSlice = (set, get) => ({
  walletTokens: [
    {
      id: 999,
      name: "Tether USD",
      symbol: "USDT",
      quantity: 999999,
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 6,
    },
    {
      id: 998,
      name: "USDC Coin",
      symbol: "USDC",
      quantity: 500,
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      decimals: 6,
    },
    {
      id: 997,
      name: "Binance USD",
      symbol: "BUSD",
      quantity: 800,
      address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
      decimals: 18,
    },
    {
      id: 996,
      name: "Wrapped BTC",
      symbol: "WBTC",
      quantity: 2,
      address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      decimals: 8,
    },
    {
      id: 995,
      name: "Wrapped Ether",
      symbol: "WETH",
      quantity: 5,
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      decimals: 18,
    },
    {
      id: 994,
      name: "Aave",
      symbol: "AAVE",
      quantity: 200,
      address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
      decimals: 18,
    },
    {
      id: 993,
      name: "Dai Stablecoin",
      symbol: "DAI",
      quantity: 1200,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      decimals: 18,
    },
    {
      id: 992,
      name: "Matic Network Token",
      symbol: "MATIC",
      quantity: 300,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      decimals: 18,
    },
  ],
  tokens: null,
  favTokens: [],
  favLastPrices: {},
  tokenToReceive: null,
  ETHprice: null,
  standarTradePrice: null,

  fetchTokens: async () => {
    const res = await fetch("https://api.0x.org/swap/v1/tokens");
    const data = await res.json();
    const arrayData = await data.records;

    // Some tokens were duplicated, so:
    const dataFiltered = await arrayData.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.symbol === value.symbol)
    );

    set({ tokens: dataFiltered });
  },

  fetchETHPrice: async () => {
    const res = await fetch(
      "https://api.0x.org/swap/v1/price?sellToken=ETH&buyToken=USDT&sellAmount=1000000000000000000"
    );
    const data = await res.json();
    set({ ETHprice: data.price });
  },

  addToFav: (xToken) => {
    if (get().favTokens.length < 3) {
      if (!get().favTokens.includes(xToken)) {
        set({
          favTokens: [xToken, ...get().favTokens],
        });
      } else {
        const newFavs = get().favTokens.filter((el) => el !== xToken);
        set({
          favTokens: newFavs,
        });
      }
    } else {
      // Si el favsTokens tiene 3 elementos:
      if (get().favTokens.includes(xToken)) {
        // Si lo incluye al token, que lo saque
        const newFavs = get().favTokens.filter((el) => el !== xToken);
        set({
          favTokens: newFavs,
        });
      } else {
        // Si no lo incluye al token, que saque al ultimo
        // y lo agregue al inicio
        const newFavs = get().favTokens;
        console.log("deleted: ", newFavs[2]);
        newFavs.pop();
        newFavs.unshift(xToken);
        set({
          favTokens: newFavs,
        });
      }
    }
  },

  removeFav: (token) => {
    const favFilter = get().favTokens?.filter(
      (el) => el.symbol !== token.symbol
    );
    console.log(favFilter);
  },


  setTokenToReceive: (token) => {
    const toBuy = get().tokens.filter((el) => el.symbol === token);
    set({
      tokenToReceive: toBuy[0],
    });
  },

  setStandarTradePrice: async () => {
    // PAX address --> 0x8e870d67f660d95d5be530380d0ec0bd388289e1
    const toBuy = get().tokenToReceive;

    const res = await fetch(
      `https://api.0x.org/swap/v1/price?sellToken=0x8e870d67f660d95d5be530380d0ec0bd388289e1&buyToken=${toBuy.address}&sellAmount=1000000000000000000`
    );
    const data = await res.json();
    set({
      standarTradePrice: data,
    });
    return data;
  },

  setBestAverage: async () => {
    get().favTokens.map(async (token) => {
      let res = await fetch(
        // Token comparado con 1 PAX (stablecoin)
        // 'Si vendo 1 PAX, obtengo xToken cantidad'
        `https://api.0x.org/swap/v1/price?sellToken=0x8e870d67f660d95d5be530380d0ec0bd388289e1&buyToken=${token.address}&sellAmount=1000000000000000000`
      );
      let data = await res.json();
      let price = await data.price;

      if (get().favLastPrices[token.symbol] === undefined) {
        set({
          favLastPrices: {
            ...get().favLastPrices,
            [token.symbol]: { lastValues: [price] },
          },
        });
        console.log(get().favLastPrices);
      } else {
        let ArrayXToken = get().favLastPrices[token.symbol].lastValues;
        let longArray = ArrayXToken.length;
        if (longArray < 5) {
          ArrayXToken.unshift(price);
          set({
            favLastPrices: {
              ...get().favLastPrices,
              [token.symbol]: { lastValues: ArrayXToken },
            },
          });
          console.log(get().favLastPrices);
        } else {
          ArrayXToken.pop();
          ArrayXToken.unshift(price);
          set({
            favLastPrices: {
              ...get().favLastPrices,
              [token.symbol]: { lastValues: ArrayXToken },
            },
          });
          console.log(get().favLastPrices);
        }
      }
    });

    return get().favLastPrices;
  },
});
