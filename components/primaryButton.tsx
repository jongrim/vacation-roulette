import React from "react";

export default function PrimaryButton({
  children,
  className = "",
  ...rest
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`p-3 rounded-full bg-gradient-to-br from-sky-600 to-sky-700 text-white grid place-content-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
