import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../BaseClass/index";
import { toast } from "react-toastify";
import { url } from "../url";
import { AddCarInterface, CarsCount, CarsListInterface } from "../interfaces/Cars";

const initialState = {
	isLoading: <boolean>false,
	cars: <CarsListInterface[]>[],
	car: <CarsListInterface>{},
	totalCars:<number>0
};

export const CarsList = createAsyncThunk("cars/list", async (param: string) => {
	try {
		const resp = await api.get<CarsListInterface[]>(`${url}/cars${param}`);
		return resp;
	} catch (error: any) {
		throw error.response.data;
	}
});

export const AddNewCar = createAsyncThunk(
	"cars/create",
	async (data: AddCarInterface, thunkAPI) => {
		try {
			const resp = await api.post<CarsListInterface>(`${url}/cars`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const UpdateCar = createAsyncThunk(
	"cars/update",
	async (data: AddCarInterface, thunkAPI) => {
		try {
			const resp = await api.put<CarsListInterface>(
				`${url}/cars/${data.id}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const getCount = createAsyncThunk(
	"cars/count",
	async (data:any,thunkAPI) => {
		try {
			const resp = await api.get<CarsCount>(
				`${url}/cars/count`,
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const DeleteCar = createAsyncThunk(
	"cars/delete",
	async (data: any, thunkAPI) => {
		try {
			const resp = await api.delete<any>(`${url}/cars/${data.id}`);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const carsSlice = createSlice({
	name: "cars",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(CarsList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(CarsList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cars = action.payload;
			})
			.addCase(CarsList.rejected, (state, action: any) => {
				console.log("message",action)
				const message: string = action.error.message;
				state.isLoading = false;
				toast.info(message);
			})
			.addCase(getCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.totalCars = action.payload.count;
			})
			.addCase(getCount.rejected, (state, action: any) => {
				const message: string = action.error.message;
				state.isLoading = false;
				toast.info(message);
			})

			.addCase(AddNewCar.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddNewCar.fulfilled, (state, action) => {
				state.isLoading = false;
				state.car = action.payload;
				state.cars = [action.payload, ...state.cars];
				toast.info("Data created successfully");
			})
			.addCase(AddNewCar.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(UpdateCar.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UpdateCar.fulfilled, (state, action) => {
				state.isLoading = false;
				state.car = action.payload;
				const index = state.cars.findIndex(
					(info) => info.id == action.payload.id
				);
				if (index != -1) {
					state.cars[index] = action.payload;
				}
				toast.info("Data updated successfully");
			})
			.addCase(UpdateCar.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(DeleteCar.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(DeleteCar.fulfilled, (state, action) => {
				state.isLoading = false;
				state.car = action.payload;
				let { id } = action.meta.arg;
				let filterData = state.cars.filter((car: any) => {
					return car.id != id;
				});
				state.cars = filterData;
				toast.info("Data deleted successfully");
			})
			.addCase(DeleteCar.rejected, (state, action: any) => {
				const message: any = action.error.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			});
	},
});

export default carsSlice.reducer;
