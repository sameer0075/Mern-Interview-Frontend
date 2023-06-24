// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Text } from "../Text";

export const Footer: FC = (): ReactElement => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "auto",
				backgroundColor: "#1565C0",
				paddingTop: "1rem",
				paddingBottom: "1rem",
				position: "absolute",
				bottom: 0,
			}}
		>
			<Container maxWidth="lg">
				<Grid container direction="column" alignItems="center">
					<Grid item xs={12}>
						<Text color="white" variant="h5" title="Mern Task" />
					</Grid>
					<Grid item xs={12}>
						<Text
							color="white"
							variant="subtitle1"
							title={`${new Date().getFullYear()} | React | Mern | Task`}
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Footer;
