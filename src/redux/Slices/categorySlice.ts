import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../BaseClass/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	AddCategoryInterface,
	CategoryListInterface,
} from "../interfaces/Categories";
import { url } from "../url";

const initialState = {
	isLoading: <boolean>false,
	categories: <CategoryListInterface[]>[],
	category: <CategoryListInterface>{},
};

export const CategoryList = createAsyncThunk(
	"category/list",
	async (params?: any) => {
		try {
			const resp = await api.get<CategoryListInterface[]>(
				`${url}/categories${params}`
			);
			return resp;
		} catch (error: any) {
			throw error.response.data;
		}
	}
);

export const AddNewCategory = createAsyncThunk(
	"category/create",
	async (data: AddCategoryInterface, thunkAPI) => {
		try {
			const resp = await api.post<CategoryListInterface>(
				`${url}/categories`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const UpdateCategory = createAsyncThunk(
	"category/update",
	async (data: AddCategoryInterface, thunkAPI) => {
		try {
			const resp = await api.put<CategoryListInterface>(
				`${url}/categories/${data.id}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const DeleteCategory = createAsyncThunk(
	"category/delete",
	async (data: any, thunkAPI) => {
		try {
			const resp = await api.delete<any>(`${url}/categories/${data.id}`);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(CategoryList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(CategoryList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories = action.payload;
			})
			.addCase(CategoryList.rejected, (state, action: any) => {
				const message: string = action.error.message;
				state.isLoading = false;
				toast.error(message);
			})

			.addCase(AddNewCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddNewCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.category = action.payload;
				state.categories = [action.payload, ...state.categories];
				toast.info("Data created successfully");
			})
			.addCase(AddNewCategory.rejected, (state, action: any) => {
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

			.addCase(UpdateCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UpdateCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.category = action.payload;
				const index = state.categories.findIndex(
					(info) => info.id == action.payload.id
				);
				if (index != -1) {
					state.categories[index] = action.payload;
				}
				toast.info("Data updated successfully");
			})
			.addCase(UpdateCategory.rejected, (state, action: any) => {
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

			.addCase(DeleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(DeleteCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.category = action.payload;
				let { id } = action.meta.arg;
				let filterData = state.categories.filter((category: any) => {
					return category.id != id;
				});
				state.categories = filterData;
				toast.info("Data updated successfully");
			})
			.addCase(DeleteCategory.rejected, (state, action: any) => {
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

export default categorySlice.reducer;
