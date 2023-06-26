import { Box, TextField, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Field, Formik,useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMsg } from "../../Partials/ErrorMsg";
import { ResendOtpUserInterface } from "../../redux/interfaces/Users";
import { ResendOtp, VerifyOtp } from "../../redux/Slices/usersSlice";
import { otpVerificationSchema } from "../../Schema";
import AuthPage from "./index";

interface OtpVerificationProps {
	email?: string | any;
}

export default function OtpVerification({ email }: OtpVerificationProps) {
	const dispatch: any = useDispatch();
	const navigation = useNavigate()


	const handleSubmit = (values: any) => {
		dispatch(VerifyOtp(values)).then((response:any)=>{
			if(!response.payload.error) {
				navigation("/")
			}
		}).catch(()=>{

		});
	};

	const resendOtp = () => {
		let obj:ResendOtpUserInterface = {
			email
		}
		dispatch(ResendOtp(obj));
	}

	function renderForm() {
		return (
			<>
				<Formik
					initialValues={{
						email: email ? email : "",
						otp: "",
					}}
					validationSchema={otpVerificationSchema}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							{!email && (
								<>
									<Field name="email">
										{({ field }: any) => <TextField label="Email" {...field} />}
									</Field>
									<ErrorMsg name="email" />
								</>
							)}

							<div style={{ padding: 5 }}></div>

							<Field name="otp">
								{({ field }: any) => <TextField label="Otp" {...field} />}
							</Field>
							<ErrorMsg name="otp" />
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
			</>
		);
	}
	return !email ? (
		<AuthPage title="Enter Otp">{renderForm()}</AuthPage>
	) : (
		<div>{renderForm()}</div>
	);
}
