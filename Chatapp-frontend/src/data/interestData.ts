import { designIcon, manIcon, writingIcon } from "../assets";

type InterestGroup = {
  category: string;
  categoryIcon: string;
  subItems: {
    label: string;
  }[];
  
};


const interestData: InterestGroup[] = [
  {
    category: "Design",
    categoryIcon: designIcon,
    subItems: [
      { label: "Graphical designer" },
      { label: "3D designer"},
      { label: "UI/UX designer"},
      { label: "Digital illustration"},
      { label: "Poster Designer"},
    ]
  },
  {
    category: "Writing",
    categoryIcon: writingIcon,
    subItems: [
      { label: "Copy writer" }, 
      { label: "Thread writer" },
    ]
  },
  {
    category: "Management",
    categoryIcon: manIcon,
    subItems: [
      { label: "Community manager" },
      { label: "Moderator" },
      { label: "Project manager" },
    ]
  },
  {
    category: "Development",
    categoryIcon: designIcon,
    subItems: [
      { label: "Software developer" },
      { label: "Frontend developer" },
      { label: "Solidity Developer" },
    ],
  },
];

export default interestData;
