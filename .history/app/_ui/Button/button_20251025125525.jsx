import styles from "./button.module.css";

function Button({ children, label, onClick, variant, size }) {
    return (
        <button
            className={`${styles.button} ${styles[`button--${variant}`]} ${
                styles[`button--${size}`]
            }`}
            onClick={onClick}>
            {label || children}
        </button>
    );
}

export default Button;
