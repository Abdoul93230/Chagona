// getSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/products`);
    dispatch(setProducts(response.data.data));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllType`);
    dispatch(setTypes(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const getSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    types: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setTypes: (stat, action) => {
      stat.types = action.payload;
    },
  },
});

export const { setProducts, setTypes } = getSlice.actions;

export default getSlice.reducer;
