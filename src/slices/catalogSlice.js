// catalogSlice.js

import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        equipment: [],
    },
    reducers: {
        getCatalogSuccess: (state, action) => {
            state.equipment = action.payload;
        },
    },
});

export const { getCatalogSuccess } = catalogSlice.actions;

export default catalogSlice.reducer;
