"use client";
import React, { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import {
  PregledUlazakaIzvestaji,
  UlazIzlazKamionaIzvestaji,
  UlazIzlazProps,
} from "../../../Interface";
import { UlazIzlazFalseColumn, UlazIzlazTrueColumn } from "../../../helper";
import usePagination from "../UsePaginationProps";
import { rowsPerPageReports } from "../../../helper";
import PaginationTable from "../PaginationTable";

export default function UlazIzlazTabela({
  users,
  pregled,
}: {
  // users: UlazIzlazProps[] | PregledUlazakaIzvestaji[];
  users: UlazIzlazKamionaIzvestaji[];
  pregled: boolean;
}) {
  const {
    item: items,
    page,
    pages,
    setPage,
  } = usePagination({
    data: users,
    rowsPerPage: rowsPerPageReports,
  });
  const tableColumn = pregled ? UlazIzlazTrueColumn : UlazIzlazFalseColumn;

  return (
    <Fragment>
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px] text-lg",
        }}
      >
        <TableHeader>
          {tableColumn.map((column) => (
            <TableColumn key={column.id} className="text-lg">
              {column.ime}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={items}>
          {(item) => {
            return (
              <TableRow key={item.jmbg}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {users.length > 0 && (
        <div className="flex w-full justify-center mt-4">
          <PaginationTable
            currentPage={page}
            totalPages={pages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </Fragment>
  );
}
