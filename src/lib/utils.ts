import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// commonCountryCodes.js

const commonCountryCodes = [
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "India", code: "+91", iso: "IN" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "China", code: "+86", iso: "CN" },
  { name: "Japan", code: "+81", iso: "JP" },
  { name: "Brazil", code: "+55", iso: "BR" },
  { name: "Mexico", code: "+52", iso: "MX" },
  { name: "South Africa", code: "+27", iso: "ZA" },
  { name: "New Zealand", code: "+64", iso: "NZ" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "Spain", code: "+34", iso: "ES" },
  { name: "Netherlands", code: "+31", iso: "NL" },
  { name: "Switzerland", code: "+41", iso: "CH" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "Singapore", code: "+65", iso: "SG" },
  // Add more countries as needed
];

// Optional: You might want a function to get the default based on location
export const getDefaultCountryCode = () => {
  // For your current context (Toronto, Ontario, Canada)
  return commonCountryCodes.find((country) => country.iso === "CA");
};

export default commonCountryCodes;
