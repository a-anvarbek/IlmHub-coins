// Libraries
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, createTransform } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// Slices
import authSlice from "./authSlice";
import groupSlice from "./groupSlice";
import rewardItemSlice from "./rewardItemSlice";
import studentSlice from "./studentSlice";
import transactionSlice from "./transactionSlice";
import userSlice from "./userSlice";

// All reducers merging
const rootReducer = combineReducers({
  auth: authSlice,
  group: groupSlice,
  rewardItem: rewardItemSlice,
  student: studentSlice, 
  transaction: transactionSlice,
  users: userSlice,
});

// Transform
const SetMarkerTransform = createTransform(
  (inboundState, key) => {
    if (key === "map") {
      return { ...inboundState, alls: null };
    }
    return inboundState;
  },
  (outboundState) => outboundState
);

// Persist config
const persistConfig = {
  key: "root",
  storage: storageSession,
  transforms: [SetMarkerTransform],
};

// Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
