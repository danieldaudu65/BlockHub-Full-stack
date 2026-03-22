// import { bundle, calling, calling1, port, tech } from "../assets";
import { bundle } from "../assets";

export interface JobKitItemee {
  id: string;
  category: string;
  image: any;
  title: string;
  description: string[];
  fileType: string;
  originalPrice?: string; // Optional field for showing strikethrough
  price: string;
  bookingLink?: string
  expiresAt?: string;

  isCall?: boolean;   // 👈 new field

}
export const jobKitItems: JobKitItemee[] = [
  {
    id: "kit_9f3a7c1b82d4",
    image: bundle,
    category: "DFY Package",
    isCall: false,
    title: "Done-For-You Early Project Package",
    description: [
      "Complete project listing (Get access 2,000+ Early project).",
      "Custom pitch template tailored to your project type.",
      "Step-by-step guidance to position your project for success.",
      "Additional resources and advisory support included."
    ],
    fileType: "Full Package (Digital + Advisory)",
    originalPrice: "₦25,000",
    price: "₦100",
    bookingLink: "https://blockhub.africa/package/dfy-project-launch",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },


  // {
  //   id: "kit_a1f7c9d204b3",
  //   image: tech,
  //   category: "Ultimate Web3 Starter Pack",
  //   title: "Technical Writing, Business Development & Marketing Masterclass",
  //   description: [
  //     "Get 3-in-1 access: Master Technical Writing, Business Development, and Marketing in Web3.",
  //     "From simplifying blockchain to closing partnerships and positioning yourself as a Web3 expert.",
  //     "Perfect for anyone looking to break in and grow fast in the Web3 space."
  //   ],
  //   fileType: "3 PDF Courses + Bonus Templates",
  //   originalPrice: "₦70,000",
  //   price: "₦50,000",
  //   expiresAt: new Date(Date.now() + 122 * 60 * 60 * 1000).toISOString(),
  //   isCall: false
  // },

  // {
  //   id: "kit_d8e4f9a216c7",
  //   image: port,
  //   category: "Portfolio Essentials",
  //   title: "Web3 Portfolio Template",
  //   description: [
  //     "Editable, plug-and-play portfolio designed for Web3 talent.",
  //     "Showcase your proof-of-work, technical writing, and business growth wins.",
  //     "Optimized for clients, founders, and recruiters."
  //   ],
  //   fileType: "Notion + PDF Template",
  //   originalPrice: "₦35,000",
  //   price: "₦15,000",
  //   isCall: false,
  //   expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  // },
  // {
  //   id: "kit_b72c5f1049e8",
  //   image: calling,
  //   category: "Clarity Call",
  //   isCall: true,
  //   title: "30-Minute Clarity Call",
  //   description: [
  //     "One-on-one personalized session to help you gain clarity on Web3 career, portfolio, or strategy.",
  //     "Ask direct questions and get actionable advice tailored to your journey.",
  //     "Ideal for quick, focused discussions."
  //   ],
  //   fileType: "Live Call (Google Meet/Zoom)",
  //   originalPrice: "₦10,000",
  //   price: "₦15,000",
  //   bookingLink: "https://calendly.com/block-hub-mailer/30min",
  //   expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  // },
  // {
  //   id: "kit_f41e8a9356d2",
  //   image: calling1,
  //   category: "Clarity Call",
  //   isCall: true,
  //   title: "45-Minute Clarity Call",
  //   description: [
  //     "Deeper dive into your Web3 career roadmap, dApp ideas, or growth strategy.",
  //     "Includes live feedback, portfolio review, and step-by-step guidance.",
  //     "Perfect if you want more time to explore challenges and solutions."
  //   ],
  //   fileType: "Live Call (Google Meet/Zoom)",
  //   originalPrice: "₦15,000",
  //   price: "₦15,000",
  //   bookingLink: "https://calendly.com/block-hub-mailer/new-meeting",
  //   expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  // }
];
