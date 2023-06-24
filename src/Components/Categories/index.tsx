import CustomTable from "../../Partials/Table";

export default function Category() {
	return (
		<div>
			<CustomTable
				data={[]}
				columns={["id", "name", "description", "action"]}
			/>
		</div>
	);
}
