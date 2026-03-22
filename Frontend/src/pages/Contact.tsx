import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Team from '../components/Team'
import { Link } from 'react-router-dom'

const Contact: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-black text-white">

        <Navbar />

        {/* Hero */}
        <section className="px-4 lg:px-40 py-20 flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Get in Touch with BlockHub
          </h1>

          <p className="text-stone-400 max-w-2xl">
            Whether you're a Web3 beginner looking to learn, a builder looking to
            collaborate, or a project that wants to partner with BlockHub —
            we'd love to hear from you.
          </p>
        </section>

        {/* Contact Section */}
        <section className="px-4 lg:px-40 pb-20 grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Send us a message</h2>

            <input
              type="text"
              placeholder="Your Name"
              className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg"
            />

            <button className="bg-white text-black font-semibold py-3 rounded-lg hover:bg-stone-300 transition">
              Send Message
            </button>
          </div>

          {/* Direct Contact Info */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>

            <div>
              <p className="font-medium">Email</p>
              <p className="text-stone-400">block.hub.mailer@email.com</p>
            </div>

            <div>
              <p className="font-medium">Twitter / X</p>
              <a
                href="https://x.com/Block_hubV2"
                target="_blank"
                className="text-stone-400 hover:text-white"
              >
                @Block_hubV2
              </a>
            </div>

            <div>
              <p className="font-medium">Community</p>
              <p className="text-stone-400 mb-4">
                Join our community to learn Web3 and build with us.
              </p>

              {/* Telegram CTA */}
              <a
                href="https://t.me/blockhub_V2"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-black-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-white transition"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 flex items-center justify-center text-sm rounded-full bg-white text-black font-bold">
                    TG
                  </div>

                  <div>
                    <p className="font-semibold">Join BlockHub Telegram</p>
                    <p className="text-sm text-stone-400">
                      Real-time updates, alpha & community support
                    </p>
                  </div>
                </div>

                {/* Right Arrow */}
                <div className="text-stone-400 group-hover:text-white transition">
                  →
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition"></div>
              </a>
            </div>

            <Link to="/academy">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-white transition cursor-pointer group">
                <p className="text-sm text-stone-400 group-hover:text-white transition">
                  BlockHub Academy helps beginners learn blockchain, explore
                  opportunities in Web3, and connect with builders.
                </p>
              </div>
            </Link>
          </div>

        </section>

        {/* Team */}
        <Team />

      </div>

      <Footer />
    </>
  )
}

export default Contact