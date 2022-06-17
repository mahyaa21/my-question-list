import React, { useEffect } from "react";
import styles from "./createNewQuestion.module.scss";
import { ButtonWrapper } from "../widgets";
interface CreateNewQuestionProps {
	onClose: () => void;
}
const CreateNewQuestion = ({ onClose }: CreateNewQuestionProps) => {
	return (
		<div className={styles.createNewQuestionContainer}>
			<div className={styles.createNewQuestionHeader}>ایجاد سوال جدید</div>
			<div className={styles.createNewQuestionFooter}>
				<ButtonWrapper onClick={onClose} appearance="link">
					انصراف
				</ButtonWrapper>
				<ButtonWrapper
					className={styles.createNewQuestionButton}
					onClick={() => console.log("hi")}
					appearance="primary"
				>
					ایجاد سوال
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default CreateNewQuestion;
