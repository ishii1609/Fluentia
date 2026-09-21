import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FULL_NAME = "Fluentia";

const Landing = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (typed.length < FULL_NAME.length) {
      const timeout = setTimeout(() => {
        setTyped(FULL_NAME.slice(0, typed.length + 1));
      }, 130);
      return () => clearTimeout(timeout);
    }
  }, [typed]);

  return (
    <div className="min-h-screen bg-[#16131A] text-[#F3EFE7]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink { animation: blink 0.9s step-end infinite; }
      `}</style>

      {/* Nav */}
      <nav className=" font-body fixed top-0 right-0  left-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto bg-[#16131A]/80 backdrop-blur-md">
        <span className="font-display text-xl tracking-tight ">Fluentia</span>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm text-[#A79E96] hover:text-[#F3EFE7] transition-colors">
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded-full bg-[#F2A93B] text-[#16131A] font-medium hover:bg-[#f5b85e] transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="font-body flex flex-col items-center text-center px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <h1 className="font-display text-6xl md:text-8xl leading-none tracking-tight">
          {typed}
          <span className="cursor-blink text-[#F2A93B]">|</span>
        </h1>

        <p className="mt-8 max-w-md text-[#A79E96] text-base md:text-lg leading-relaxed">
          Have real conversations in English with an AI partner, and see
          exactly where your fluency and pronunciation need work.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-full bg-[#F2A93B] text-[#16131A] font-medium hover:bg-[#f5b85e] transition-colors"
          >
           Get started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-full border border-[#3A3440] text-[#F3EFE7] font-medium hover:border-[#F2A93B] transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="font-body px-6 md:px-12 pb-28 max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-center mb-16">
          How it works
        </h2>

        <div className="relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-[#3A3440]" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full bg-[#211C26] border border-[#3A3440] flex items-center justify-center mb-6 relative z-10">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F2A93B" strokeWidth="1.6">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-wide text-[#F3EFE7] mb-2">1. Speak</h3>
              <p className="text-sm text-[#A79E96] leading-relaxed max-w-[220px]">
                Talk to your AI partner about anything — it listens and
                replies like a real conversation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full bg-[#211C26] border border-[#3A3440] flex items-center justify-center mb-6 relative z-10">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F2A93B" strokeWidth="1.6">
                  <path d="M3 14l3-6 3 9 3-13 3 11 3-7 3 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-wide text-[#F3EFE7] mb-2">2. Get analyzed</h3>
              <p className="text-sm text-[#A79E96] leading-relaxed max-w-[220px]">
                Every word is checked for fluency, grammar, and
                pronunciation as you speak.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full bg-[#211C26] border border-[#3A3440] flex items-center justify-center mb-6 relative z-10">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F2A93B" strokeWidth="1.6">
                  <rect x="3" y="12" width="4" height="8" rx="1" />
                  <rect x="10" y="7" width="4" height="13" rx="1" />
                  <rect x="17" y="3" width="4" height="17" rx="1" />
                </svg>
              </div>
              <h3 className="text-sm font-medium tracking-wide text-[#F3EFE7] mb-2">3. See your report</h3>
              <p className="text-sm text-[#A79E96] leading-relaxed max-w-[220px]">
                Review a clear breakdown of what to fix, and track your
                progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;