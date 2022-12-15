import React from "react";
import { comfortaa } from "../util/comfortaa";

export default function Heading({
  level,
  children,
  className = "",
}: React.PropsWithChildren<{ level: string; className?: string }>) {
  const styling: Record<string, string> = {
    h1: "text-2xl sm:text-3xl md:text-4xl",
    h2: "text-xl sm:text-2xl md:text-3xl",
    h3: "text-lg sm:text-xl md:text-2xl",
  };

  return React.createElement(
    level,
    { className: `${comfortaa.className} ${className} ${styling[level]}` },
    children
  );
}
