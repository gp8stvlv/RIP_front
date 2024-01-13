import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: '',
    formationDateFrom: '',
    formationDateTo: '',
    username: '',
};

const searchApplicationSlice = createSlice({
    name: 'searchApplication',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setFormationDateFrom: (state, action) => {
            state.formationDateFrom = action.payload;
        },
        setFormationDateTo: (state, action) => {
            state.formationDateTo = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setStatus, setFormationDateFrom, setFormationDateTo, setUsername } = searchApplicationSlice.actions;
export default searchApplicationSlice.reducer;
