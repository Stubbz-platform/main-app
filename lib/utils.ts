import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserInitials = (name: string | undefined): string => {
  if (name === undefined) {
    return "TO";
  }
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
};
