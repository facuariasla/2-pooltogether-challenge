import create from "zustand";
import { createTokenSlice } from "./createTokenSlice";
import { createWalletSlice } from "./createWalletSlice";
import { devtools } from "zustand/middleware";


const useStore = create(devtools((set, get) => ({
  ...createTokenSlice(set, get),
  ...createWalletSlice(set, get),
})));

export default useStore;
