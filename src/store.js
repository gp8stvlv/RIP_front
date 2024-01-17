// store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import modelingsReducer from './slices/modelingsSlice';
import modelingsDetailsReducer from './slices/modelingsDetailsSlice';
import authReducer from './slices/authSlice';
import bucketReducer, { resetBucket } from './slices/bucketSlice';
import searchCatalogReducer from './slices/searchCatalogSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
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
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    searchCatalog: searchCatalogReducer,
    modelings: modelingsReducer,
    modelingsDetails: modelingsDetailsReducer,
    auth: authReducer,
    bucket: bucketReducer,
  },
  middleware: [thunk],
  preloadedState,
});

// Dispatch the resetBucket action after the initial state is loaded
store.dispatch(resetBucket()); // Corrected line

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
