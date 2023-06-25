// import Modal from "react-modal";
import { Text } from "../Text";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
	show: boolean;
	title: string;
	closeModal: () => void;
	children: React.ReactNode;
}

export function CustomModal({ show, title, children, closeModal }: ModalProps) {
	const contentStyle = {
		position: "relative",
	};

	const closeIconStyle = {
		position: "absolute",
		top: 50,
		right: 8,
	};

	const modalStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	return (
		<Modal
			open={show}
			onClose={closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			style={modalStyle}
		>
			<Box sx={contentStyle}>
				<IconButton sx={closeIconStyle} onClick={closeModal} aria-label="Close">
					<CloseIcon />
				</IconButton>

				{children}
			</Box>
		</Modal>
	);
}
