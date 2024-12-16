"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { PotvrdaIzlaskaVozaca } from "../../Interface";
import { Pagination } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { rowsPerPage } from "../../helper";
import PaginationTable from "./PaginationTable";
import usePagination from "./UsePaginationProps";
import React from "react";
type Column = {
  key: string;
  label: string;
};
type RowData = {
  key: number;
  jmbg: string;
  ime: string;
  prezime: string;
  brPasosa: string;
  registracija: string;
  komentar?: string;
  datum?: string;
  uiVzId?: number;
  uiVoId?: number;
};

export default function TableComponent({
  data,
  columns,
  onConfirmEntry,
  onCancelEntry,
  ponovniUlazak,
}: {
  data: PotvrdaIzlaskaVozaca[];
  columns: Column[];
  onConfirmEntry?: (obj: {
    uiVzId?: number;
    uiVoId: number;
    potvrdiPonisti: boolean;
    ulazIzlaz: string;
  }) => void;
  onCancelEntry?: (obj: {
    uiVzId: number;
    uiVoId: number;
    potvrdiPonisti: boolean;
    ulazIzlaz: string;
  }) => void;
  ponovniUlazak: boolean;
}) {
  const { item, page, pages, setPage } = usePagination({ data, rowsPerPage });

  const rows: RowData[] = ponovniUlazak
    ? (item as PotvrdaIzlaskaVozaca[]).map((item, index) => ({
        key: index,
        jmbg: item.jmbg,
        ime: item.ime,
        prezime: item.prezime,
        brPasosa: item.brPasosa || "", // Default to empty string if undefined
        registracija: item.regVozila || "",
        uiVzId: item.uiVzId,
        uiVoId: item.uiVoId,
      }))
    : (item as PotvrdaIzlaskaVozaca[]).map((item, index) => ({
        key: index,
        jmbg: item.jmbg,
        ime: item.ime,
        prezime: item.prezime,
        brPasosa: item.brPasosa || "",
        registracija: item.regVozila,
        komentar: item.komentar || "",
        datum: item.insertDate || "",
        uiVzId: item.uiVzId,
        uiVoId: item.uiVoId,
      }));
  return (
    <div className="mt-6 overflow-x-auto">
      <Table
        aria-label="Example table with client side pagination"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-400 p-4 text-left"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key} className="hover:bg-gray-50">
              {(columnKey) => {
                if (columnKey === "ulazak") {
                  return (
                    <TableCell className="border-b border-gray-200 p-4 text-gray-700">
                      <button
                        onClick={() => {
                          if (!ponovniUlazak) {
                            onConfirmEntry?.({
                              uiVzId: item.uiVzId!,
                              uiVoId: item.uiVoId!,
                              potvrdiPonisti: true,
                              ulazIzlaz: "ul",
                            });
                          } else {
                            onConfirmEntry?.({
                              uiVoId: item.uiVoId!,
                              potvrdiPonisti: false,
                              ulazIzlaz: "ul",
                            });
                          }
                        }}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        Potvrdi
                      </button>
                    </TableCell>
                  );
                } else if (columnKey === "ponisti") {
                  return (
                    <TableCell className="border-b border-gray-200 p-4 text-gray-700">
                      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
                        Ponisti
                      </button>
                    </TableCell>
                  );
                }

                return (
                  <TableCell className="border-b border-gray-200 p-4 text-gray-700">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Conditionally render Pagination */}
      {data.length > 0 && (
        <div className="flex w-full justify-center mt-4">
          <PaginationTable
            currentPage={page}
            totalPages={pages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
