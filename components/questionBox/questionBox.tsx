import React, { useEffect, useState } from "react";
import styles from "./questionBox.module.scss";
import { QuestionInterface } from "../../interfaces/question.interface";
import Discussion from "../../static/icon/discussion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { AnswerInterface } from "../../interfaces/answer.interface";
import { getAllAnswers } from "../../store/answers/action";
import { BoxButtonInterface } from "../../interfaces/box.interface";
import { useRouter } from "next/router";
import { ButtonWrapper } from "../widgets";
import Box from "../box/box";
interface QuestionBoxInterface {
	question: QuestionInterface;
}

const QuestionBox = ({ question }: QuestionBoxInterface) => {
	const [answerNumber, setAnswerNumber] = useState<number>(0);
	const dispatch = useDispatch<any>();
	const answers = useSelector(
		({ answers }: RootState) => answers?.data.list
	) as Array<AnswerInterface>;
	const router = useRouter();
	const gotoQuestionDetail = () =>
		router.push(`/myQuestionDetail/${question.id}`);
	const BOX_HEADER_SCHEMA = [
		{
			icon: <Discussion />,
			value: answerNumber,
		},
	];

	const BOX_BUTTON_SCHEMA: Array<any> = [
		<ButtonWrapper
			onClick={gotoQuestionDetail}
			appearance="subtle"
			className={styles.seeDetailButton}
		>
			مشاهده جزییات
		</ButtonWrapper>,
	];
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
			<Box
				title={question.title}
				description={question.description}
				time={question.hour}
				date={question.date}
				headerDetail={BOX_HEADER_SCHEMA}
				Buttons={BOX_BUTTON_SCHEMA}
			/>
		</div>
	);
};

export default QuestionBox;
