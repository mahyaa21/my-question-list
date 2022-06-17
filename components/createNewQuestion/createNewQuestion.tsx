import React, { useEffect, useState } from "react";
import momentJalaali from "moment-jalaali";
import { createQuestion, getAllQuestions } from "../../store/questions/action";
import styles from "./createNewQuestion.module.scss";
import { ButtonWrapper, InputWrapper, TextAreaWrapper } from "../widgets";
import { useDispatch } from "react-redux";
import { QuestionInterface } from "../../interfaces/question.interface";
interface CreateNewQuestionProps {
	onClose: () => void;
}
momentJalaali.loadPersian({ dialect: "persian-modern" });
const CreateNewQuestion = ({ onClose }: CreateNewQuestionProps) => {
	const [questionTitle, setQuestionTitle] = useState<string>();
	const [questionDescription, setQuestionDescription] = useState<string>();
	const dispatch = useDispatch<any>();
	const submitQuestion = () => {
		const NEW_QUESTION: QuestionInterface = {
			id: `${Date.now()}`,
			title: questionTitle || "",
			description: questionDescription || "",
			hour: momentJalaali(Date.now()).format("HH:mm"),
			date: momentJalaali(Date.now()).format("jYYYY/jM/jD"),
			avatar: "",
		};
		dispatch(createQuestion(NEW_QUESTION));
		dispatch(getAllQuestions());
		onClose();
	};
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
					onClick={submitQuestion}
					appearance="primary"
				>
					ایجاد سوال
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default CreateNewQuestion;
