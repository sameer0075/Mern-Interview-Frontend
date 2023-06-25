import { TextField, Button, Box } from "@mui/material";
import { Field, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { Text } from "../../Partials/Text";
import { CategoryListInterface } from "../../redux/interfaces/Categories";
import {
	AddNewCategory,
	UpdateCategory,
} from "../../redux/Slices/categorySlice";
import { addCategorySchema } from "../../Schema";

interface AddNewCategoryInterface {
	closeModal: () => void;
	selectedData?: CategoryListInterface | null;
}

export default function AddCategory({
	closeModal,
	selectedData,
}: AddNewCategoryInterface) {
	console.log("selectedData", selectedData);
	const dispatch: any = useDispatch();
	const categories = useSelector((state: any) => state.category.categories);
	const isLoading = useSelector((state: any) => state.category.isLoading);
	const formik = useFormik({
		initialValues: {
			name: selectedData ? selectedData.name : "",
			description: selectedData ? selectedData.description : "",
		},
		validationSchema: addCategorySchema,
		onSubmit: (values) => {},
	});

	const handleSubmit = (values: any) => {
		if (selectedData) {
			Object.assign(values, { id: selectedData.id });
			dispatch(UpdateCategory(values))
				.then(() => {
					closeModal();
				})
				.catch(() => {});
		} else {
			dispatch(AddNewCategory(values))
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
				}}
				validationSchema={addCategorySchema}
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
								title="Add Category"
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
