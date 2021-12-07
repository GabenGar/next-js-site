import { useState, useEffect } from "react";

/**
 * @param classNames String arguments
 * @returns A `className` string
 */
export function useClassName(...classNames: Array<string | undefined>): string {
  const [className, changeClassName] = useState("");

  useEffect(() => {
    const newClassName = classNames.filter((str) => str && String(str)).join(" ");
    changeClassName(newClassName);
  }, [classNames]);

  return className;
}
