import React from "react";

interface InlineMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Lightweight inline markdown renderer for chat messages
 * Supports: **bold**, *italic*, `code`, and line breaks
 */
export function InlineMarkdown({
  content,
  className = "",
}: InlineMarkdownProps) {
  const parseMarkdown = () => {
    const parts: React.ReactNode[] = [];
    let key = 0;

    // Regex patterns for markdown
    const patterns = [
      { regex: /\*\*(.+?)\*\*/g, tag: "strong" }, // **bold**
      { regex: /\*(.+?)\*/g, tag: "em" }, // *italic*
      { regex: /`(.+?)`/g, tag: "code" }, // `code`
    ];

    const processText = (input: string): React.ReactNode[] => {
      const elements: React.ReactNode[] = [];
      let match;
      let lastIndex = 0;

      // Find all markdown patterns
      const allMatches: Array<{
        start: number;
        end: number;
        content: string;
        tag: string;
      }> = [];

      patterns.forEach(({ regex, tag }) => {
        const re = new RegExp(regex.source, "g");
        while ((match = re.exec(input)) !== null) {
          allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            content: match[1],
            tag,
          });
        }
      });

      // Sort by start position
      allMatches.sort((a, b) => a.start - b.start);

      // Process matches in order
      allMatches.forEach((m) => {
        // Add text before match
        if (m.start > lastIndex) {
          const text = input.slice(lastIndex, m.start);
          if (text) elements.push(text);
        }

        // Add formatted element
        if (m.tag === "strong") {
          elements.push(
            <strong key={`md-${key++}`} className="font-bold">
              {m.content}
            </strong>
          );
        } else if (m.tag === "em") {
          elements.push(
            <em key={`md-${key++}`} className="italic">
              {m.content}
            </em>
          );
        } else if (m.tag === "code") {
          elements.push(
            <code
              key={`md-${key++}`}
              className="bg-[#FFF8F0] text-[#8B7355] px-1.5 py-0.5 rounded text-sm font-mono"
            >
              {m.content}
            </code>
          );
        }

        lastIndex = m.end;
      });

      // Add remaining text
      if (lastIndex < input.length) {
        elements.push(input.slice(lastIndex));
      }

      return elements.length > 0 ? elements : [input];
    };

    // Split by lines and process each
    const lines = content.split("\n");
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        parts.push(<br key={`br-${lineIndex}`} />);
      }
      parts.push(...processText(line));
    });

    return parts;
  };

  return <span className={className}>{parseMarkdown()}</span>;
}
