import React from "react";
import { comfortaa } from "../util/comfortaa";

export default function Heading({
  level,
  children,
  className = "",
}: React.PropsWithChildren<{ level: string; className?: string }>) {
  const styling: Record<string, string> = {
    h1: "text-2xl sm:text-3xl md:text-4xl",
  };

  return React.createElement(
    level,
    { className: `${comfortaa.className} ${className} ${styling[level]}` },
    children
  );
}
