import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Field, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { url } from "../../redux/url";
import { registerSchema } from "../../Schema";
import AuthPage from "./index";
import OtpVerification from "./otp-verification";

export default function Register() {
	const [data,setData] = useState({
		showOtp:false,
		email:null
	})
	const handleChange = (name:string) => (value:any) => {
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}
	const handleSubmit = (values: any) => {
		axios
			.post(`${url}/users`, values)
			.then((response: any) => {
				let token = response.data.token;
				handleChange("showOtp")(true)
				handleChange("email")(values.email)
				toast.info("User Created successfully");
			})
			.catch((err: any) => {
				console.log(err);
				handleChange("showOtp")(false)
				handleChange("email")(null)
				toast.error("Invalid Credentials");
			});
	};
	return (
		<AuthPage title="Sign Up">
			{!data.showOtp && <Formik
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
							type="submit"
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
			</Formik>}
			{
				data.showOtp && <OtpVerification email={data.email} />
			}
			<Link style={{ color: "#1565C0" }} to="/">
				Already have an account?
			</Link>
		</AuthPage>
	);
}
