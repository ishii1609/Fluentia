import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${API_URL}/report/all`, {
          withCredentials: true,
        });
        setReports(res.data);
      } catch (err) {
        console.error("Reports list error:", err);
        setError("Couldn't load your reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base text-text font-body flex items-center justify-center">
        <p className="text-muted text-sm">Loading your reports...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text font-body px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-3xl">My Reports</h1>
          <Link to="/dashboard" className="text-sm text-muted hover:text-text transition-colors">
            Back to Dashboard
          </Link>
        </div>

        {error && <p className="text-sm text-accent mb-6">{error}</p>}

        {!error && reports.length === 0 && (
          <div className="bg-surface border border-border rounded-2xl p-10 text-center">
            <p className="text-muted text-sm mb-4">
              No reports yet — finish a practice session to see your first one.
            </p>
            <Link
              to="/practice"
              className="inline-block text-sm px-5 py-2 rounded-full bg-accent text-base font-medium hover:bg-accent-hover transition-colors"
            >
              Start practicing
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <Link
              key={report._id}
              to={`/reports/${report.conversation}`}
              className="bg-surface border border-border rounded-2xl p-6 flex items-center justify-between hover:border-accent transition-colors"
            >
              <div>
                <p className="text-sm text-muted mb-1">
                  {new Date(report.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-text">
                  {report.totalWords} words · {report.fillerWordsCount} filler words
                </p>
              </div>
              <div className="font-display text-2xl text-accent">
                {report.fluencyScore}
                <span className="text-sm text-muted">/100</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsList;