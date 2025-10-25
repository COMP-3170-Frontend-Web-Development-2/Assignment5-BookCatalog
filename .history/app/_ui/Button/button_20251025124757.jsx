import styles from "./Button.module.css";

function Button({ type, isDisabled = false, icon, size, value, onClick }) {
    const classes = [
        styles.button,
        size === "small" && styles.small,
        size === "large" && styles.large,
        type === "primary" && styles.primary,
        type === "secondary" && styles.secondary,
        type === "terciary" && styles.terciary,
        type === "warning" && styles.error,
        isDisabled && styles.disabled,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <input
            className={classes}
            type='button'
            value={value}
            onClick={onClick}
            disabled={isDisabled} // <- bloqueia o clique
            aria-disabled={isDisabled} // <- acessibilidade
        />
    );
}

export default Button;
