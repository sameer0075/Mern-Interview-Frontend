import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../BaseClass/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../url";
import {
	AddUserInterface,
	LoginUserInterface,
	UsersListInterface,
} from "../interfaces/Users";

const initialState = {
	isLoading: <boolean>false,
	users: <UsersListInterface[]>[],
	user: <UsersListInterface>{},
};

export const UsersList = createAsyncThunk(
	"users/list",
	async (params?: any) => {
		try {
			const resp = await api.get<UsersListInterface[]>(`${url}/users${params}`);
			return resp;
		} catch (error: any) {
			throw error.response.data;
		}
	}
);

export const AddNewUser = createAsyncThunk(
	"users/create",
	async (data: AddUserInterface, thunkAPI) => {
		try {
			const resp = await api.post<UsersListInterface>(`${url}/users`, data);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const LoginUser = createAsyncThunk(
	"users/login",
	async (data: LoginUserInterface, thunkAPI) => {
		try {
			const resp = await api.post<UsersListInterface>(
				`${url}/users/login`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const UpdateUser = createAsyncThunk(
	"users/update",
	async (data: AddUserInterface, thunkAPI) => {
		try {
			const resp = await api.put<UsersListInterface>(
				`${url}/users/${data.id}`,
				data
			);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const DeleteUser = createAsyncThunk(
	"users/delete",
	async (data: any, thunkAPI) => {
		try {
			const resp = await api.delete<any>(`${url}/users/${data.id}`);
			return resp;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const userSlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(LoginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(LoginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(LoginUser.rejected, (state, action: any) => {
				const message: string = action.payload.message;
				state.isLoading = false;
				toast.info(message);
			})
			.addCase(UsersList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UsersList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users = action.payload;
			})
			.addCase(UsersList.rejected, (state, action: any) => {
				const message: string = action.payload.message;
				state.isLoading = false;
				toast.info(message);
			})

			.addCase(AddNewUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(AddNewUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.users.push(action.payload);
				toast.info("Data created successfully");
			})
			.addCase(AddNewUser.rejected, (state, action: any) => {
				const message: any = action.payload.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(UpdateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(UpdateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				toast.info("Data updated successfully");
			})
			.addCase(UpdateUser.rejected, (state, action: any) => {
				const message: any = action.payload.message;
				state.isLoading = false;
				if (typeof message === "string") {
					toast.error(message);
				} else {
					message?.map((msg: string) => {
						return toast.error(msg);
					});
				}
			})

			.addCase(DeleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(DeleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				let { id } = action.meta.arg;
				let filterData = state.users.filter((category: any) => {
					return category.id != id;
				});
				state.users = filterData;
				toast.info("Data updated successfully");
			})
			.addCase(DeleteUser.rejected, (state, action: any) => {
				const message: any = action.payload.message;
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

export default userSlice.reducer;
