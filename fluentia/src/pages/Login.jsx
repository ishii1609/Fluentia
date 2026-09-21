import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#16131A] text-[#F3EFE7] flex items-center justify-center px-6 font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#211C26] border border-[#3A3440] p-8 rounded-2xl"
      >
        <h2 className="font-display text-3xl text-center mb-8">Welcome back</h2>

        {error && (
          <p className="text-sm text-[#F2A93B] mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#16131A] border border-[#3A3440] rounded-lg px-4 py-2.5 mb-4 text-[#F3EFE7] placeholder-[#A79E96] focus:outline-none focus:border-[#F2A93B] transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#16131A] border border-[#3A3440] rounded-lg px-4 py-2.5 mb-6 text-[#F3EFE7] placeholder-[#A79E96] focus:outline-none focus:border-[#F2A93B] transition-colors"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#F2A93B] text-[#16131A] py-2.5 rounded-lg font-medium hover:bg-[#f5b85e] transition-colors"
        >
          Log in
        </button>

        <p className="text-sm text-center mt-6 text-[#A79E96]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#F2A93B] font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;