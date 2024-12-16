// hooks/usePagination.ts
import { useState, useMemo } from "react";

interface UsePaginationProps {
  data: any[];
  rowsPerPage: number;
}

const usePagination = ({ data, rowsPerPage }: UsePaginationProps) => {
  const [page, setPage] = useState<number>(1);

  const pages = Math.ceil(data.length / rowsPerPage);

  const item = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  return {
    page,
    setPage,
    pages,
    item,
  };
};

export default usePagination;
