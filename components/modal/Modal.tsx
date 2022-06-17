import React from "react";
import classes from "classnames";
import style from "./Modal.module.scss";
import { ButtonWrapper } from "../widgets";

interface ModalInterface {
	handleClose: () => void;
	show: boolean;
	children: any;
}
function Modal({ handleClose, show, children }: ModalInterface) {
	const showHideClassName = show ? style.displayBlock : style.displayNone;
	const stopPropagation = (e: any) => {
		e.stopPropagation();
	};
	return (
		<div
			className={classes(style.modal, showHideClassName, "modal")}
			onClick={handleClose}
		>
			<section className={style.modalMain} onClick={stopPropagation}>
				<ButtonWrapper
					appearance="subtle"
					onClick={handleClose}
					className={style.closeButton}
				>
					<span className="icon-Exit" />
				</ButtonWrapper>
				{children}
			</section>
		</div>
	);
}

export default Modal;
