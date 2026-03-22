import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface RoadmapPhase {
    phase: string;
    months: string[];
    goal: string;
    tasks: Record<string, string[]>;
}

const roadmapData: RoadmapPhase[] = [
    {
        phase: "PHASE 1 — STRUCTURE & SETUP",
        months: ["Nov 2025", "Dec 2025"],
        goal: "Build a strong foundation and prepare for launch.",
        tasks: {
            "Nov 2025": [
                "Finalize BlockHub system architecture: Jobs, Tasks, Academy, Ambassadors, Admin panel.",
                "Build frontend + backend connections: Telegram login, task submission, admin approvals.",
                "Prepare Hard Jobs + Soft Jobs categories.",
                "Design landing page, brand, and UX.",
                "Set up the team structure (admins, moderators, ambassadors).",
            ],
            "Dec 2025": [
                "Complete MVP build and internal testing.",
                "Test all flows: task submission, admin approval, ambassador missions.",
                "Prepare BlockHub Academy content (free modules).",
                "Build hype and waitlist for January launch.",
                "Release teaser posts & behind-the-scenes updates.",
            ],
        },
    },
    {
        phase: "PHASE 2 — PUBLIC LAUNCH + USER ONBOARDING",
        months: ["Jan 2026"],
        goal: "Launch system and onboard first users through real-life engagement.",
        tasks: {
            "Jan 2026": [
                "Official launch of the new BlockHub system.",
                "Free access to BlockHub Academy (online courses & skill-building).",
                "Weekly job & task drops on the platform.",
                "Onboard first 1,000 users.",
                "Early partnerships with Web3 teams for free task postings.",
                "Launch ambassador missions with badges and recognition.",
                "Live programs: Weekly AMAs, Skill-building workshops, Task challenges with leaderboard",
            ],
        },
    },
    {
        phase: "PHASE 3 — COMMUNITY GROWTH & ACADEMY EXPANSION",
        months: ["Feb 2026", "Mar 2026", "Apr 2026"],
        goal: "Build engagement and trust through active programs.",
        tasks: {
            "Feb 2026": [
                "Expand Academy with new free courses.",
                "User dashboards track progress: courses completed, tasks done.",
                "Launch community task streaks for ambassadors.",
                "Host first real-life mentoring sessions online with industry experts.",
            ],
            "Mar 2026": [
                "Introduce levels & badges for tasks completed, academy milestones, community contributions.",
                "Expand job categories based on user feedback.",
                "Start community-based project challenges (mini hackathons).",
            ],
            "Apr 2026": [
                "Launch BlockHub Academy 2.0 (structured 4-week free programs).",
                "Weekly live founder talks & AMA sessions.",
                "Build leaderboard and recognition system for top contributors.",
            ],
        },
    },
    {
        phase: "PHASE 4 — WEB3 FEATURES",
        months: ["May 2026", "Jun 2026", "Jul 2026"],
        goal: "Upgrade platform to Web3 capabilities while keeping everything free.",
        tasks: {
            "May 2026": [
                "Add optional Wallet Login (MetaMask, WalletConnect) for early Web3 identity.",
                "Integrate Ethers.js for on-chain activity tracking.",
                "Begin storing small proofs of work on-chain (non-financial).",
            ],
            "Jun 2026": [
                "Roll out on-chain task credentials (Soulbound “Task Proof NFTs”).",
                "Users earn verified badges for completing jobs/tasks.",
                "Track user reputation on-chain (display-only).",
            ],
            "Jul 2026": [
                "Introduce crypto-friendly task verification (optional, for practice) without payments.",
                "Add user dashboards to view on-chain achievements.",
                "Real-life programs: Web3 skill bootcamps, Community project sessions, Ambassador mentorship calls",
            ],
        },
    },
    {
        phase: "PHASE 5 — ECOSYSTEM BUILDING & ENGAGEMENT",
        months: ["Aug 2026", "Sep 2026", "Oct 2026"],
        goal: "Build BlockHub as a free, trust-first Web3 talent ecosystem.",
        tasks: {
            "Aug 2026": [
                "Launch BlockHub Talent Marketplace (fully free).",
                "Add team-building tools for founders to find contributors.",
                "Users can create public portfolios showcasing completed tasks/projects.",
                "Live programs: Weekly collaboration challenges, Founder-led hackathons, Soft-skills workshops",
            ],
            "Sep 2026": [
                "Launch AI tools for skills & tasks: AI job matcher, AI portfolio builder, AI task pre-checker.",
                "All tools free for users.",
                "Expand community challenges to include group projects and live leaderboard.",
            ],
            "Oct 2026": [
                "Expand Academy into tracks: Web3 Development, Community Management, Marketing, Creative Design, Product & Operations",
                "Partner with international Web3 communities (free).",
                "Target 10,000 active users milestone.",
                "Live programs: Multi-day project sprints, AMA with partner Web3 teams, Skills showcase sessions",
            ],
        },
    },
    {
        phase: "PHASE 6 — PLATFORM CONSOLIDATION",
        months: ["Nov 2026"],
        goal: "Solidify BlockHub as the go-to free Web3 talent platform.",
        tasks: {
            "Nov 2026": [
                "Improve platform performance based on 1-year feedback.",
                "Consolidate all user achievements, badges, and reputation systems.",
                "Run end-of-year mega challenge: Community projects, Live workshops, Recognition for top contributors",
                "Expand global Web3 community integration.",
                "Prepare roadmap for Year 2 (scaling, new features, partnerships).",
            ],
        },
    },
];

const particles = Array.from({ length: 50 });


const Roadmap: React.FC = () => {
    const [currentPhase, setCurrentPhase] = useState<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });
    const userClicked = useRef(false);

    useEffect(() => {
        // Auto-cycle phases every 10 seconds
        intervalRef.current = setInterval(() => {
            setCurrentPhase((prev) => (prev + 1) % roadmapData.length);
        }, 10000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        setDim({ width: window.innerWidth, height: window.innerHeight });
    }, []);


    const handlePhaseClick = (idx: number) => {
        userClicked.current = true; // stop auto-cycling temporarily
        setCurrentPhase(idx);

        // resume auto-cycle after 10 seconds of inactivity
        setTimeout(() => {
            userClicked.current = false;
        }, 10000);
    };
    return (
        <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
            <Navbar />

            {/* PARTICLES */}
            {dim.width > 0 && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                opacity: 0.2,
                                x: Math.random() * dim.width,
                                y: Math.random() * dim.height,
                                scale: Math.random() * 0.7 + 0.4
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                x: Math.random() * dim.width,
                                y: Math.random() * dim.height
                            }}
                            transition={{
                                duration: Math.random() * 6 + 6,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            }}
                            className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_12px_4px_rgba(72,255,117,0.9)]"
                        />
                    ))}
                </div>
            )}

            <div className="px-6 md:px-20 py-16 relative z-10">
                <h1 className="text-4xl font-bold text-center mb-6">
                    BLOCKHUB — 12 MONTH ROADMAP
                </h1>
                <p className="text-center text-white/60 mb-12">Nov 2025 → Nov 2026</p>

                <div className="space-y-12 relative">
                    {roadmapData.map((phase, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="border-l-2 border-green-500 pl-6 relative"
                        >
                            {/* Glow circle / moving light */}
                            <motion.div
                                layout
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`absolute -left-3 top-2 w-6 h-6 rounded-full shadow-[0_0_20px_5px_rgba(72,255,117,0.7)] ${currentPhase === idx ? "bg-green-400" : "bg-green-800/40"
                                    }`}
                            />

                            <div
                                className="cursor-pointer"
                                onClick={() => handlePhaseClick(idx)}
                            >
                                <h2 className="text-xl md:text-2xl font-semibold">
                                    {phase.phase}
                                </h2>
                                <p className="text-green-400 mt-1 mb-3">{phase.goal}</p>
                            </div>

                            <AnimatePresence>
                                {currentPhase === idx && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="space-y-4 ml-4"
                                    >
                                        {phase.months.map((month) => (
                                            <div
                                                key={month}
                                                className="bg-[#0f0f0f]/80 p-4 rounded-xl border border-green-500/30"
                                            >
                                                <h3 className="text-green-400 font-semibold">{month}</h3>
                                                <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                                                    {phase.tasks[month].map((task, i) => (
                                                        <li key={i}>{task}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );

};

export default Roadmap;
