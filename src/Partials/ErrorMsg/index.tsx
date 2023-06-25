import { ErrorMessage } from "formik";

interface ErrorMsgProps {
	name: string;
}

export function ErrorMsg({ name }: ErrorMsgProps) {
	return (
		<ErrorMessage name={name} component="div">
			{(msg) => <div style={{ color: "red" }}>{msg}</div>}
		</ErrorMessage>
	);
}
