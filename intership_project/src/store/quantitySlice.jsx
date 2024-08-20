import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState : {
    value: 1,
  },
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    resetQuantity: (state) => {
      state.quantity = 1;
    },
  },
});

export const { setQuantity, resetQuantity } = quantitySlice.actions;

export default quantitySlice.reducer;
