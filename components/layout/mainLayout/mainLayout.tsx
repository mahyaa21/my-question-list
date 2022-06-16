import React from "react";
import Header from "../header/header";

interface MainLayoutProps {
	children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
