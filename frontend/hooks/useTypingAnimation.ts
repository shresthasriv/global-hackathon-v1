import { useState, useEffect, useRef } from "react";

interface UseTypingAnimationOptions {
  speed?: number; // Characters per second
  enabled?: boolean; // Enable/disable animation
}

export function useTypingAnimation(
  text: string,
  options: UseTypingAnimationOptions = {}
) {
  const { speed = 50, enabled = true } = options; // 50 chars/sec = 20ms per char
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef(text);
  const displayedLengthRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    // If text gets shorter (reset), start over
    if (text.length < textRef.current.length) {
      textRef.current = text;
      displayedLengthRef.current = 0;
      setDisplayedText("");
      setIsTyping(text.length > 0);
      return;
    }

    textRef.current = text;

    // If we're already showing all text, no animation needed
    if (displayedLengthRef.current >= text.length) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const charsPerFrame = Math.max(1, Math.floor(speed / 60)); // At 60fps
    const interval = setInterval(() => {
      setDisplayedText((current) => {
        const currentLength = displayedLengthRef.current;
        const newLength = Math.min(
          currentLength + charsPerFrame,
          textRef.current.length
        );
        displayedLengthRef.current = newLength;

        if (newLength >= textRef.current.length) {
          setIsTyping(false);
          clearInterval(interval);
        }

        return textRef.current.slice(0, newLength);
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayedText, isTyping };
}
