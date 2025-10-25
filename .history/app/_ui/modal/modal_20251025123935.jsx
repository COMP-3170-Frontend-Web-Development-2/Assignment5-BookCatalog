import React, { useRef } from "react";
import style from "./modal.module.css";

/**
 * Props:
 * - buttontitle: string (label do botão)
 * - variant: "add" | "edit"  -> escolhe o estilo do botão
 * - disabled?: boolean        -> desabilita o trigger (estilo + bloqueia clique)
 * - children: render-prop ou nó (mesmo que você já usa)
 */
function Modal({ buttontitle, variant = "add", disabled = false, children }) {
    const modalRef = useRef();

    function handleClick() {
        if (disabled) return;
        modalRef.current?.showModal();
    }

    const variantClass =
        variant === "edit"
            ? style["buttonstyle--edit"]
            : style["buttonstyle--add"];

    return (
        <>
            <button
                type='button'
                aria-label={buttontitle}
                className={`${style.buttonstyle} ${variantClass}`}
                onClick={handleClick}
                disabled={disabled}>
                {buttontitle}
            </button>

            <dialog ref={modalRef}>
                {typeof children === "function"
                    ? children(() => modalRef.current?.close())
                    : children}
            </dialog>
        </>
    );
}

export default Modal;
