import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import quantityReducer from './quantitySlice';
import { productsApi } from '../shop/productsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quantity: quantityReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});

export default store;