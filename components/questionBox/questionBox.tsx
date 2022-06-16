import React, { useEffect, useState } from "react";
import styles from "./questionBox.module.scss";
import { QuestionInterface } from "../../interfaces/questionInterface";
import Discussion from "../../static/icon/discussion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { AnswerInterface } from "../../interfaces/answerInterface";
import { getAllAnswers } from "../../store/answers/action";
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
				<div>
					<img src="../../static/images/avatar2.png" />
					<div>{question.title}</div>
				</div>
				<div>
					<div>
						<span>ساعت :</span>
						<span>{question.hour}</span>
					</div>
					<div>
						<span>تاریخ :</span>
						<span>{question.date}</span>
					</div>
					<div>
						<Discussion />
						<span>{answerNumber}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionBox;
