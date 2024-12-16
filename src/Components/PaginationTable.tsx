// components/Pagination.tsx
import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationTable: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full justify-center mt-4">
      <Pagination
        isCompact
        showControls
        showShadow
        color="warning"
        page={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
};

export default PaginationTable;
