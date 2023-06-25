export interface CategoryListInterface {
	id: number;
	name: string;
	description: string;
}

export interface AddCategoryInterface {
	name: string;
	description: string;
	id?: number;
}
