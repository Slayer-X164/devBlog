import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import mobileNavReducer from "./mobileNav.slice";

const rootReducer = combineReducers({
  user: userReducer,
  mobileNav: mobileNavReducer,
});
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);
