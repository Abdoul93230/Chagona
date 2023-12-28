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
export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllCategories`);
    dispatch(setCategories(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProducts_Pubs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/productPubget`);
    dispatch(setProducts_Pubs(response.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProducts_Commentes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllCommenteProduit`);
    dispatch(setProducts_Commentes(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    types: [],
    categories: [],
    products_Pubs: [],
    products_Commentes: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setTypes: (stat, action) => {
      stat.types = action.payload;
    },
    setCategories: (stat, action) => {
      stat.categories = action.payload;
    },
    setProducts_Pubs: (stat, action) => {
      stat.products_Pubs = action.payload;
    },
    setProducts_Commentes: (stat, action) => {
      stat.products_Commentes = action.payload;
    },
  },
});

export const {
  setProducts,
  setTypes,
  setCategories,
  setProducts_Pubs,
  setProducts_Commentes,
} = getSlice.actions;

export default getSlice.reducer;
