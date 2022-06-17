import React, { useEffect } from "react";
import styles from "./createNewQuestion.module.scss";
import { ButtonWrapper } from "../widgets";
interface CreateNewQuestionProps {
	onClose: () => void;
}
const CreateNewQuestion = ({ onClose }: CreateNewQuestionProps) => {
	return (
		<div className={styles.QuestionListContainer}>
			<ButtonWrapper onClick={()=>console.log('hi')} appearance="primary">ایجاد سوال</ButtonWrapper>
			<ButtonWrapper onClick={onClose} appearance="link">انصراف</ButtonWrapper>
		</div>
	);
};

export default CreateNewQuestion;
