import { Typography } from "@mui/material";
import React from "react";

interface TextProps {
	title: string;
	className?: string;
	textAlign?: "inherit" | "left" | "center" | "right" | "justify";
	variant?: any;
	noWrap?: boolean;
	component?: any;
	sx?: any;
	color?: string;
	gutterBottom?: boolean;
	onClick?: () => void;
}

export function Text({
	title,
	className,
	textAlign,
	variant = "h3",
	noWrap,
	component,
	sx,
	color,
	gutterBottom,
	onClick,
}: TextProps) {
	return (
		<Typography
			onClick={onClick}
			noWrap={noWrap}
			textAlign={textAlign}
			component={component}
			sx={sx}
			className={className}
			variant={variant}
			color={color}
			gutterBottom={gutterBottom}
		>
			{title}
		</Typography>
	);
}
