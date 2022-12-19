import classNames from "classnames";
import React from "react";
import buttonStyles from "../styles/button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames({
        [buttonStyles.button]: true,
        [buttonStyles.danger]: variant === "danger",
        [buttonStyles.disabled]: disabled,
      })}
      onClick={onClick}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
