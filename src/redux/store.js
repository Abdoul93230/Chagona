// store.js
import { configureStore } from "@reduxjs/toolkit";
import getReducer from "./ProductsActions";

const store = configureStore({
  reducer: {
    products: getReducer,
  },
});

export default store;
