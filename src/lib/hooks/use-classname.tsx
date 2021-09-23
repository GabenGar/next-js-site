import { useState, useEffect } from "react";

/**
 * @param classNames A list of strings
 * @returns `className` string
 */
export function useClassName(...classNames: Array<string | undefined>): string {
  const [className, changeClassName] = useState("");

  useEffect(() => {
    const newClassName = classNames.filter((str) => str && String(str)).join(" ");
    changeClassName(newClassName);
  });

  return className;
}
