"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mic,
  MicOff,
  Send,
  Keyboard,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import {
  getMemorySpace,
  getInitialPrompt,
  sendMessage,
  type ConversationMessage,
} from "@/lib/api/dummy";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

function ConversationContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [memorySpace, setMemorySpace] = useState<any>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<"voice" | "text">("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = params.token as string;

  // Speech Recognition Hook
  const {
    isListening,
    isSupported,
    error: speechError,
    listen,
  } = useSpeechRecognition({
    lang: "en-US",
  });

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "voice" || modeParam === "text") {
      setMode(modeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const space = await getMemorySpace(token);
        if (space) {
          setMemorySpace(space);
          // Get initial prompt
          const initialMessage = await getInitialPrompt(space.id);
          setMessages([initialMessage]);
        } else {
          alert("Memory space not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading session:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [token, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputText;
    if (!messageText.trim() || !memorySpace) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setSending(true);

    try {
      const aiResponse = await sendMessage(memorySpace.id, messageText);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceRecord = async () => {
    if (!isSupported) {
      alert(
        "Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari."
      );
      return;
    }

    if (isListening) {
      // Already listening, can't start another
      return;
    }

    try {
      // Start listening and wait for result
      const transcript = await listen();

      if (transcript) {
        // Append to existing input text
        setInputText((prev) => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed} ${transcript}` : transcript;
        });
        // Don't auto-send - let user click send button
      }
    } catch (error) {
      console.error("Voice recognition error:", error);
    }
  };

  const toggleMode = () => {
    setMode(mode === "voice" ? "text" : "voice");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">
          Loading conversation...
        </div>
      </div>
    );
  }

  if (!memorySpace) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#E5D5C3] shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-[#3E2723]">
                  {memorySpace.grandparent_name}'s Stories
                </h1>
                <p className="text-sm text-[#8B7355]">
                  {mode === "voice" ? "🎤 Voice Mode" : "⌨️ Text Mode"}
                </p>
              </div>
            </div>
            <Button
              onClick={toggleMode}
              variant="outline"
              className="border-2 border-[#E5D5C3] hover:bg-[#FFF8F0]"
            >
              {mode === "voice" ? (
                <>
                  <Keyboard className="w-4 h-4 mr-2" />
                  Switch to Text
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Switch to Voice
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 container mx-auto px-6 py-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-[#8B7355] to-[#A0826D] text-white"
                    : "bg-white border-2 border-[#E5D5C3] text-[#3E2723]"
                }`}
              >
                <p className="text-base leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border-2 border-[#E5D5C3] rounded-2xl p-4 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8B7355] animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-[#8B7355] animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-[#8B7355] animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-[#E5D5C3] shadow-lg sticky bottom-0">
        <div className="container mx-auto px-6 py-4">
          <div className="max-w-3xl mx-auto">
            {/* Error Message for Voice */}
            {mode === "voice" && speechError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  {speechError === "not-allowed"
                    ? "Microphone access denied. Please enable it in your browser settings."
                    : "Voice recognition error. Please try again."}
                </span>
              </div>
            )}

            {mode === "text" ? (
              <div className="flex gap-3">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your memory..."
                  disabled={sending}
                  className="flex-1 h-12 text-base"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || sending}
                  className="h-12 px-6 bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Voice Input Display */}
                {inputText && (
                  <div className="bg-[#FFF8F0] border-2 border-[#E5D5C3] rounded-lg p-4 min-h-[60px]">
                    <p className="text-[#3E2723] text-base leading-relaxed">
                      {inputText}
                    </p>
                  </div>
                )}

                {/* Voice Controls */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={handleVoiceRecord}
                    disabled={!isSupported || isListening}
                    className={`h-16 w-16 rounded-full ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355]"
                    } shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={
                      !isSupported
                        ? "Voice not supported in this browser"
                        : isListening
                        ? "Listening..."
                        : "Click to speak"
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>

                  {inputText.trim() && !isListening && (
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={sending}
                      className="h-12 px-6 bg-gradient-to-r from-[#A8B89F] to-[#8B9B82] hover:from-[#97A78E] hover:to-[#7A8A71]"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send
                    </Button>
                  )}
                </div>

                <p className="text-center text-xs text-[#8B7355]">
                  {isListening ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Listening... Speak now
                    </span>
                  ) : inputText.trim() ? (
                    "Click mic to add more, or click Send when ready"
                  ) : (
                    "Click the microphone to speak. Recording stops automatically when you finish."
                  )}
                </p>
              </div>
            )}

            {!isListening && (
              <p className="text-center text-xs text-[#8B7355]/70 mt-2">
                Take your time. Every memory is precious. ✨
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConversationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ConversationContent />
    </Suspense>
  );
}
