import { Box, TextField, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AuthPage from "./index";

export default function Register() {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};
	return (
		<AuthPage title="Sign Up">
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="name"
					label="Full Name"
					name="name"
					autoComplete="name"
					autoFocus
				/>
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
					id="phone"
					label="Phone Number"
					name="phone"
					autoComplete="phone"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>
			</Box>
			<Link style={{ color: "#1565C0" }} to="/">
				Already have an account?
			</Link>
		</AuthPage>
	);
}
