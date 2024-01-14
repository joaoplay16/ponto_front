import React, { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`rounded-sm bg-slate-700 px-3 py-1 text-slate-100 hover:shadow-md ${className}`}
      {...props}>
      {children}
    </button>
  )
}

export default Button
