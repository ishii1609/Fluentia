import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const Reports = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${API_URL}/report/${conversationId}`, {
          withCredentials: true,
        });
        setReport(res.data);
      } catch (err) {
        console.error("Report fetch error:", err);
        setError("Couldn't load this report.");
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) fetchReport();
  }, [conversationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base text-text font-body flex items-center justify-center">
        <p className="text-muted">Loading your report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-base text-text font-body flex flex-col items-center justify-center gap-4">
        <p className="text-muted">{error || "Report not found."}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm px-4 py-2 rounded-full bg-accent text-base font-medium hover:bg-accent-hover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text font-body px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-3xl">Your Report</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Fluency score - hero stat */}
        <div className="bg-surface border border-border rounded-2xl p-8 mb-6 text-center">
          <p className="text-sm text-muted mb-2">Fluency Score</p>
          <p className="font-display text-6xl text-accent">
            {report.fluencyScore}
            <span className="text-2xl text-muted">/100</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <p className="font-display text-3xl">{report.totalWords}</p>
            <p className="text-sm text-muted mt-1">Total Words</p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 text-center">
            <p className="font-display text-3xl">{report.fillerWordsCount}</p>
            <p className="text-sm text-muted mt-1">Filler Words</p>
          </div>
        </div>

        {/* Grammar feedback */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-medium text-accent mb-3">Grammar Feedback</h2>
          <p className="text-sm text-muted leading-relaxed">
            {report.grammarFeedback}
          </p>
        </div>

        {/* Vocabulary suggestions */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-medium text-accent mb-3">Vocabulary Suggestions</h2>
          <p className="text-sm text-muted leading-relaxed">
            {report.vocabularySuggestions}
          </p>
        </div>

        {/* Mispronounced words - only if any exist */}
        {report.mispronouncedWords && report.mispronouncedWords.length > 0 && (
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-sm font-medium text-accent mb-3">Words to Practice</h2>
            <div className="flex flex-wrap gap-2">
              {report.mispronouncedWords.map((w, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-base border border-border"
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/practice")}
          className="w-full mt-4 bg-accent text-base py-3 rounded-full font-medium hover:bg-accent-hover transition-colors"
        >
          Practice again
        </button>
      </div>
    </div>
  );
};

export default Reports;