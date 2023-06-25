import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBoundary from "../../Partials/ErrorBoundary";
import { CustomModal } from "../../Partials/Modal";

import CustomTable from "../../Partials/Table";
import { CategoryList, DeleteCategory } from "../../redux/Slices/categorySlice";
import AddCategory from "./add-category";

export default function Category() {
	const [data, setData] = useState({ show: false, selectedData: null });
	const dispatch: any = useDispatch();
	const categories = useSelector((state: any) => state.category.categories);
	const isLoading = useSelector((state: any) => state.category.isLoading);

	useEffect(() => {
		dispatch(CategoryList("?page=1&limit=10"));
	}, []);

	const handlePageChange = (param: any) => {
		dispatch(CategoryList(param));
	};

	const handleChange = (name: string) => (value: any) => {
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDelete = (id: number) => {
		dispatch(DeleteCategory({ id }));
	};

	return (
		<ErrorBoundary>
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
				data={categories}
				columns={["id", "name", "description", "action"]}
				apiCall={handlePageChange}
				handleDelete={handleDelete}
				handleSelection={handleChange}
			/>
			<CustomModal
				show={data.show}
				title="Add Category"
				closeModal={() => handleChange("show")(false)}
			>
				<AddCategory
					selectedData={data.selectedData}
					closeModal={() => {
						handleChange("show")(false);
						handleChange("selectedData")(null);
					}}
				/>
			</CustomModal>
		</div>
		</ErrorBoundary>
	);
}
