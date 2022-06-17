import React, { useEffect, useState } from "react";
import styles from "./createNewQuestion.module.scss";
import { ButtonWrapper, InputWrapper, TextAreaWrapper } from "../widgets";
interface CreateNewQuestionProps {
	onClose: () => void;
}
const CreateNewQuestion = ({ onClose }: CreateNewQuestionProps) => {
	const [questionTitle, setQuestionTitle] = useState<string>();
	const [questionDescription, setQuestionDescription] = useState<string>();
	return (
		<div className={styles.createNewQuestionContainer}>
			<div className={styles.createNewQuestionHeader}>ایجاد سوال جدید</div>
			<div className={styles.createNewQuestionContentWrapper}>
				<InputWrapper
					label={"موضوع"}
					value={questionTitle}
					onChange={(e) => setQuestionTitle(e.target.value)}
					className={styles.newQuestionTitle}
				/>
				<TextAreaWrapper
					label="متن سوال"
					value={questionDescription}
					onChange={(e) => setQuestionDescription(e.target.value)}
					minimumRows={8}
				/>
			</div>
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
