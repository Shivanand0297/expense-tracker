import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (delay: number = 1000) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const setTablePageCount = (count: number, pageSize: number) => {
  return Math.ceil(count / pageSize);
}

export const numberToCurrency = (number: number, currency: string = "INR") => {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: currency }).format(number);
};