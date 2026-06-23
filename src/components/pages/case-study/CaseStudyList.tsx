"use client";

import { useState } from "react";

import { CaseStudyCard, type CaseStudy } from "@/components/card/CaseStudyCard";
import { Pagination } from "@/components/shared/Pagination";

const PER_PAGE = 3;

export function CaseStudyList({ cases }: { cases: CaseStudy[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cases.length / PER_PAGE);
  const start = (currentPage - 1) * PER_PAGE;
  const visible = cases.slice(start, start + PER_PAGE);

  return (
    <>
      {visible.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.index} caseStudy={caseStudy} />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
