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
import React from "react";
import {
  PotvrdaIzlaska,
  PotvrdaIzlaskaVozaca,
  PotvrdiIzlazakVozacaButton,
  RowData,
} from "../../../Interface";
import { Pagination } from "@nextui-org/react";
import usePagination from "../UsePaginationProps";
import { rowsPerPage } from "../../../helper";
import PaginationTable from "../PaginationTable";
type Column = {
  key: string;
  label: string;
};

type RowDataa = PotvrdaIzlaskaVozaca & { key: number }; // Include all properties from PotvrdaIzlaskaVozaca

function TableIzlaz({
  data,
  columns,
  vozac,
  sendData,
}: {
  data: PotvrdaIzlaskaVozaca[] | PotvrdaIzlaskaVozaca[]; // Keep it generic as before
  columns: Column[];
  vozac: boolean;
  sendData: (data: PotvrdiIzlazakVozacaButton) => void;
}) {
  const { item, page, pages, setPage } = usePagination({ data, rowsPerPage });
  const rows: RowDataa[] = vozac
    ? (item as PotvrdaIzlaskaVozaca[]).map((item, index) => ({
        key: index,
        jmbg: item.jmbg,
        ime: item.ime,
        prezime: item.prezime,
        brPasosa: item.brPasosa,
        regVozila: item.regVozila,
        poslednjiUlaz: item.uiVoUlaz,
        uiVoId: item.uiVoId,
      }))
    : (item as PotvrdaIzlaskaVozaca[]).map((item, index) => ({
        key: index,
        jmbg: item.jmbg,
        ime: item.ime,
        prezime: item.prezime,
        regVozila: item.regVozila,
        Ku: item.ku || "",
        stvari: item.licneStvari || "/",
        datum: item.uiVzUlaz,
        komentar: item.komentar || "",
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
                if (columnKey === "izlazak") {
                  return (
                    <TableCell className="border-b border-gray-200 p-4 text-gray-700">
                      <button
                        key={item.uiVoId}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                        onClick={() => {
                          if (vozac) {
                            sendData({
                              uiVoId: item.uiVoId!,
                              potvrdiPonisti: true,
                              ulazIzlaz: "iz",
                            });
                          } else {
                            sendData({
                              uiVoId: item.uiVoId!,
                              uiVzId: item.uiVzId!,
                              potvrdiPonisti: true,
                              ulazIzlaz: "iz",
                            });
                          }
                        }}
                      >
                        Potvrdi
                      </button>
                    </TableCell>
                  );
                }

                return (
                  <TableCell className="border-b border-gray-200 p-4 text-gray-700">
                    {getKeyValue(item, columnKey)}{" "}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default TableIzlaz;
