import React, { useEffect, useState } from "react";
import styles from "./questionBox.module.scss";
import { QuestionInterface } from "../../interfaces/questionInterface";
import Discussion from "../../static/icon/discussion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { AnswerInterface } from "../../interfaces/answerInterface";
import { getAllAnswers } from "../../store/answers/action";
import { ButtonWrapper } from "../widgets";
interface QuestionBoxInterface {
	question: QuestionInterface;
}
const QuestionBox = ({ question }: QuestionBoxInterface) => {
	const [answerNumber, setAnswerNumber] = useState<number>(0);
	const dispatch = useDispatch<any>();
	const answers = useSelector(
		({ answers }: RootState) => answers?.data.list
	) as Array<AnswerInterface>;
	useEffect(() => {
		if (answers.length) {
			let initialAnswerNumber = answers.filter(
				(answer) => answer.questionId === question.id
			).length;
			setAnswerNumber(initialAnswerNumber);
		} else {
			dispatch(getAllAnswers());
		}
	}, [question.id, answers.length]);
	return (
		<div className={styles.QuestionBoxContainer}>
			<div className={styles.QuestionBoxHeader}>
				<div className={styles.QuestionBoxHeaderContent}>
					<img src="../../static/images/avatar2.png" />
					<span className={styles.QuestionBoxHeaderTitle}>
						{question.title}
					</span>
				</div>
				<div className={styles.QuestionBoxHeaderDetail}>
					<div className={styles.QuestionBoxHeaderDetailTime}>
						<span>ساعت :</span>
						<span className={styles.QuestionBoxHeaderDetailValue}>
							{question.hour}
						</span>
					</div>
					<div className={styles.QuestionBoxHeaderDetailDate}>
						<span>تاریخ :</span>
						<span className={styles.QuestionBoxHeaderDetailValue}>
							{question.date}
						</span>
					</div>
					<div className={styles.QuestionBoxHeaderDetailDiscussion}>
						<Discussion />
						<span>{answerNumber}</span>
					</div>
				</div>
			</div>
			<div className={styles.QuestionBoxContent}>
				<div className={styles.QuestionBoxDesc}>{question.description}</div>
				<ButtonWrapper
					onClick={() => console.log("hi")}
					appearance="subtle"
					className={styles.seeDetailButton}
				>
					مشاهده جزییات
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default QuestionBox;
