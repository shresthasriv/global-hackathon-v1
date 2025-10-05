"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, ArrowRight } from "lucide-react";
import {
  getUserBlogs,
  getUserFromStorage,
  type MemoryBlog,
} from "@/lib/api/dummy";
import Link from "next/link";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<MemoryBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      const currentUser = getUserFromStorage();
      if (!currentUser) {
        router.push("/onboarding/step-1");
        return;
      }

      setUser(currentUser);

      try {
        const userBlogs = await getUserBlogs(currentUser.email);
        setBlogs(userBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="animate-pulse text-[#8B7355] text-xl">
          Loading your memory blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F5EEE6]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#E5D5C3] shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B7355] to-[#D4AF37] flex items-center justify-center"> */}
                {/* <BookOpen className="w-6 h-6 text-white" /> */}
              {/* </div> */}
              <div>
                <h1 className="font-serif font-bold text-2xl text-[#3E2723]">
                  Memory Blogs
                </h1>
                <p className="text-sm text-[#8B7355]">
                  {user?.name}'s Collection
                </p>
              </div>
            </div>
            <Link href="/onboarding/step-2">
              <Button className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355]">
                <Plus className="w-5 h-5 mr-2" />
                Capture New Memory
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {blogs.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            {/* <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFF8F0] border-4 border-[#E5D5C3] flex items-center justify-center"> */}
              {/* <BookOpen className="w-12 h-12 text-[#8B7355]" /> */}
            {/* </div> */}
            <h2 className="font-serif text-3xl font-bold text-[#3E2723] mb-4">
              No Memory Blogs Yet
            </h2>
            <p className="text-lg text-[#8B7355] mb-8">
              Start preserving precious memories by creating your first memory
              blog. Each conversation can be transformed into a beautiful story.
            </p>
            <Link href="/onboarding/step-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] hover:from-[#7A6348] hover:to-[#8B7355]"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Memory
              </Button>
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-2">
                Your Memory Collection
              </h2>
              <p className="text-[#8B7355]">
                {blogs.length} {blogs.length === 1 ? "story" : "stories"}{" "}
                preserved
              </p>
            </div>

            <div className="space-y-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.id}`}>
                  <div className="group bg-white border-2 border-[#E5D5C3] rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {/* <BookOpen className="w-5 h-5 text-[#8B7355]" /> */}
                          <span className="text-sm font-medium text-[#8B7355]">
                            {blog.grandparent_name}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-3 group-hover:text-[#8B7355] transition-colors">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(blog.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF8F0] group-hover:bg-[#8B7355] transition-colors">
                        <ArrowRight className="w-5 h-5 text-[#8B7355] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
