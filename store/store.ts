import { cartReducer } from './cart/cart';
import { pizzaDataReducer } from './pizza-data/pizza-data';
import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filter/filter";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizzaData: pizzaDataReducer,
    cart: cartReducer,
  },
});
