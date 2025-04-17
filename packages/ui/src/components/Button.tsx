import React from "react";
import clsx from "clsx";

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-black hover:bg-gray-500",
  error: "bg-red-500 text-white hover:bg-red-700",
} as const;

type Variant = keyof typeof variantStyles;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
};

export const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded cursor-pointer transition-colors duration-200";

  return (
    <button
      type={type}
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
