import { Box, TextField, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AuthPage from "./index";

export default function Login() {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};
	return (
		<AuthPage title="Sign In">
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
					Sign In
				</Button>
			</Box>
			<Link style={{ color: "#1565C0" }} to="/register">
				Dont have an account?
			</Link>
		</AuthPage>
	);
}
