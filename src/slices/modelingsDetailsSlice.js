// modelingsDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modelingsDetailsSlice = createSlice({
  name: 'modelingsDetails',
  initialState: {
    details: {},
  },
  reducers: {
    getModelingsDetailsSlice: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { getModelingsDetailsSlice } = modelingsDetailsSlice.actions;
export default modelingsDetailsSlice.reducer;
