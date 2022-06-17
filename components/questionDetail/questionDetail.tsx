import React, { useMemo, useState } from "react";
import momentJalaali from "moment-jalaali";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./questionDetail.module.scss";
import {
	createAnswer,
	getAllAnswers,
	updateAnswer,
} from "../../store/answers/action";
import { RootState } from "../../store/rootReducer";
import { AnswerInterface } from "../../interfaces/answer.interface";
import Box from "../box/box";
import { ButtonWrapper, TextAreaWrapper } from "../widgets";
import { QuestionInterface } from "../../interfaces/question.interface";
import { getAllQuestions } from "../../store/questions/action";
import Discussion from "../../static/icon/discussion";
import Happy from "../../static/icon/happy";
import Sad from "../../static/icon/sad";
import {
	HeaderDetailInterface,
	BoxButtonInterface,
} from "../../interfaces/box.interface";
momentJalaali.loadPersian({ dialect: "persian-modern" });
const QuestionDetail = () => {
	const [newAnswer, setNewAnswer] = useState<string>();
	const router = useRouter();
	const questionId = router.query.id;
	const dispatch = useDispatch<any>();
	const AllAnswers = useSelector(
		({ answers }: RootState) => answers?.data.list
	) as Array<AnswerInterface>;
	const AllQuestions = useSelector(
		({ questions }: RootState) => questions.data.list
	) as Array<QuestionInterface>;
	const answers = useMemo(() => {
		if (AllAnswers.length) {
			return AllAnswers.filter((answer) => answer.questionId === questionId);
		} else {
			dispatch(getAllAnswers());
			return null;
		}
	}, [questionId, AllAnswers.length, AllAnswers]);

	const question = useMemo(() => {
		if (AllQuestions.length) {
			return AllQuestions.find((question) => questionId === question.id);
		} else {
			dispatch(getAllQuestions());
			return null;
		}
	}, [questionId, AllQuestions.length]);
	const getQuestionHeader = () => [
		{
			icon: <Discussion />,
			value: answers?.length || 0,
		},
	];
	const getAnswerHeader = (
		positive: number,
		negative: number
	): Array<HeaderDetailInterface> => [
		{
			icon: <Happy />,
			value: positive,
		},
		{
			icon: <Sad />,
			value: negative,
		},
	];
	const getAnswerButtons = (answer: AnswerInterface): Array<any> => [
		<ButtonWrapper
			appearance="subtle"
			className={styles.positiveFeedback}
			onClick={() => addFeedBack(answer, "positive")}
		>
			<Happy />
			<span>پاسخ خوب بود</span>
		</ButtonWrapper>,
		<ButtonWrapper
			appearance="subtle"
			className={styles.negativeFeedback}
			onClick={() => addFeedBack(answer, "negative")}
		>
			<Sad />
			<span>پاسخ خوب نبود</span>
		</ButtonWrapper>,
	];
	const addFeedBack = (
		answer: AnswerInterface,
		type: "positive" | "negative"
	) => {
		const UPDATED_ANSWER = {
			...answer,
			positiveFeedback:
				type === "positive"
					? answer.positiveFeedback + 1
					: answer.positiveFeedback,
			negativeFeedback:
				type === "negative"
					? answer.negativeFeedback + 1
					: answer.negativeFeedback,
		};
		dispatch(updateAnswer(UPDATED_ANSWER));
		dispatch(getAllAnswers());
	};
	const submitAnswer = () => {
		const ANSWER: AnswerInterface = {
			id: `${Date.now()}`,
			questionId: `${questionId}`,
			name: "علی کیا",
			description: newAnswer || "",
			avatar: "",
			hour: momentJalaali(Date.now()).format("HH:mm"),
			date: momentJalaali(Date.now()).format("jYYYY/jM/jD"),
			positiveFeedback: 0,
			negativeFeedback: 0,
		};
		dispatch(createAnswer(ANSWER));
		dispatch(getAllAnswers());
	};
	return (
		<div className={styles.questionDetailContainer}>
			<div>
				{question && (
					<Box
						title={question?.title}
						description={question?.description}
						time={question?.hour}
						date={question.date}
						headerDetail={getQuestionHeader()}
					/>
				)}
			</div>
			<div className={styles.answersContainer}>
				<div className={styles.questionDetailTitle}>پاسخ‌ها</div>
				{answers?.map((answer: AnswerInterface) => (
					<Box
						title={answer.name}
						description={answer?.description}
						time={answer?.hour}
						date={answer.date}
						headerDetail={getAnswerHeader(
							answer.positiveFeedback,
							answer.negativeFeedback
						)}
						Buttons={getAnswerButtons(answer)}
					/>
				))}
			</div>
			<div className={styles.createNewAnswer}>
				<div className={styles.questionDetailTitle}>پاسخ خود را ثبت کنید</div>
				<div className={styles.questionDetailTextArea}>
					<TextAreaWrapper
						label="پاسخ خود را بنویسید"
						value={newAnswer}
						onChange={(e) => setNewAnswer(e.target.value)}
						minimumRows={8}
					/>
				</div>
				<ButtonWrapper onClick={submitAnswer} appearance="primary">
					ارسال پاسخ
				</ButtonWrapper>
			</div>
		</div>
	);
};

export default QuestionDetail;
