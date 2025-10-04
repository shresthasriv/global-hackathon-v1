import { useState, useEffect } from "react";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface UseSpeechRecognitionProps {
  lang?: string;
}

export function useSpeechRecognition({
  lang = "en-US",
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
      }
    }
  }, []);

  // Simple async function to record and return the transcript
  const listen = async (): Promise<string> => {
    if (!isSupported) {
      throw new Error("Speech recognition not supported");
    }

    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false; // Stop automatically after speech
      recognition.interimResults = true;
      recognition.lang = lang;

      let finalTranscript = "";

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        if (event.error !== "aborted") {
          setError(event.error);
          reject(new Error(event.error));
        } else {
          resolve(finalTranscript.trim());
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        resolve(finalTranscript.trim());
      };

      try {
        recognition.start();
      } catch (err: any) {
        setIsListening(false);
        setError(err.message);
        reject(err);
      }
    });
  };

  return {
    isListening,
    isSupported,
    error,
    listen,
  };
}
