import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";

// Import your reducers
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

// Create the root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
});

// Configure the persistence for each reducer
const persistConfig = {
  key: "root",
  // storage,
  storage: sessionStorage,
  // whitelist: ["cart", "auth"], // Add the names of the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persistence
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for Redux Persist
  }),
});

export const persistor = persistStore(store);
