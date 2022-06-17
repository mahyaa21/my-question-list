import React from "react";
import styles from "./box.module.scss";
import { ButtonWrapper } from "../widgets";
import { BoxInterface } from '../../interfaces/box.interface';

const Box = ({
	avatar,
	title,
	time,
	date,
	description,
	headerDetail,
	image,
	Buttons,
}: BoxInterface) => {
	return (
		<div className={styles.BoxContainer}>
			<div className={styles.BoxHeader}>
				<div className={styles.BoxHeaderContent}>
					<img src="../../static/images/avatar2.png" />
					<span className={styles.BoxHeaderTitle}>{title}</span>
				</div>
				<div className={styles.BoxHeaderDetail}>
					<div className={styles.BoxHeaderDetailTime}>
						<span>ساعت :</span>
						<span className={styles.BoxHeaderDetailValue}>{time}</span>
					</div>
					<div className={styles.BoxHeaderDetailDate}>
						<span>تاریخ :</span>
						<span className={styles.BoxHeaderDetailValue}>{date}</span>
					</div>
					{headerDetail.map((item) => {
						return (
							<div className={styles.BoxHeaderDetailDiscussion}>
								{item.icon}
								<span>{item.value}</span>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.BoxContent}>
				<div className={styles.BoxDesc}>{description}</div>
				{Buttons?.length &&
					Buttons.map((button) => {
						return (
							<ButtonWrapper
								onClick={button.onClick}
								appearance={button.appearance}
								className={styles.seeDetailButton}
							>
								{button.children}
							</ButtonWrapper>
						);
					})}
			</div>
		</div>
	);
};

export default Box;
