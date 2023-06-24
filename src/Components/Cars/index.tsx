import CustomTable from "../../Partials/Table";

export default function Cars() {
	return (
		<div>
			<CustomTable
				data={[]}
				columns={["id", "name", "make", "color", "model", "action"]}
			/>
		</div>
	);
}
