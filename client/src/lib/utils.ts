import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deCamelCase(str: string) {
  const sanitizedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2")
  return sanitizedStr.charAt(0).toUpperCase() + sanitizedStr.slice(1)
}

export const getUniqueNestedValues = (rows: string[]): Array<string> => {
  const uniqueValues = new Set<string>();

  rows.forEach((row) => {
      if (Array.isArray(row)) {
          row.forEach((v) => uniqueValues.add(v.text.toString()));
      } else {
          uniqueValues.add(row.toString());
      }
  });

  return Array.from(uniqueValues);
}