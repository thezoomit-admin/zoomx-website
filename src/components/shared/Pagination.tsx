"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showPrevNext?: boolean;
  className?: string;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
  total?: number;
  showing?: number;
};

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showPrevNext = true,
  className = "",
  limit,
  onLimitChange,
  limitOptions = [10, 20, 30, 50, 100, 200],
  total,
  showing,
}: PaginationProps) {
  if (totalPages <= 1 && !onLimitChange && total === undefined) return null;

  const pages: (number | string)[] = [];
  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("...");
  }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  const handlePageChange = (page: number | string) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page as number);
  };

  const baseBtn =
    "flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200";
  const idleBtn =
    "cursor-pointer border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95";
  const disabledBtn = "cursor-not-allowed border-white/8 bg-white/2 text-white/30";
  const activeBtn =
    "scale-105 cursor-pointer border-transparent bg-linear-to-r from-[#5c2e9d] to-[#7c499d] text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)]";

  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 md:mt-12",
        className,
      )}
    >
      {totalPages > 1 ? (
        <div className="flex items-center gap-2">
          {showPrevNext && (
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={cn(baseBtn, currentPage === 1 ? disabledBtn : idleBtn)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {pages.map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="w-10 text-center text-sm font-semibold text-white/40"
                  aria-hidden
                >
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  type="button"
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                  className={cn(baseBtn, page === currentPage ? activeBtn : idleBtn)}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          {showPrevNext && (
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={cn(baseBtn, currentPage === totalPages ? disabledBtn : idleBtn)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/60">
        {total !== undefined && (
          <span>
            Showing <span className="font-semibold text-white">{showing ?? limit ?? total}</span>{" "}
            of <span className="font-semibold text-white">{total}</span>
          </span>
        )}

        {onLimitChange && limit !== undefined ? (
          <label className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              aria-label="Items per page"
              className="h-10 rounded-lg border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-white/30"
            >
              {limitOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0a0a0a] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>
    </div>
  );
}
