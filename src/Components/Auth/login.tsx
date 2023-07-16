import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./index";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { loginSchema } from "../../Schema";
import { Field, Formik, useFormik } from "formik";
import { LoginUser } from "../../redux/Slices/usersSlice";
import { toast } from "react-toastify";
import { url } from "../../redux/url";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
	const dispatch: any = useDispatch();
	const isLoading = useSelector((state: any) => state.category.isLoading);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {},
	});
	const handleSubmit = (values: any) => {
		axios
			.post(`${url}/users/login`, values)
			.then((response: any) => {
				let token = response.data.token;
				sessionStorage.setItem("token", token);
				toast.info("User Logged in successfully");
				window.location.href = "/dashboard";
			})
			.catch((err: any) => {
				console.log(err);
				toast.error(err?.response?.data?.message || "Invalid Credentials");
			});
	};
	return (
		<AuthPage title="Sign In">
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={loginSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Field name="email">
							{({ field }: any) => <TextField label="Email" {...field} />}
						</Field>
						<ErrorMsg name="email" />

						<div style={{ padding: 5 }}></div>

						<Field name="password">
							{({ field }: any) => <TextField label="Password" {...field} />}
						</Field>
						<ErrorMsg name="password" />
						<div style={{ padding: 5 }}></div>

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
					</form>
				)}
			</Formik>
			<Link style={{ color: "#1565C0",marginTop:'1rem' }} to="/register">
				Don't have an account?
			</Link>
		</AuthPage>
	);
}
