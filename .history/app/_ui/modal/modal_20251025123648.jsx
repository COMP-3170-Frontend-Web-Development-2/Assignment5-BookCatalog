import React, { useRef } from "react";
import styles from "../_ui/modal/modal.module.css";

function Modal({ buttontitle, buttonstyle, children }) {
    const modalRef = useRef();

    function handleClick() {
        modalRef.current.showModal();
    }

    return (
        <>
            <button
                className={style.buttonstyle}
                onClick={handleClick}>
                {buttontitle}
            </button>
            <dialog ref={modalRef}>
                {typeof children === "function"
                    ? children(() => modalRef.current.close())
                    : children}
            </dialog>
        </>
    );
}

export default Modal;
