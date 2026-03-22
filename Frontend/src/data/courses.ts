import { cb, derik,  } from "../assets";

export interface Instructor {
    name: string;
    role: string;
    image: string;
    xLink: string;
}

export interface Course {
    rate: number;
    id: string;
    image: string;
    title: string;
    description: string;
    instructor: string;
    instructors: Instructor[];
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    category: string;
    studentsEnrolled: number;
    rating: number;
    totalReviews: number;
    price: string;
    outcomes: string[];
}

export const courses: Course[] = [
    {
        id: "course-1",
        image: cb,
        title: "Introduction to Web3 Development",
        description: "This course introduces you to the fundamentals of Web3 development. You will understand how blockchain works and how decentralized applications are built. We explore wallets, smart contracts, and Web3 architecture. By the end, you will confidently understand the Web3 ecosystem.",
        instructor: "Derik",
        instructors: [
            {
                name: "Derik",
                role: "Web3 Developer & Ecosystem Builder",
                image: derik,
                xLink: "https://x.com/derik",
            },
        ],
        level: "Beginner",
        duration: "1h 12min",
        category: "Web3",
        studentsEnrolled: 1243,
        rating: 4.8,
        totalReviews: 320,
        price: "Free",
        outcomes: [
            "Understand blockchain fundamentals",
            "Set up and use Web3 wallets",
            "Deploy a simple smart contract",
            "Navigate the Web3 ecosystem confidently",
        ],
        rate: 0
    },

    {
        id: "course-2",
        image: cb,
        title: "Advanced Smart Contract Auditing",
        description: "Learn how to audit smart contracts like a professional security researcher. This course dives deep into common vulnerabilities and attack vectors. You will analyze real-world exploits and learn mitigation strategies. By completion, you will be able to review and secure smart contracts effectively.",
        instructor: "Amina",
        instructors: [
            {
                name: "Amina",
                role: "Blockchain Security Researcher",
                image: derik,
                xLink: "https://x.com/amina",
            },
        ],
        level: "Advanced",
        duration: "2h 05min",
        category: "Security",
        studentsEnrolled: 845,
        rating: 4.9,
        totalReviews: 210,
        price: "Free",
        outcomes: [
            "Identify smart contract vulnerabilities",
            "Understand reentrancy attacks",
            "Audit Solidity contracts",
            "Apply security best practices",
        ],
        rate: 0
    },

    {
        id: "course-3",
        image: cb,
        title: "Solidity from Zero to Hero",
        description: "Master Solidity from the basics to advanced concepts. You will build real smart contracts step by step. The course covers data types, functions, and contract interactions. By the end, you will confidently write and deploy production-ready contracts.",
        instructor: "Kofi",
        instructors: [
            {
                name: "Kofi",
                role: "Smart Contract Engineer",
                image: derik,
                xLink: "https://x.com/kofi",
            },
        ],
        level: "Intermediate",
        duration: "1h 45min",
        category: "Development",
        studentsEnrolled: 1560,
        rating: 4.7,
        totalReviews: 410,
        price: "Free",
        outcomes: [
            "Write Solidity smart contracts",
            "Deploy contracts to testnet",
            "Understand gas optimization",
            "Interact with contracts using Web3",
        ],
        rate: 0
    },
];
