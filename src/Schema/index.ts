import * as Yup from "yup";

export const addCategorySchema = Yup.object({
	name: Yup.string().required("Name is required"),
	description: Yup.string().required("Description is required"),
});

export const addCarSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	description: Yup.string(),
	make: Yup.string().required("Make is required"),
	model: Yup.string().required("Model is required"),
	color: Yup.string().required("Color is required"),
	category_id: Yup.string().required("Category is required"),
	registration_no: Yup.string().required("Registration No is required"),
});

export const loginSchema = Yup.object({
	email: Yup.string().required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	email: Yup.string().required("Email is required"),
	phone: Yup.string().required("Phone is required"),
	password: Yup.string().required("Password is required"),
});

export const otpVerificationSchema = Yup.object({
	email: Yup.string().required("Email is required"),
	otp: Yup.string().required("Otp is required"),
});
