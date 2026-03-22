import { w1, w2, w3, w4 } from "../assets";

// ✅ Proper type definition for each card
export type WbaCard = {
  image: string;
  title: string;
  desc: string;
};

// ✅ Array of cards
export const wba: WbaCard[] = [
  {
    image: w1,
    title: "Learn by Doing",
    desc: "Learn by doing with our detailed, step-by-step courses.",
  },
  {
    image: w2,
    title: "Day-by-Day Roadmap",
    desc: "Follow a clear day-by-day roadmap that keeps your learning simple, structured, and on track.",
  },
  {
    image: w3,
    title: "Community Mentorship",
    desc: "Learn and grow with guidance from experienced mentors in our community.",
  },
  {
    image: w4,
    title: "Network & Jobs Oppurtunities",
    desc: "We connect you with tailored job opportunities that match your skills and goals.",
  },
];
