import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSpeechRecognition } from "../hooks/UseSR";

const API_URL = "http://localhost:3000/api";

const AIConversation = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { transcript, isListening, startListening, speak } = useSpeechRecognition();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const processedTranscript = useRef("");

  // jab naya transcript aaye (user bola), backend ko bhejo
  useEffect(() => {
    if (transcript && transcript !== processedTranscript.current) {
      processedTranscript.current = transcript;
      sendMessage(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    // user ka message turant UI me dikhao
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsThinking(true);

    try {
      const res = await axios.post(
        `${API_URL}/convo/`,
        { conversationId, message: text },
        { withCredentials: true }
      );

      const { reply, conversationId: newId } = res.data;
      if (!conversationId) setConversationId(newId);

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      speak(reply); // AI ka jawab bolna
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong. Try again." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleEndConversation = async () => {
    if (!conversationId) {
      navigate("/dashboard");
      return;
    }

    setIsGeneratingReport(true);
    try {
      await axios.post(
        `${API_URL}/report/${conversationId}`,
        {},
        { withCredentials: true }
      );
      navigate(`/reports/${conversationId}`);
    } catch (err) {
      console.error("Report generation error:", err);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-base text-text font-body flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <span className="font-display text-lg">Fluentia</span>
        <button
          onClick={handleEndConversation}
          disabled={isGeneratingReport}
          className="text-sm px-4 py-2 rounded-full bg-accent text-base font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {isGeneratingReport ? "Generating report..." : "End conversation"}
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
        {messages.length === 0 && (
          <p className="text-muted text-center mt-16">
            Tap the mic below and start talking — say hi to get going.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "self-end bg-accent text-base"
                  : "self-start bg-surface border border-border text-text"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {isThinking && (
            <div className="self-start bg-surface border border-border px-4 py-3 rounded-2xl text-sm text-muted">
              Thinking...
            </div>
          )}
        </div>
        <div ref={chatEndRef} />
      </div>

      {/* Mic control */}
      <div className="flex flex-col items-center gap-3 pb-12 pt-4">
        <button
          onClick={startListening}
          disabled={isListening || isThinking}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? "bg-accent scale-110"
              : "bg-surface border border-border hover:border-accent"
          } disabled:opacity-60`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isListening ? "#16131A" : "#F2A93B"} strokeWidth="1.6">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
            <line x1="12" y1="18" x2="12" y2="22" />
          </svg>
        </button>
        <p className="text-xs text-muted">
          {isListening ? "Listening..." : "Tap to speak"}
        </p>

{messages.length > 0 && (
    <button
      onClick={handleEndConversation}
      disabled={isGeneratingReport}
      className="mt-2 text-sm px-5 py-2 rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
    >
      {isGeneratingReport ? "Generating report..." : "End conversation"}
    </button>
  )}
        
      </div>
    </div>
  );
};

export default AIConversation;