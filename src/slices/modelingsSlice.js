import { createSlice } from '@reduxjs/toolkit';

const modelingsSlice = createSlice({
  name: 'modelings',
  initialState: {
    searchValue: '',
    modelings: [],
    loading: false,
    minPrice: 0,
    maxPrice: 99000,
  },
  reducers: {
    setSearchValue: (state, action) => {
      return { ...state, searchValue: action.payload };
    },
    setModelings: (state, action) => {
      return { ...state, modelings: action.payload };
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setMinPrice: (state, action) => {
      return { ...state, minPrice: action.payload };
    },
    setMaxPrice: (state, action) => {
      return { ...state, maxPrice: action.payload };
    },
  },
});

export const {
  setSearchValue,
  setModelings,
  setLoading,
  setMinPrice,
  setMaxPrice,
} = modelingsSlice.actions;

export default modelingsSlice.reducer;
