import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function cleanJSON(raw: string) {
  return raw
    .replace(/```json/i, "") // remove ```json
    .replace(/```/g, "")     // remove ```
    .trim();
}

export const slides = [
  {
    title: "Learn Without Limits",
    desc: "Start, switch, or advance your career with thousands of courses from world-class instructors. Join millions of learners worldwide.",
    bg: "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700",
    bgImg: "https://t3.ftcdn.net/jpg/17/14/18/20/360_F_1714182092_oKFhaMfym7E57mvTqxAOudds7yPgSUY8.jpg",
    alt: "Learn Without Limits"
  },
  {
    title: "Web Development",
    desc: "The process of building highly interactive, secure, and AI-integrated digital experiences, moving beyond simple websites to complex, performant applications.",
    bg: "bg-gray-900",
    bgImg: "https://t3.ftcdn.net/jpg/02/14/87/96/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg",
    alt: "Web Development image"
  },
  {
    title: "User Interface and User Experience Design",
    desc: "A UI/UX design course provides comprehensive training on creating intuitive, visually appealing, and user-centric digital products like websites and mobile apps.",
    bg: "bg-gray-900",
    bgImg: "https://sutracms-production.s3.ap-south-1.amazonaws.com/67ea1813bda955b42a0488a3/media/sutracms-17585208331581955/large",
    alt: "UI/UX design Image"
  },
    {
    title: "Data Science",
    desc: "Data science is a multidisciplinary field that combines mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data.",
    bg: "bg-gray-900",
    bgImg: "https://www.tqmi.com/wp-content/uploads/2022/02/Data-Science-4.webp",
    alt: "Data Science"
  }
]