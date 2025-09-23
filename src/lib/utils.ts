import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const isDesktopMediaQuery: string = "(min-width:768px)";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const commonCountryCodes = [
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

export function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
export interface TrackingDataProp {
  trackingNumber: string;
  origin: {
    city: string;
    country: string;
    code: string;
  };
  destination: {
    city: string;
    country: string;
    code: string;
  };
  status: string;
  duration: string;
  departureDate: string;
  arrivalDate: string;
  cost: string;
  weight: string;
  cargoDetails: string;
  transportationProvider: string;
  paymentStatus: string;
  deliveryStatus: string;
  scheduledDepartureTime: string;
  actualDepartureTime: string;
  scheduledArrivalTime: string;
  transportationType: string;
}
export const fakeTrackingData: TrackingDataProp[] = [
  {
    trackingNumber: "SF2043892GH",
    origin: {
      city: "Shanghai",
      country: "China",
      code: "PVG",
    },
    destination: {
      city: "Los Angeles",
      country: "USA",
      code: "JFK",
    },
    status: "IN TRANSIT",
    duration: "21H",
    departureDate: "OCT 15, 2024",
    arrivalDate: "DEC 20, 2024",
    cost: "12,590.00",
    weight: "2,389",
    cargoDetails: "FLC 20' Standard",
    transportationProvider: "DHL",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "01:23 AM",
    actualDepartureTime: "01:28 AM",
    scheduledArrivalTime: "08:23 PM",
    transportationType: "Aircraft",
  },
  {
    trackingNumber: "SG3840291KR",
    origin: {
      city: "Mumbai Port",
      country: "India",
      code: "BOM",
    },
    destination: {
      city: "New York",
      country: "USA",
      code: "JFK",
    },
    status: "DELAYED",
    duration: "9H",
    departureDate: "SEP 18, 2024",
    arrivalDate: "NOV 20, 2024",
    cost: "9,850.00",
    weight: "1,500",
    cargoDetails: "FLC 40' Refrigerated",
    transportationProvider: "FedEx",
    paymentStatus: "Unpaid",
    deliveryStatus: "Late",
    scheduledDepartureTime: "09:45 AM",
    actualDepartureTime: "10:15 AM",
    scheduledArrivalTime: "07:00 PM",
    transportationType: "Aircraft",
  },
  {
    trackingNumber: "DE9982736BR",
    origin: {
      city: "Tokyo",
      country: "Japan",
      code: "NRT",
    },
    destination: {
      city: "Sydney",
      country: "Australia",
      code: "SYD",
    },
    status: "PENDING",
    duration: "14H",
    departureDate: "OCT 2, 2024",
    arrivalDate: "DEC 2, 2024",
    cost: "15,200.00",
    weight: "3,100",
    cargoDetails: "LTL Palletized Goods",
    transportationProvider: "UPS",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "02:00 PM",
    actualDepartureTime: "02:05 PM",
    scheduledArrivalTime: "04:30 AM",
    transportationType: "Vessel",
  },
  {
    trackingNumber: "FR5678920NL",
    origin: {
      city: "Dubai",
      country: "UAE",
      code: "DXB",
    },
    destination: {
      city: "Rotterdam",
      country: "Netherlands",
      code: "RTM",
    },
    status: "ARRIVED",
    duration: "21H",
    departureDate: "AUG 10, 2024",
    arrivalDate: "OCT 15, 2024",
    cost: "7,500.00",
    weight: "950",
    cargoDetails: "Express Parcel",
    transportationProvider: "TNT",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "11:00 AM",
    actualDepartureTime: "11:00 AM",
    scheduledArrivalTime: "06:00 PM",
    transportationType: "Truck",
  },
  {
    trackingNumber: "OP8495732JP",
    origin: {
      city: "Yokohama",
      country: "Japan",
      code: "YOK",
    },
    destination: {
      city: "Chicago",
      country: "USA",
      code: "ORD",
    },
    status: "IN TRANSIT",
    duration: "21H",
    departureDate: "SEP 22, 2024",
    arrivalDate: "NOV 18, 2024",
    cost: "18,900.00",
    weight: "4,500",
    cargoDetails: "FTL General Freight",
    transportationProvider: "Maersk",
    paymentStatus: "Unpaid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "07:30 PM",
    actualDepartureTime: "07:35 PM",
    scheduledArrivalTime: "10:15 AM",
    transportationType: "Vessel",
  },
  {
    trackingNumber: "AU4561289SG",
    origin: {
      city: "Dallas",
      country: "USA",
      code: "DFW",
    },
    destination: {
      city: "Melbourne",
      country: "Australia",
      code: "MEL",
    },
    status: "DELAYED",
    duration: "19H",
    departureDate: "OCT 13, 2024",
    arrivalDate: "NOV 23, 2024",
    cost: "11,200.00",
    weight: "2,150",
    cargoDetails: "Temperature Controlled",
    transportationProvider: "MSC",
    paymentStatus: "Late",
    deliveryStatus: "Late",
    scheduledDepartureTime: "09:00 AM",
    actualDepartureTime: "10:30 AM",
    scheduledArrivalTime: "05:00 PM",
    transportationType: "Aircraft",
  },
  {
    trackingNumber: "BR2348920ZA",
    origin: {
      city: "Port of Sao Paulo",
      country: "Brazil",
      code: "BRZ",
    },
    destination: {
      city: "New Harbour",
      country: "France",
      code: "FRA",
    },
    status: "PENDING",
    duration: "30H",
    departureDate: "OCT 20, 2024",
    arrivalDate: "DEC 15, 2024",
    cost: "22,500.00",
    weight: "6,500",
    cargoDetails: "Heavy Machinery",
    transportationProvider: "CMA CGM",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "04:00 PM",
    actualDepartureTime: "04:10 PM",
    scheduledArrivalTime: "11:00 AM",
    transportationType: "Vessel",
  },
  {
    trackingNumber: "TR1122334YY",
    origin: {
      city: "Istanbul",
      country: "Turkey",
      code: "IST",
    },
    destination: {
      city: "Seoul",
      country: "South Korea",
      code: "ICN",
    },
    status: "IN TRANSIT",
    duration: "10H",
    departureDate: "NOV 5, 2024",
    arrivalDate: "NOV 15, 2024",
    cost: "8,900.00",
    weight: "1,200",
    cargoDetails: "Electronics",
    transportationProvider: "Turkish Cargo",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "06:00 AM",
    actualDepartureTime: "06:00 AM",
    scheduledArrivalTime: "03:00 PM",
    transportationType: "Aircraft",
  },
  {
    trackingNumber: "JP5566778KK",
    origin: {
      city: "Berlin",
      country: "Germany",
      code: "BER",
    },
    destination: {
      city: "Kyoto",
      country: "Japan",
      code: "KIX",
    },
    status: "OUT FOR DELIVERY",
    duration: "4H",
    departureDate: "NOV 1, 2024",
    arrivalDate: "NOV 4, 2024",
    cost: "5,400.00",
    weight: "350",
    cargoDetails: "Documents",
    transportationProvider: "Hermes",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "09:00 AM",
    actualDepartureTime: "09:00 AM",
    scheduledArrivalTime: "01:00 PM",
    transportationType: "Truck",
  },
  {
    trackingNumber: "CA8899001PP",
    origin: {
      city: "Cairo",
      country: "Egypt",
      code: "CAI",
    },
    destination: {
      city: "Mexico City",
      country: "Mexico",
      code: "MEX",
    },
    status: "ON HOLD",
    duration: "25H",
    departureDate: "SEP 10, 2024",
    arrivalDate: "DEC 1, 2024",
    cost: "19,000.00",
    weight: "4,200",
    cargoDetails: "Chemicals",
    transportationProvider: "OOCL",
    paymentStatus: "Late",
    deliveryStatus: "Late",
    scheduledDepartureTime: "11:00 PM",
    actualDepartureTime: "11:30 PM",
    scheduledArrivalTime: "02:00 AM",
    transportationType: "Vessel",
  },
  {
    trackingNumber: "NZ1234567AS",
    origin: {
      city: "Auckland",
      country: "New Zealand",
      code: "AKL",
    },
    destination: {
      city: "London",
      country: "UK",
      code: "LHR",
    },
    status: "IN TRANSIT",
    duration: "27H",
    departureDate: "OCT 25, 2024",
    arrivalDate: "NOV 30, 2024",
    cost: "25,000.00",
    weight: "5,500",
    cargoDetails: "Pharmaceuticals",
    transportationProvider: "Emirates SkyCargo",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "03:00 PM",
    actualDepartureTime: "03:00 PM",
    scheduledArrivalTime: "08:00 AM",
    transportationType: "Aircraft",
  },
  {
    trackingNumber: "CN8889990KL",
    origin: {
      city: "Wuhan",
      country: "China",
      code: "WUH",
    },
    destination: {
      city: "Moscow",
      country: "Russia",
      code: "SVO",
    },
    status: "PENDING",
    duration: "35H",
    departureDate: "OCT 10, 2024",
    arrivalDate: "DEC 10, 2024",
    cost: "17,800.00",
    weight: "3,800",
    cargoDetails: "Apparel",
    transportationProvider: "Sinotrans",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "05:30 PM",
    actualDepartureTime: "05:30 PM",
    scheduledArrivalTime: "09:00 AM",
    transportationType: "Truck",
  },
  {
    trackingNumber: "ZA7776665BG",
    origin: {
      city: "Cape Town",
      country: "South Africa",
      code: "CPT",
    },
    destination: {
      city: "Houston",
      country: "USA",
      code: "HOU",
    },
    status: "ARRIVED",
    duration: "18H",
    departureDate: "SEP 1, 2024",
    arrivalDate: "NOV 2, 2024",
    cost: "14,300.00",
    weight: "2,900",
    cargoDetails: "Wine",
    transportationProvider: "Maersk",
    paymentStatus: "Paid",
    deliveryStatus: "On Time",
    scheduledDepartureTime: "07:00 AM",
    actualDepartureTime: "07:00 AM",
    scheduledArrivalTime: "01:00 AM",
    transportationType: "Vessel",
  },
];
export const getStatusColor = (status: string) => {
  const baseGlow = "drop-shadow-4xl";

  switch (status.toUpperCase()) {
    case "IN TRANSIT":
    case "SHIPPED":
      return `text-cyan-400 ${baseGlow} text-shadow-cyan`;
    case "PENDING":
    case "ARRIVED":
    case "OUT FOR DELIVERY":
      return `text-green-500 ${baseGlow} text-shadow-green`;
    case "DELAYED":
    case "EXCEPTION":
      return `text-rose-400 ${baseGlow} text-shadow-rose`;
    case "ON HOLD":
      return `text-amber-400 ${baseGlow} text-shadow-amber`;
    case "CUSTOMS":
      return `text-yellow-400 ${baseGlow} text-shadow-yellow`;
    default:
      return "text-gray-400"; // Default color without glow
  }
};
