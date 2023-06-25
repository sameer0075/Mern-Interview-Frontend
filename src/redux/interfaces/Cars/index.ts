export interface CarsListInterface {
	id: number;
	name: string;
	description: string;
	color: string;
	model: string;
	make: string;
	registration_no: string;
	category_id: any;
}

export interface AddCarInterface {
	name: string;
	color: string;
	make: string;
	registration_no: string;
	model: string;
	category_id: string;
	description?: string;
	id?: number;
}
