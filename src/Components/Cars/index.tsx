import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../Partials/Modal";
import CustomTable from "../../Partials/Table";
import { CarsList, DeleteCar } from "../../redux/Slices/carsSlice";
import AddCar from "./add-car";

export default function Cars() {
	const [data, setData] = useState({ show: false, selectedData: null });
	const dispatch: any = useDispatch();
	const cars = useSelector((state: any) => state.cars.cars);
	const isLoading = useSelector((state: any) => state.category.isLoading);

	useEffect(() => {
		dispatch(CarsList("?page=1&limit=10"));
	}, []);

	const handlePageChange = (param: any) => {
		dispatch(CarsList(param));
	};

	const handleDelete = (id: number) => {
		dispatch(DeleteCar({ id }));
	};

	const handleChange = (name: string) => (value: any) => {
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<div>
			<div
				style={{
					width: "90vw",
					display: "flex",
					justifyContent: "right",
					paddingTop: "1rem",
				}}
			>
				<Button onClick={() => handleChange("show")(true)} variant="contained">
					Add
				</Button>
			</div>
			<CustomTable
				data={cars}
				columns={[
					"id",
					"name",
					"description",
					"color",
					"model",
					"make",
					"registration_no",
					"Category",
					"action",
				]}
				apiCall={handlePageChange}
				handleDelete={handleDelete}
				handleSelection={handleChange}
			/>
			<CustomModal
				show={data.show}
				title="Add Car"
				closeModal={() => handleChange("show")(false)}
			>
				<AddCar
					selectedData={data.selectedData}
					closeModal={() => {
						handleChange("show")(false);
						handleChange("selectedData")(null);
					}}
				/>
			</CustomModal>
		</div>
	);
}
