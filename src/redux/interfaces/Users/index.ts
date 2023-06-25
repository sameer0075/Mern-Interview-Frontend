export interface UsersListInterface {
	id: number;
	name: string;
	email: string;
	is_active: boolean;
	phone: string;
	token: string;
	is_super_user: string;
}

export interface AddUserInterface {
	name: string;
	email: string;
	phone: string;
	password: string;
	id?: string;
}

export interface LoginUserInterface {
	email: string;
	password: string;
}

export interface OtpUserInterface {
	email: string;
	otp: string;
}
