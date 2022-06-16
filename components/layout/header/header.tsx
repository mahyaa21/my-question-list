import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import { HEADER_TITLE } from "./headerTitle.data";
import { ButtonWrapper } from "../../widgets";
import DropDownArrow from "../../../static/icon/dropDownArrow";
export default function Header() {
	const [title, setTitle] = useState<string>();
	const router = useRouter();
	useEffect(() => {
		setTitle(router.pathname.slice(1, router.pathname.length));
	}, [router.pathname]);
	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerTitle}>
				{title ? HEADER_TITLE[title] : ""}
			</div>
			<div className={styles.headerDetailWrapper}>
				<ButtonWrapper onClick={() => console.log("hi")} appearance="primary">
					+ سوال جدید
				</ButtonWrapper>
				<div className={styles.avatar}>
					<img src="../../../static/images/avatar.png" alt="avatar" />
				</div>
				<div className={styles.userName}>الناز شاکردوست</div>
				<DropDownArrow/>
			</div>
		</div>
	);
}
