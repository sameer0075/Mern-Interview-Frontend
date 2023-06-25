import React from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik, useFormik } from "formik";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { Text } from "../../Partials/Text";
import { addCarSchema } from "../../Schema";
import { CategoryList } from "../../redux/Slices/categorySlice";
import { AddNewCar, UpdateCar } from "../../redux/Slices/carsSlice";
import { CarsListInterface } from "../../redux/interfaces/Cars";

interface AddCarInterface {
	closeModal: () => void;
	selectedData?: CarsListInterface | null;
}

export default function AddCar({ closeModal, selectedData }: AddCarInterface) {
	const dispatch: any = useDispatch();
	const categories = useSelector((state: any) => state.category.categories);
	const isLoading = useSelector((state: any) => state.category.isLoading);
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: addCarSchema,
		onSubmit: (values) => {},
	});

	React.useEffect(() => {
		dispatch(CategoryList("?page=1&limit=-1"));
	}, []);

	const handleSubmit = (values: any) => {
		if (selectedData) {
			Object.assign(values, { id: selectedData.id });
			dispatch(UpdateCar(values))
				.then(() => {
					closeModal();
				})
				.catch(() => {});
		} else {
			dispatch(AddNewCar(values))
				.then(() => {
					closeModal();
				})
				.catch(() => {});
		}
	};
	return (
		<Box sx={{ marginTop: 5 }}>
			<Formik
				initialValues={{
					name: selectedData ? selectedData.name : "",
					description: selectedData ? selectedData.description : "",
					color: selectedData ? selectedData.color : "",
					make: selectedData ? selectedData.make : "",
					model: selectedData ? selectedData.model : "",
					category_id: selectedData ? selectedData.category_id?.id : "",
					registration_no: selectedData ? selectedData.registration_no : "",
				}}
				validationSchema={addCarSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="flex"
							flexDirection="column"
							width="300px"
							p={2}
							boxShadow={1}
							borderRadius={4}
							bgcolor="white"
						>
							<Text
								variant="h5"
								align="center"
								gutterBottom={true}
								title="Add Car"
							/>

							<Field name="name">
								{({ field }: any) => <TextField label="Name" {...field} />}
							</Field>
							<ErrorMsg name="name" />

							<div style={{ padding: 5 }}></div>

							<Field name="description">
								{({ field }: any) => (
									<TextField label="Description" {...field} />
								)}
							</Field>
							<ErrorMsg name="description" />
							<div style={{ padding: 5 }}></div>

							<Field name="color">
								{({ field }: any) => <TextField label="Color" {...field} />}
							</Field>
							<ErrorMsg name="color" />
							<div style={{ padding: 5 }}></div>

							<Field name="make">
								{({ field }: any) => <TextField label="Make" {...field} />}
							</Field>
							<ErrorMsg name="make" />
							<div style={{ padding: 5 }}></div>

							<Field name="model">
								{({ field }: any) => <TextField label="Model" {...field} />}
							</Field>
							<ErrorMsg name="model" />
							<div style={{ padding: 5 }}></div>

							<Field name="registration_no">
								{({ field }: any) => (
									<TextField label="Registration No" {...field} />
								)}
							</Field>
							<ErrorMsg name="registration_no" />
							<div style={{ padding: 5 }}></div>

							<Field name="category_id">
								{({ field }: any) => (
									<TextField label="Category" select {...field} fullWidth>
										<MenuItem value="">Select a category</MenuItem>
										{categories.map((category: any) => {
											const isSelected = selectedData
												? category.id === selectedData.category_id.id
												: false; // Replace `savedData.categoryId` with the actual property from `savedData`
											return (
												<MenuItem
													key={category.id}
													value={category.id}
													selected={isSelected}
												>
													{category.name}
												</MenuItem>
											);
										})}
									</TextField>
								)}
							</Field>
							<ErrorMsg name="category_id" />

							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								sx={{ mt: 2 }}
							>
								Submit
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
}
