import toast from 'react-hot-toast';
import { discord, ftg, X, logo } from '../assets';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="
        sm:p-0 lg:p-10
        relative
        overflow-hidden
        bg-gradient-to-b
        from-black
        via-[#002200]
        to-[#00FF66]/20
      "
    >
      <div className="p-6 md:p-10 relative">

        {/* Top section */}
        <div className="flex md:items-center justify-between">
          <img src={logo} alt="BlockHub Logo" className="w-32 md:w-40" />

          <div className="flex gap-4">

            {/* Telegram */}
            <a
              href="https://t.me/blockhub_V2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ftg}
                className="w-6 invert brightness-0 contrast-200 hover:scale-110 transition"
                alt="Telegram"
              />
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/Block_hubV2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={X}
                className="w-6 invert brightness-0 contrast-200 hover:scale-110 transition"
                alt="Twitter / X"
              />
            </a>

            {/* Discord */}
            <img
              onClick={() => toast("Discord launching soon 🚀")}
              src={discord}
              className="w-6 invert brightness-0 contrast-200 cursor-pointer hover:scale-110 transition"
              alt="Discord"
            />

          </div>
        </div>

        {/* Navigation */}
        <ul
          className="flex flex-col md:flex-col lg:flex-row
          items-start md:items-start lg:items-center
          justify-start md:justify-start lg:justify-center
          gap-2 md:gap-2 lg:gap-8
          text-stone-200 text-base font-medium
          lg:pb-16 lg:pt-4 sm:py-10"
        >
          <li>
            <a href="/jobs" className="hover:text-[#00FF66] transition cursor-pointer">
              Job
            </a>
          </li>
          <li>
            <a href="/academy" className="hover:text-[#00FF66] transition cursor-pointer">
              Academy
            </a>
          </li>
          <li>
            <a href="/documentations" className="hover:text-[#00FF66] transition cursor-pointer">
              Documentation
            </a>
          </li>
          <li>
            <a href="/market" className="hover:text-[#00FF66] transition cursor-pointer">
              Marketplace
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-[#00FF66] transition cursor-pointer">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#00FF66] transition cursor-pointer">
              Contact
            </a>
          </li>
        </ul>

        <hr className="block sm:hidden border-t border-gray-400 my-4" />

        {/* Bottom */}
        <div className="text-[#FFFFFFBF] text-[14px] flex flex-wrap-reverse gap-4 justify-center">
          <p>&copy; 2025 BlockHub. All rights reserved.</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Settings</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;