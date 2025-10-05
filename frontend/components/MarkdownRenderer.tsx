/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1
              className="font-serif text-4xl font-bold text-[#3E2723] mb-6 mt-8 first:mt-0"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="font-serif text-3xl font-bold text-[#3E2723] mb-4 mt-8 border-b-2 border-[#E5D5C3] pb-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="font-serif text-2xl font-semibold text-[#8B7355] mb-3 mt-6"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="font-serif text-xl font-semibold text-[#8B7355] mb-2 mt-4"
              {...props}
            />
          ),

          // Paragraphs
          p: ({ node, ...props }) => (
            <p
              className="text-[#3E2723] text-lg leading-relaxed mb-4"
              {...props}
            />
          ),

          // Strong (bold)
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-[#3E2723]" {...props} />
          ),

          // Emphasis (italic)
          em: ({ node, ...props }) => (
            <em className="italic text-[#8B7355]" {...props} />
          ),

          // Lists
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-outside ml-6 mb-4 text-[#3E2723] space-y-2"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-outside ml-6 mb-4 text-[#3E2723] space-y-2"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="text-lg leading-relaxed" {...props} />
          ),

          // Blockquote
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-[#D4AF37] bg-[#FFF8F0] pl-6 pr-4 py-4 my-6 italic text-[#8B7355] text-xl"
              {...props}
            />
          ),

          // Horizontal Rule
          hr: ({ ...props }) => (
            <hr className="border-t-2 border-[#E5D5C3] my-8" {...props} />
          ),

          // Code (inline)
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="bg-[#FFF8F0] text-[#8B7355] px-2 py-1 rounded text-sm font-mono"
                {...props}
              />
            ) : (
              <code
                className="block bg-[#FFF8F0] text-[#3E2723] p-4 rounded-lg overflow-x-auto text-sm font-mono my-4 border-2 border-[#E5D5C3]"
                {...props}
              />
            ),

          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-[#8B7355] underline hover:text-[#D4AF37] transition-colors"
              {...props}
            />
          ),

          // Images
          img: ({ node, ...props }) => (
            <img
              className="rounded-lg shadow-md my-6 max-w-full h-auto"
              {...props}
            />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full border-2 border-[#E5D5C3]"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-[#8B7355] text-white" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="bg-white" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="border-b border-[#E5D5C3]" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-[#3E2723]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
