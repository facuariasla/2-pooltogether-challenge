export const createWalletSlice = (set, get) => ({
  realUSD: 0,
  userDATA: {},
  tokensInAcc: [],
  setRealUSD: (amount) => {
    // Simulacion de agregar dinero a la cuenta
    // llegan como string
    let amountINT = parseFloat(amount);
    set({
      realUSD: get().realUSD + amountINT,
    });
  },
  setUserData: (formData) => {
    // Simulacion de agregar dinero a la cuenta
    set({
      userDATA: formData,
    });
  },
  setTokensInAcc: (newToken) => {
    // Simulacion de agregar dinero a la cuenta
    // Teoricamente aca deberia checkearse si existe el token que se esta agregando, asi se le agrega mas cantidad, y no se agrega un item nuevo.

    set({
      tokensInAcc: [...get().tokensInAcc, newToken],
    });
  },
});
