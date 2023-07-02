import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartList, TState } from "./types";

const initialState: TState = {
  cartList: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("cartList") || "[]") : [],
  totalPrice: typeof window !== "undefined" ? +(sessionStorage.getItem("totalPrice") || 0) : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(
      state,
      {
        payload: { newCartItem, initialPrice },
      }: PayloadAction<{ newCartItem: TCartList; initialPrice: number }>
    ) {
      const findItem = state.cartList.find(
        (obj) => obj.title === newCartItem.title
      );

      if (findItem) {
        findItem.count++;
        findItem.price = initialPrice * findItem.count;
      } else {
        state.cartList.push({
          ...newCartItem,
          count: 1,
        });
      }

      state.totalPrice = state.cartList.reduce((a, b) => {
        return a + b.price;
      }, 0);
      sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
      sessionStorage.setItem("totalPrice", String(state.totalPrice));
    },
    removeProducts(state) {
      state.cartList = [];
      state.totalPrice = 0;
      sessionStorage.removeItem("cartList");
      sessionStorage.setItem("totalPrice", "0");
    },
    removeProduct(state, { payload }: PayloadAction<string>) {
      state.cartList = state.cartList.filter((obj) => obj.title !== payload);
      state.totalPrice = state.cartList.reduce((a, b) => {
        return a + b.price;
      }, 0);
      sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
      sessionStorage.setItem("totalPrice", String(state.totalPrice));
    },
    incrementCount(state, { payload }: PayloadAction<string>) {
      const findItem = state.cartList.find((obj) => obj.title === payload);

      if (findItem) {
        const initialPrice = findItem.price / findItem.count;

        findItem.count++;
        findItem.price += initialPrice;
      }

      state.totalPrice = state.cartList.reduce((a, b) => {
        return a + b.price;
      }, 0);
      sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
      sessionStorage.setItem("totalPrice", String(state.totalPrice));
    },
    decrementCount(state, { payload }: PayloadAction<string>) {
      const findItem = state.cartList.find((obj) => obj.title === payload);

      if (findItem) {
        const initialPrice = findItem.price / findItem.count;

        findItem.count--;
        findItem.price -= initialPrice;
      }

      if (findItem?.count === 0) {
        state.cartList = state.cartList.filter(
          (item) => item.title !== findItem.title
        );
      }

      state.totalPrice = state.cartList.reduce((a, b) => {
        return a + b.price;
      }, 0);
      sessionStorage.setItem("cartList", JSON.stringify(state.cartList));
      sessionStorage.setItem("totalPrice", String(state.totalPrice));
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addProduct,
  removeProducts,
  removeProduct,
  decrementCount,
  incrementCount,
} = cartSlice.actions;

export const selectCartList = (state: { cart: { cartList: TCartList[] } }) =>
  state.cart.cartList;
export const selectTotalPrice = (state: { cart: { totalPrice: number } }) =>
  state.cart.totalPrice;
