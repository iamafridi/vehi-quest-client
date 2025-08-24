import { FaCar } from "react-icons/fa";
import {
  FaTruck,
  FaVanShuttle,
  FaCarTunnel,
  FaMotorcycle
} from "react-icons/fa6";
import { FaBusAlt, FaCarSide } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";

export const categories = [
  {
    label: "Cars",
    icon: FaCar,
    description: "Versatile vehicles for personal transportation.",
  },
  {
    label: "SUVs",
    icon: FaCarSide ,
    description: "Combines sedan comfort with off-road capability.",
  },
  {
    label: "Motorcycle",
    icon: FaMotorcycle,
    description: "Two-wheeled vehicles with various styles.",
  },
  {
    label: "Bus",
    icon: FaBusAlt,
    description: "Large vehicles designed for transporting groups of people.!",
  },
  {
    label: "Trucks",
    icon: FaTruck,
    description: "Sturdy vehicles for transporting cargo.!",
  },
  {
    label: "Vans",
    icon: FaVanShuttle,
    description: "Multipurpose vehicles for passengers or cargo.!",
  },
  {
    label: "Convertibles",
    icon: FaCarTunnel,
    description:
      "Cars with retractable roofs, offering an open-air driving experience.!",
  },
  {
    label: "Sports Cars",
    icon: IoCarSportSharp,
    description: "High-performance vehicles designed for speed and agility.!",
  },
];
