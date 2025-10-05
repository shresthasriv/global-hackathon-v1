"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { getStoryById, type Story } from "@/lib/api/client";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Link from "next/link";

export default function BlogViewPage() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  const blogId = params.id as string;

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogData = await getStoryById(blogId);
        if (blogData) {
          setBlog(blogData);
        } else {
          alert("Blog not found");
          router.push("/blogs");
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        router.push("/blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogId, router]);

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: `Check out this memory: ${blog.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    }
  };

  // Commented out for now - download feature not implemented
  // const handleDownload = () => {

  const handleDownload = () => {
    if (!blog || !blog.content) return;

    const element = document.createElement("a");
    const file = new Blob([blog.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${blog.title.replace(/[^a-z0-9]/gi, "_")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">
          Loading memory blog...
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#E5D5C3] shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blogs">
              <Button
                variant="outline"
                className="border-2 border-[#E5D5C3] hover:bg-[#FFF8F0]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-2 border-[#E5D5C3] hover:bg-[#FFF8F0]"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {/* <Button
                variant="outline"
                onClick={handleDownload}
                className="border-2 border-[#E5D5C3] hover:bg-[#FFF8F0]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              {/* <BookOpen className="w-6 h-6 text-[#8B7355]" /> */}
              <span className="text-lg font-medium text-[#8B7355]">
                {blog.grandparent_name}
              </span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-[#3E2723] mb-6">
              {blog.title}
            </h1>
            {/* <div className="flex items-center gap-2 text-[#8B7355]">
              <Calendar className="w-5 h-5" />
              <span>
                Created on{" "}
                {new Date(blog.created_at || blog.generated_at || Date.now()).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div> */}
          </div>

          {/* Markdown Content */}
          <div className="bg-white border-2 border-[#E5D5C3] rounded-xl p-8 md:p-12 shadow-lg">
            <MarkdownRenderer content={blog.content} />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white border-2 border-[#E5D5C3] rounded-xl px-6 py-4 shadow-md">
              <p className="text-[#8B7355] italic">
                &quot;Every memory preserved is a gift to future
                generations.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
