import React from "react";
import buttonStyles from "../styles/button.module.scss";

export const Button = ({
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={buttonStyles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
