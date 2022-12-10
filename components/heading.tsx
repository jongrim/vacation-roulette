import { Comfortaa } from "@next/font/google";
import React from "react";

const comfortaa = Comfortaa({ weight: ["400"], subsets: ["latin"] });

export default function Heading({
  level,
  children,
  className = "",
}: React.PropsWithChildren<{ level: string; className?: string }>) {
  const styling: Record<string, string> = {
    h1: "text-3xl",
  };

  return React.createElement(
    level,
    { className: `${comfortaa.className} ${className} ${styling[level]}` },
    children
  );
}
