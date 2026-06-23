"use client";

import { useState } from "react";
import { Pagination } from "@/components/shared/Pagination";

export function BlogPagination({ totalPages = 5 }: { totalPages?: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showPrevNext={true}
    />
  );
}
