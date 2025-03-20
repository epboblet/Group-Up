import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import userSlice from './slice/userSlice';
import postsSlice from './slice/postsSlice';

// Set up persist config
const persistConfig = {
  key: 'root', // The key to store the persisted data
  storage,     // Using localStorage by default, or sessionStorage
};

const persistedReducer = persistReducer(persistConfig, userSlice);

// Create Redux store with persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer, // Persist the user slice
    posts: postsSlice,
  },
});

// Create a persistor (required by redux-persist)
const persistor = persistStore(store);

export { store, persistor };
