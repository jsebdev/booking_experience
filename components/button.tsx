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
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames({
        [buttonStyles.button]: true,
        [buttonStyles.danger]: variant === "danger",
      })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
