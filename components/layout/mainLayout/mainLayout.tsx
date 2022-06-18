import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewQuestionModal from "../../createNewQuestion/createNewQuestionModal";
import { MODAL_KEY_MAP } from "../../../store/constants";
import { openModal } from "../../../store/modals/action";
import { RootState } from "../../../store/rootReducer";
import { AuthStoreInterface } from "../../../interfaces/auth.interface";
import Header from "../header/header";
import styles from "./mainLayout.module.scss";
import { getAuthenticatedUser } from "../../../store/auth/action";
interface MainLayoutProps {
	children: any;
}

export default function MainLayout({ children }: MainLayoutProps) {
	const dispatch = useDispatch<any>();
	const { fullName } = useSelector(
		({ auth }: RootState) => auth?.data.user
	) as AuthStoreInterface;
	useEffect(() => {
		dispatch(getAuthenticatedUser());
	}, []);
	function openCreateQuestionModal() {
		dispatch(openModal(MODAL_KEY_MAP.CREATE_NEW_QUESTION, { type: "CREATE" }));
	}
	return (
		<div className={styles.container}>
			<Header
				createNewQuestionModal={openCreateQuestionModal}
				userName={fullName}
			/>
			<div className={styles.childrenWrapper}>{children}</div>
			<CreateNewQuestionModal />
		</div>
	);
}
