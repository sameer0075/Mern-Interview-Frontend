import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Field, Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { url } from "../../redux/url";
import { registerSchema } from "../../Schema";
import AuthPage from "./index";

export default function Register() {
	const handleSubmit = (values: any) => {
		axios
			.post(`${url}/users`, values)
			.then((response: any) => {
				let token = response.data.token;
				toast.info("User Created successfully");
			})
			.catch((err: any) => {
				console.log(err);
				toast.error("Invalid Credentials");
			});
	};
	return (
		<AuthPage title="Sign Up">
			<Formik
				initialValues={{
					name: "",
					email: "",
					phone: "",
					password: "",
				}}
				validationSchema={registerSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Field name="name">
							{({ field }: any) => <TextField label="Name" {...field} />}
						</Field>
						<ErrorMsg name="name" />

						<div style={{ padding: 5 }}></div>

						<Field name="email">
							{({ field }: any) => <TextField label="Email" {...field} />}
						</Field>
						<ErrorMsg name="email" />

						<div style={{ padding: 5 }}></div>

						<Field name="phone">
							{({ field }: any) => <TextField label="Phone" {...field} />}
						</Field>
						<ErrorMsg name="phone" />
						<div style={{ padding: 5 }}></div>

						<Field name="password">
							{({ field }: any) => <TextField label="Password" {...field} />}
						</Field>
						<ErrorMsg name="password" />
						<div style={{ padding: 5 }}></div>

						<Button
							variant="contained"
							color="primary"
							size="large"
							fullWidth
							sx={{ mt: 2 }}
							// onClick={handleSubmit}
						>
							Submit
						</Button>
					</form>
				)}
			</Formik>
			<Link style={{ color: "#1565C0" }} to="/">
				Already have an account?
			</Link>
		</AuthPage>
	);
}
