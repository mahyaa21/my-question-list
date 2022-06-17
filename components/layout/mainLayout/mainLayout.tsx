import React from "react";
import { useDispatch } from "react-redux";
import CreateNewQuestionModal from "../../createNewQuestion/createNewQuestionModal";
import { MODAL_KEY_MAP } from "../../../store/constants";
import { openModal, closeModal } from "../../../store/modals/action";
import Header from "../header/header";
import styles from "./mainLayout.module.scss";
interface MainLayoutProps {
	children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
	const dispatch = useDispatch<any>();
	function openCreateQuestionModal() {
		dispatch(openModal(MODAL_KEY_MAP.CREATE_NEW_QUESTION, { type: "CREATE" }));
	}
	function closeCreateQuestionModal() {
		dispatch(closeModal(MODAL_KEY_MAP.CREATE_NEW_QUESTION));
	}
	return (
		<div className={styles.container}>
			<Header createNewQuestionModal={openCreateQuestionModal}/>
			<div className={styles.childrenWrapper}>{children}</div>
			<CreateNewQuestionModal/>
		</div>
	);
}
