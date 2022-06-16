import React from "react";
import Header from "../header/header";
import styles from './mainLayout.module.scss'
interface MainLayoutProps {
	children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className={styles.container}>
			<Header />
			{children}
		</div>
	);
}
