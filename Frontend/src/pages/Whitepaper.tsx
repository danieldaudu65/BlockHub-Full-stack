
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const particles = Array.from({ length: 60 });

const Whitepaper: React.FC = () => {
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDim({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const tableOfContents = [
    "Executive Summary",
    "Introduction – The Blockhub Journey",
    "Mission Statement",
    "The Problem",
    "Community Hero Narrative",
    "The Solution – Learn → Earn → Opportunity",
    "Blockhub Ecosystem",
    "Blockhub Academy",
    "GrindFi Leaderboard",
    "Blockhub Marketplace",
    "Partnership Framework",
    "Community Incentive System",
    "Governance and Community Evolution",
    "Monetization Model & Revenue Streams",
    "Future Token Concept",
    "Growth Strategy (Project Seasons)",
    "Market Analysis & Size",
    "Competitor Analysis & Differentiation",
    "KPIs & Early Adoption Metrics",
    "Risk Assessment & Mitigation",
    "Why Blockhub Is Scalable",
    "Security & Trust Layer",
    "Long-Term Vision",
    "Ecosystem Stewardship",
    "Conclusion"
  ];

  const TableOfContents = () => {
    return (
      <div className="hidden lg:block sticky top-24 h-fit w-64 pr-8">
        <h3 className="text-green-400 font-semibold mb-4">Contents</h3>

        <ul className="space-y-2 text-sm text-white/70">
          {tableOfContents.map((item) => {
            const id = item.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="hover:text-green-400 transition"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
      <Navbar />

      {dim.width > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">


          {particles.map((_, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0.2,
                x: Math.random() * dim.width,
                y: Math.random() * dim.height,
                scale: Math.random() * 0.6 + 0.4,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                x: Math.random() * dim.width,
                y: Math.random() * dim.height,
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_12px_4px_rgba(72,255,117,0.9)]"
            />
          ))}
        </div>
      )}

      <div className="relative z-10 px-6 md:px-20 py-16 space-y-16">
        <TableOfContents />

        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-12">
          BlockHub Whitepaper
        </h1>

        <Section title="Executive Summary">
          Blockhub is a global-first decentralized hub where learners, jobbers,
          and contributors are empowered to Learn → Earn → Contribute → Build.
          <br /><br />
          The platform addresses fragmentation in Web3 education, talent
          discovery, and community engagement through:
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>Blockhub Academy – Beginner-friendly courses</li>
            <li>GrindFi Leaderboard – Reputation-driven meritocracy</li>
            <li>Talent Marketplace – Real-world project opportunities</li>
            <li>Community Incentives – Points, recognition, and future token rewards</li>
          </ul>
          <br />
          <b>Case Scenario:</b> James joins Blockhub Academy, completes his
          first course, earns points on the GrindFi leaderboard, and is matched
          to a community management role for a partner project. Within two
          weeks he gains experience, builds reputation, and unlocks more
          advanced opportunities.
        </Section>

        <Section title="Introduction – The Blockhub Journey">
          Blockhub exists to guide users through the Web3 ecosystem. Many
          newcomers are overwhelmed by complex tools, fragmented learning
          resources, and unverified opportunities. Blockhub provides a
          structured, merit-based, community-driven ecosystem that helps
          participants navigate and succeed in Web3.
        </Section>

        <Section title="Mission Statement">
          Democratize access to Web3 learning, earning, and collaboration.
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>Accessibility – Free and beginner-friendly learning pathways</li>
            <li>Meritocracy – Reputation-based recognition and opportunities</li>
            <li>Community – Collaborative learning and engagement</li>
            <li>Sustainability – Long-term ecosystem growth</li>
          </ul>
        </Section>

        <Section title="The Problem">
          <ul className="list-disc list-inside space-y-1">
            <li>Fragmented learning platforms</li>
            <li>Limited mechanisms to validate skills</li>
            <li>Difficulty connecting contributors with projects</li>
          </ul>
          <br />
          <b>Case Scenario:</b> Mike struggles to find verified projects.
          Blockhub matches him with a partner project based on his GrindFi
          leaderboard performance, helping him gain real experience.
        </Section>

        <Section title="Community Hero Narrative">
          Blockhub positions its participants as the protagonists of the
          ecosystem:
          <ul className="list-disc list-inside space-y-1 mt-4">
            <li>Learners gain knowledge and skills</li>
            <li>Jobbers complete tasks and build reputations</li>
            <li>Tutors guide and mentor newcomers</li>
          </ul>
        </Section>

        <Section title="The Solution – Learn → Earn → Opportunity">
          <b>Learn</b>
          <ul className="list-disc list-inside space-y-1">
            <li>Structured courses in plain English</li>
            <li>Practical and unsaturated topics</li>
            <li>Continuous skill building</li>
          </ul>

          <br />

          <b>Earn – Two Phase Model</b>

          <p className="mt-2">
            Phase 1: GrindFi Leaderboard – Participants earn points through
            courses, tasks, and community participation.
          </p>

          <p className="mt-2">
            Phase 2: Talent Matching – High performing users are matched with
            projects seeking talent.
          </p>
        </Section>

        <Section title="Blockhub Ecosystem">
          Actors within the ecosystem include:
          <ul className="list-disc list-inside space-y-1 mt-4">
            <li>Learners</li>
            <li>Tutors</li>
            <li>Jobbers</li>
            <li>Founders / Developers</li>
            <li>Partners</li>
          </ul>
        </Section>

        <Section title="Blockhub Academy">
          <ul className="list-disc list-inside space-y-1">
            <li>Beginner-friendly courses</li>
            <li>Founding tutors earn 90% revenue share</li>
            <li>Future tutors earn 80%</li>
            <li>First 1,000 users onboard for free</li>
          </ul>
        </Section>

        <Section title="GrindFi Leaderboard">
          Tracks contributions, referrals, and participation across the
          ecosystem.
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>Points for course completion</li>
            <li>Points for ecosystem tasks</li>
            <li>Points for referrals</li>
          </ul>
        </Section>

        <Section title="Blockhub Marketplace">
          The marketplace acts as the central hub where contributors,
          projects, and partners exchange services, tasks, and opportunities.
        </Section>

        <Section title="Partnership Framework">
          Blockhub connects projects with talent, knowledge, and community
          participation through ecosystem collaborations, educational
          partnerships, and talent discovery systems.
        </Section>

        <Section title="Community Incentive System">
          <ul className="list-disc list-inside space-y-1">
            <li>Contribution recognition via leaderboard</li>
            <li>Skill development rewards</li>
            <li>Ecosystem participation incentives</li>
            <li>Future token incentives</li>
          </ul>
        </Section>

        <Section title="Governance and Community Evolution">
          Blockhub aims to transition from team-led governance toward a
          community-driven DAO structure where contributors participate in
          decision making.
        </Section>

        <Section title="Monetization Model & Revenue Streams">
          Revenue sources include:
          <ul className="list-disc list-inside space-y-1">
            <li>Academy revenue share</li>
            <li>Talent marketplace commissions</li>
            <li>Task and bounty hosting fees</li>
            <li>Marketplace transaction fees</li>
          </ul>
        </Section>

        <Section title="Future Token Concept">
          A future Blockhub token may provide governance rights and incentives
          for ecosystem participation.
        </Section>

        <Section title="Growth Strategy (Project Seasons)">
          <ul className="list-disc list-inside space-y-1">
            <li>Season 1 – Launch Academy</li>
            <li>Season 2 – Activate leaderboard</li>
            <li>Season 3 – Launch Marketplace</li>
            <li>Season 4 – Expand partnerships globally</li>
          </ul>
        </Section>

        <Section title="Market Analysis & Size">
          Millions of users enter blockchain ecosystems yearly. Blockhub
          targets global Web3 learners and contributors.
        </Section>

        <Section title="Competitor Analysis & Differentiation">
          Blockhub differentiates through gamified meritocracy, reputation
          systems, and an integrated learning-to-opportunity ecosystem.
        </Section>

        <Section title="KPIs & Early Adoption Metrics">
          <ul className="list-disc list-inside space-y-1">
            <li>1,000 founding users</li>
            <li>20 tutors and 40 partner projects</li>
            <li>50% active leaderboard participation</li>
          </ul>
        </Section>

        <Section title="Risk Assessment & Mitigation">
          Risks include adoption challenges, operational scaling, regulatory
          changes, and market competition. Mitigation strategies include free
          onboarding, strong partnerships, and community-driven growth.
        </Section>

        <Section title="Why Blockhub Is Scalable">
          Integrated Learn → Earn → Opportunity flywheel enabling continuous
          ecosystem expansion.
        </Section>

        <Section title="Security & Trust Layer">
          Verified contributors, partner vetting, transparent leaderboard
          systems, and community moderation maintain trust.
        </Section>

        <Section title="Long-Term Vision">
          Blockhub aims to become the global gateway to the Web3 talent
          economy.
        </Section>

        <Section title="Ecosystem Stewardship">
          Governance will gradually transition toward community leadership
          while maintaining responsible platform growth.
        </Section>

        <Section title="Conclusion">
          Blockhub empowers learners, contributors, and builders to succeed
          in Web3.
          <br /><br />
          <b>Learn. Earn. Contribute. Build.</b>
        </Section>

      </div>

      <Footer />
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2
        id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        className="text-2xl md:text-3xl font-semibold text-green-400 scroll-mt-32"
      >        {title}
      </h2>
      <div className="text-white/80 text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

export default Whitepaper;