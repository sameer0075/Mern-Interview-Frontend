import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import carsSlice from "./Slices/carsSlice";
import categorySlice from "./Slices/categorySlice";
export const rootReducer = combineReducers({
	category: categorySlice,
	cars: carsSlice,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware(),
});
