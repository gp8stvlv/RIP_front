import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchText: '',
    price: '',
};

const searchCatalogSlice = createSlice({
    name: 'searchCatalog',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
    },
});

export const { setSearchText, setPrice } = searchCatalogSlice.actions;
export default searchCatalogSlice.reducer;
