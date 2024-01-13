// bucketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bucketItems: [],
  draft_id: null,
};

const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    resetBucket: (state) => {
      return { ...initialState };
    },
    UPDATE_NAVBAR: (state, action) => {
      state.updateNavbarFlag = action.payload;
    },
  },
});

export const { resetBucket, UPDATE_NAVBAR } = bucketSlice.actions;

export default bucketSlice.reducer;
export const updateNavbar = (flag) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_NAVBAR',
    payload: flag,
  });

  const { draft_id } = getState().bucket;

  // Dispatch getBucket action after updating the Navbar flag
  dispatch(getBucket(draft_id));
};