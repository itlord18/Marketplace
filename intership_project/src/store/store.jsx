/* eslint-disable react-refresh/only-export-components */
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';

import { productsApi } from '../shop/productsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});

export default store;