"use client";

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../counter/counterSlice";
import quantityReducer from "./quantitySlice";

import { productsApi } from "../components/productsApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quantity: quantityReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
