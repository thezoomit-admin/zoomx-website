"use client";

import { useState } from "react";

import { BlogCard, type BlogPost } from "@/components/card/BlogCard";
import { Pagination } from "@/components/shared/Pagination";

const POSTS_PER_PAGE = 3;

export function BlogPostsList({ posts }: { posts: BlogPost[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visible = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
