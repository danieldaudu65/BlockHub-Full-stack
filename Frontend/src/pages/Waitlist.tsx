import React, { useState, useEffect, type FormEvent } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import BlockHubLoader from '../components/BlockHubLoader';
import { API_URL } from '../confiq';
import { skillCategories } from '../data/Skills';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessPopup from '../components/SuccessPopup ';

// Define the User interface
interface User {
    id: string;
    username: string;
    fullName: string;
    token: string;
    image?: string;
}

const particles = Array.from({ length: 40 });

const Waitlist: React.FC = () => {
    const [dim, setDim] = useState({ width: 0, height: 0 });
    const [email, setEmail] = useState('');
    // const [telegram, setTelegram] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [waitlistNumber, setWaitlistNumber] = useState<number>(0);
    const [openCategory, setOpenCategory] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [step, setStep] = useState<'form' | 'tweet'>('form');

    const [hasClickedPost, setHasClickedPost] = useState(false);

    const [shareImage, setShareImage] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);


    console.log(waitlistNumber);

    const location = useLocation();

    // const tweetText = 'I just joined BlockHub Academy waitlist! #Web3 #Learning';


    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const token = queryParams.get("token");
        const name = queryParams.get("name");
        const username = queryParams.get("username");
        const image = queryParams.get("image");
        const firstLogin = queryParams.get("firstLogin");
        const id = queryParams.get("id");

        if (token) localStorage.setItem("user_token", token);
        if (name) localStorage.setItem("user_name", name);
        if (username) localStorage.setItem("user_username", username);
        if (image) localStorage.setItem("user_image", image);
        if (firstLogin) localStorage.setItem("logged_in", firstLogin);
        if (id) localStorage.setItem("user_id", id);

        // Set user state if token exists
        if (token) {
            setUser({
                id: id || "",
                username: username || "",
                fullName: name || "",
                token,
                image: image || undefined,
            });
        }

        // Clean URL
        if (location.search) {
            navigate("/academy/waitlist", { replace: true });
        }
    }, [location, navigate]);



    useEffect(() => {
        setDim({ width: window.innerWidth, height: window.innerHeight });

        // Get user directly from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);


    const handleSkillChange = (skill: string) => {
        setSkills((prev) => {
            if (prev.includes(skill)) return prev.filter((s) => s !== skill);
            if (prev.length >= 5) {
                toast.error('You can select a maximum of 5 skills');
                return prev;
            }
            return [...prev, skill];
        });
    };

    const generateShareImage = async () => {
        if (!user) return;

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/user_waitlist/generate-image`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.fullName,
                    profileImage: user.image
                }),
            });

            const { imageUrl } = await res.json();
            setShareImage(imageUrl);
            setStep("tweet");
        } catch (err) {
            toast.error("Failed to generate share image. Try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleConnect = () => {
        window.location.href = `${API_URL}/auth/auth/twitter?source=academy`;
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await generateShareImage();
        setStep('tweet');
    };


    const fetchWaitlistCount = async () => {
        try {
            const res = await fetch(`${API_URL}/user_waitlist/waitlist-count`);
            const data = await res.json();
            if (res.ok) setWaitlistNumber(data.totalWaitlist);
            else console.error("Error fetching waitlist count:", data.message);
        } catch (error) {
            console.error("Network error fetching waitlist count", error);
        }
    };

    useEffect(() => {
        fetchWaitlistCount();
    }, []);


    console.log(fetchWaitlistCount);
    


    const handlePostDone = async () => {
        if (!user) {
            toast.error("User not found. Please reconnect your X account.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/user_waitlist/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: user.fullName,
                    email,
                    twitterHandle: user.username,
                    courses: skills
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setLoading(false);

                // 👇 Show the success popup
                setShowSuccess(true);

                // 👇 After 5 seconds, hide popup + reset everything
                setTimeout(() => {
                    setShowSuccess(false);
                    setSkills([]);
                    setEmail("");
                    setStep("form");
                }, 5000);
            } else {
                setLoading(false);
                toast.error(data.message || 'Failed to join waitlist');
            }
        } catch (err) {
            setLoading(false);
            toast.error('Network error. Try again.');
        }
    };



    return (
        <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
            {showSuccess && <SuccessPopup />}


            <Navbar />
            {loading && <BlockHubLoader />}

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
                                scale: Math.random() * 0.7 + 0.4,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                x: Math.random() * dim.width,
                                y: Math.random() * dim.height,
                            }}
                            transition={{
                                duration: Math.random() * 6 + 6,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                            className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_12px_4px_rgba(72,255,117,0.9)]"
                        />
                    ))}
                </div>
            )}

            {/* BACKGROUND GLOW */}
            <motion.div
                initial={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: [0.2, 0.5, 0.3, 0.6, 0.2], scale: [1, 1.1, 1, 1.15, 1] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute top-40 left-20 w-[450px] h-[450px] rounded-full bg-green-500/20 blur-[120px]"
            />
            <motion.div
                initial={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: [0.2, 0.45, 0.25, 0.5, 0.2], scale: [1, 1.08, 1, 1.12, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full bg-green-400/10 blur-[100px]"
            />

            {/* CONTENT */}
            <div className="px-4 md:px-20 lg:mt-20 mb-20 relative z-10 flex flex-col items-center">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-4"
                >
                    Join the BlockHub Academy Waitlist
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center text-white/60 max-w-xl"
                >
                    Be the first to access our free Web3 learning system. Tell us what you want to learn, and we’ll prioritize content for you.
                </motion.p>

                {/* <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center text-green-600/60 mb-8 mt-2 text-[12px] max-w-xl"
                >
                    About <b>{waitlistNumber}</b> users have joined the waitlist.
                </motion.p> */}

                {!user ? (
                    <button
                        onClick={handleConnect}
                        className="bg-gradient-to-r from-green-500 to-black p-3 px-5 mt-3 rounded-lg font-semibold text-white hover:from-green-600 hover:to-black transition"
                    >
                        Connect with X
                    </button>

                ) : step === 'form' ? (
                    <motion.form
                        onSubmit={handleFormSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full max-w-md space-y-4 bg-[#0f0f0f]/80 backdrop-blur-xl p-4 rounded-2xl border border-green-500/30"
                    >
                        <input
                            type="text"
                            value={user.fullName}
                            readOnly
                            className="w-full p-3 rounded border bg-black/20 border-green-500/50 text-white text-xs focus:outline-none"
                        />
                        <input
                            type="text"
                            value={user.username}
                            readOnly
                            className="w-full p-3 rounded border bg-black/20 border-green-500/50 text-white text-xs focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 rounded border bg-black/20 border-green-500/50 text-white text-xs focus:outline-none"
                        />

                        {/* Skills Accordion */}
                        <div className="space-y-2">
                            {Object.entries(skillCategories).map(([category, skillsList], idx) => (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border border-green-500/50 rounded-xl overflow-hidden mb-3"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                                        className="w-full flex justify-between items-center p-3 bg-green-500/20 hover:bg-green-500/30 transition text-white font-semibold"
                                    >
                                        <span className="text-sm">{category}</span>
                                        <motion.span animate={{ rotate: openCategory === idx ? 45 : 0 }} transition={{ duration: 0.3 }}>
                                            +
                                        </motion.span>
                                    </button>
                                    <motion.div
                                        layout
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: openCategory === idx ? 'auto' : 0, opacity: openCategory === idx ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 overflow-y-auto max-h-[19rem] scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black"
                                    >
                                        {skillsList.map((skill) => {
                                            const selected = skills.includes(skill);
                                            return (
                                                <motion.div
                                                    key={skill}
                                                    layout
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleSkillChange(skill)}
                                                    className={`cursor-pointer p-3 rounded-xl border text-xs font-medium text-center ${selected
                                                        ? 'bg-green-500 border-green-400 text-black'
                                                        : 'bg-black/20 border-green-500/50 text-white/80 hover:bg-green-600/40 hover:text-white'
                                                        }`}
                                                >
                                                    {skill}
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold p-3 rounded-xl transition"
                        >
                            {loading ? 'Submitting...' : 'Next: Tweet'}
                        </button>
                    </motion.form>
                ) :
                    step === 'tweet' && (
                        <motion.div className="w-full max-w-md space-y-4 bg-[#0f0f0f]/80 backdrop-blur-xl p-4 rounded-2xl border border-green-500/30 flex flex-col items-center">
                            <p className="text-center text-white/70 mb-2 font-medium">
                                Follow these steps to secure your waitlist spot:
                            </p>

                            {/* Step 1: Follow BlockHub */}
                            <div className="w-full bg-green-500/20 p-3 rounded-xl border border-green-500/50 text-white text-center">
                                <p className="font-semibold">Step 1: Follow BlockHub on X</p>
                                <a
                                    href="https://x.com/Block_hubV2"
                                    target="_blank"
                                    className="text-green-400 underline mt-1 block"
                                >
                                    Go to BlockHub X Profile
                                </a>
                            </div>

                            {/* Step 2: Download Image */}
                            {shareImage && (
                                <div className="w-full bg-green-500/20 p-3 rounded-xl border border-green-500/50 text-white text-center flex flex-col items-center">
                                    <p className="font-semibold mb-2">Step 2: Download Your Share Image</p>
                                    <img
                                        src={shareImage}
                                        alt="Share Card"
                                        className="w-full max-w-xs rounded-lg border border-green-500 mb-2"
                                    />
                                    <a
                                        href={shareImage}
                                        target="_blank"
                                        download="blockhub-share-card.png"
                                        className="bg-green-500 hover:bg-green-600 text-black font-semibold p-2 rounded-xl mt-2"
                                    >
                                        Download Image
                                    </a>
                                </div>
                            )}

                            {/* Step 3: Post Tweet */}
                            <div className="w-full bg-green-500/20 p-3 rounded-xl border border-green-500/50 text-white text-center">
                                <p className="font-semibold mb-2">Step 3: Post Your Tweet</p>
                                {!hasClickedPost ? (
                                    <a
                                        onClick={() => setHasClickedPost(true)}
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                            `I just joined BlockHub Academy waitlist! 🚀\nSkills I want to learn: ${skills.join(', ')}\nDownload my share image and join too! #Web3 #Learning\n\nJoin here: https://blockhubglobal.xyz/academy/waitlist`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 hover:bg-green-600 text-black font-semibold p-2 rounded-xl inline-block"
                                    >
                                        Make a Tweet
                                    </a>

                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-white/80 text-sm">
                                            Once you’ve posted the tweet along with your downloaded image, click below to confirm your waitlist spot:
                                        </p>
                                        <button
                                            onClick={handlePostDone}
                                            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold p-3 rounded-xl"
                                        >
                                            I Posted It
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}


            </div>

            <Footer />
        </div>
    );
};

export default Waitlist;
