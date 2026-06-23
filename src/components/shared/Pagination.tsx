"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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

  const navBtn =
    "h-10 w-10 rounded-lg border border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95 disabled:bg-white/2 disabled:text-white/30 disabled:border-white/8";
  const pageBtn = navBtn;
  const activeBtn =
    "h-10 w-10 rounded-lg scale-105 from-[#5c2e9d] to-[#7c499d]";

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
            <Button
              type="button"
              variant="outline"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={navBtn}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
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
                <Button
                  key={`page-${page}`}
                  type="button"
                  variant={page === currentPage ? "brand" : "outline"}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? activeBtn : pageBtn}
                >
                  {page}
                </Button>
              ),
            )}
          </div>

          {showPrevNext && (
            <Button
              type="button"
              variant="outline"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={navBtn}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
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
