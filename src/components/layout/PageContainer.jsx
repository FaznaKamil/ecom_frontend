export function PageContainer({
  children,
  className = "",
  size = "default",
}) {
  const sizeStyles = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${
        sizeStyles[size] || sizeStyles.default
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default PageContainer;
