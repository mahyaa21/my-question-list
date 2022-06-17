import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import { HEADER_TITLE } from "./headerTitle.data";
import { ButtonWrapper } from "../../widgets";
import Plus from "../../../static/icon/plus";
import DropDownArrow from "../../../static/icon/dropDownArrow";
interface HeaderProps {
	createNewQuestionModal: () => void;
}
export default function Header({ createNewQuestionModal }: HeaderProps) {
	const [title, setTitle] = useState<string>();
	const router = useRouter();
	useEffect(() => {
		setTitle(router.pathname.split("/")[1]);
	}, [router.pathname]);
	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerTitle}>
				{title ? HEADER_TITLE[title] : ""}
			</div>
			<div className={styles.headerDetailWrapper}>
				<ButtonWrapper
					className={styles.newQuestionButton}
					onClick={createNewQuestionModal}
					appearance="primary"
				>
					<Plus />
					<span className={styles.newQuestionButtonText}>سوال جدید</span>
				</ButtonWrapper>
				<div className={styles.avatar}>
					<img src="../../../static/images/avatar.png" alt="avatar" />
				</div>
				<div className={styles.userName}>الناز شاکردوست</div>
				<DropDownArrow />
			</div>
		</div>
	);
}
