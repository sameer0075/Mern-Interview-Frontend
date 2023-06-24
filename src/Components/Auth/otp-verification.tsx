import { Box, TextField, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AuthPage from "./index";

export default function OtpVerification() {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
	};
	return (
		<AuthPage title="Enter Otp">
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="code"
					label="Code"
					type="text"
					id="code"
					autoComplete="Code"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</Button>
			</Box>
			<Link style={{ color: "#1565C0" }} to="/">
				Back to login?
			</Link>
		</AuthPage>
	);
}
