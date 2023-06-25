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
	align?: any;
	id?: string;
	onClick?: () => void;
}

export function Text({
	title,
	className,
	id,
	textAlign,
	variant = "h3",
	noWrap,
	component,
	sx,
	color,
	gutterBottom,
	align,
	onClick,
}: TextProps) {
	return (
		<Typography
			onClick={onClick}
			noWrap={noWrap}
			textAlign={textAlign}
			component={component}
			sx={sx}
			id={id}
			align={align}
			className={className}
			variant={variant}
			color={color}
			gutterBottom={gutterBottom}
		>
			{title}
		</Typography>
	);
}
