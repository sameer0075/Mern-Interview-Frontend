import Login from "../Components/Auth/login";
import OtpVerification from "../Components/Auth/otp-verification";
import Register from "../Components/Auth/register";
import Cars from "../Components/Cars";
import Category from "../Components/Categories";
import Dashboard from "../Components/Dashboard";

export const PublicRoutes = [
	{
		path: "/",
		component: <Login />,
	},
	{
		path: "/register",
		component: <Register />,
	},
	{
		path: "/verify-otp",
		component: <OtpVerification />,
	},
];

export const PrivateRoutes = [
	{
		path: "/dashboard",
		component: <Dashboard />,
	},
	{
		path: "/categories",
		component: <Category />,
	},
	{
		path: "/cars",
		component: <Cars />,
	},
];
