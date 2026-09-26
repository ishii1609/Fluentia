import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios"
const API_URL = "http://localhost:3000/api";


const WORD_LIST = [
  "eloquent", "ambiguous", "resilient", "candid", "meticulous",
  "versatile", "concise", "tenacious", "articulate", "genuine",
  "profound", "diligent", "sincere", "adaptable", "confident",
  "curious", "empathetic", "optimistic", "persistent", "humble",
];

const getWordForToday = () => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return WORD_LIST[dayOfYear % WORD_LIST.length];
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchWord = async () => {
    try {
      const res = await axios.get(`${API_URL}/word/`, { withCredentials: true });
      setWordData(res.data);
     } catch (err) {
      console.error("Word fetch error:", err);
      // setWordData({ word: "practice", definition: "Keep practicing daily!", example: "" });
     } finally {
      setLoading(false);
    }  };
  fetchWord();
}, []);

  return (
    <div className="min-h-screen bg-base text-text font-body px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-3xl text-muted mb-1">Welcome back,</p>
            <h1 className="font-display text-4xl md:text-5xl">{user?.name || "there"}</h1>
          </div>
          <button
            onClick={logout}
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Log out
          </button>
        </div>

        {/* Word of the Day */}
        <div className="bg-surface border border-border rounded-2xl p-8 mb-10">
          <p className="text-xs uppercase tracking-wider text-accent mb-4">Word of the Day</p>
          {loading ? (
            <p className="text-sm text-muted">Loading today's word...</p>
          ) : (
            <>
              <h2 className="font-display text-3xl mb-3 capitalize">{wordData.word}</h2>
              <p className="text-sm text-muted leading-relaxed mb-3">{wordData.definition}</p>
              {wordData.example && (
                <p className="text-sm text-text italic border-l-2 border-accent pl-4">
                  "{wordData.example}"
                </p>
              )}
            </>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/practice"
            className="group bg-surface border border-border rounded-2xl p-8 hover:border-accent transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-base border border-border flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F2A93B" strokeWidth="1.6">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
                <line x1="12" y1="18" x2="12" y2="22" />
              </svg>
            </div>
            <h2 className="font-display text-xl mb-2">Start Practice</h2>
            <p className="text-sm text-muted leading-relaxed">
              Have a live conversation with your AI tutor and build your
              speaking confidence.
            </p>
          </Link>

          <Link
            to="/reports"
            className="group bg-surface border border-border rounded-2xl p-8 hover:border-accent transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-base border border-border flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F2A93B" strokeWidth="1.6">
                <path d="M3 14l3-6 3 9 3-13 3 11 3-7 3 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-xl mb-2">My Reports</h2>
            <p className="text-sm text-muted leading-relaxed">
              Review your fluency scores and track your progress over time.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;