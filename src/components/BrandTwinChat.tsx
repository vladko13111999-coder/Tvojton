"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Message, sendMessage } from "@/lib/api";

export default function BrandTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Ahoj! Som Brand Twin, AI asistent pre tvojton.online. Ako ti dnes môžem pomôcť?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(input.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer || "Ospravedlňujem sa, niečo sa pokazilo. Skúste to prosím znova.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nepodarilo sa odoslať správu");
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Ups! Nastala chyba: ${err instanceof Error ? err.message : "Nepodarilo sa spojiť s API"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-brand-600 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Brand Twin AI</h1>
              <p className="text-brand-100 text-sm">AI asistent pre tvojton.online</p>
            </div>
          </div>
        </div>

        <div className="chat-container overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-animation flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-brand-600 text-white rounded-br-md"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.role === "user" ? "text-brand-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("sk-SK", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="typing-indicator flex gap-1">
                  <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
                  <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
                  <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-sm">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napíšte správu..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Odosielam..." : "Odoslať"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Podporované jazyky: Slovenčina, Čeština, Chorvatčina, Angličtina
          </p>
        </form>
      </div>
    </div>
  );
}
