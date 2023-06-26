import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import carsSlice from "./Slices/carsSlice";
import categorySlice from "./Slices/categorySlice";
import userSlice from "./Slices/usersSlice";
export const rootReducer = combineReducers({
	category: categorySlice,
	cars: carsSlice,
	user:userSlice,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware(),
});
