import { forwardRef } from "react";

export const Button = forwardRef(function Button(
  {
    children,
    type = "button",
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    className = "",
    icon: Icon,
    iconPosition = "left",
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-sm tracking-wider uppercase",
    md: "text-sm px-5 py-2.5 rounded-sm tracking-wide",
    lg: "text-base px-7 py-3 rounded-sm tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300 shadow-sm",
    outline:
      "bg-transparent text-blue-700 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300",
    accent:
      "bg-amber-500 text-slate-950 hover:bg-amber-400 focus:ring-amber-400 font-semibold shadow-sm hover:shadow",
    amber:
      "bg-amber-500 text-slate-950 hover:bg-amber-400 focus:ring-amber-400 font-semibold shadow-sm hover:shadow",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
        </span>
      )}
    </button>
  );
});

export default Button;
