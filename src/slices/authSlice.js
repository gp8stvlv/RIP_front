// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const persistedState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState: persistedState || {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      saveState(state);
    },
    logoutSuccess: (state) => {
      if (state.isAuthenticated) {
        state.isAuthenticated = false;
        state.user = null;
        saveState(state);
      }
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
