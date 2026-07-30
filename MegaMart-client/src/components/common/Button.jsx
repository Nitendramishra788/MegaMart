function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 font-medium transition ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:opacity-90"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;