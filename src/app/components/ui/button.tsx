import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${props.className}`}
    >
      {children}
    </button>
  );
};
