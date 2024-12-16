"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { fetchGetAllVoziloVozac, uiVoziloUpdate } from "../../ApiCalls";
import type { PotvrdaUlaskavozila, UiVoziloUpdate } from "../../Interface";
import { Spinner } from "react-bootstrap";
// import Link from "next/link";
import { Link } from "react-router-dom";

type confirmType = {
  uiVzId: number;
  uiVoId: number;
  potvrdiPonisti: boolean;
  ulazIzlaz: string;
};

const columns = [
  { key: "registracija", label: "Registracija vozila" },
  { key: "jmbg", label: "JMBG" },
  { key: "ime", label: "Ime vozaca" },
  { key: "prezime", label: "Prezime vozaca" },
  { key: "datum", label: "Datum inicijalizacije ulaska" },
  { key: "komentar", label: "Komentar" },
  { key: "ulazak", label: "Potvrdi ulazak" },
  { key: "ponisti", label: "Ponisti ulazak" },
];

function PotvrdaUlaskavozila() {
  const [regOznaka, setRegOznaka] = useState<string>("");
  const [data, setData] = useState<PotvrdaUlaskavozila[] | null>(null);
  const [filteredData, setFilteredData] = useState<PotvrdaUlaskavozila[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const regOznakaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegOznaka(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetAllVoziloVozac("ul", "vz");

        if (response?.value == null) {
          setData([]);
        } else {
          setData(response.value);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [isClicked]);
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((item) =>
          item.regVozila.toUpperCase().includes(regOznaka.toUpperCase())
        )
      );
    }
  }, [regOznaka, data]);

  const confirmEntryHandler = async (obj: UiVoziloUpdate) => {
    console.log(obj);
    try {
      await uiVoziloUpdate(obj);
      setIsClicked((prev) => !prev);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
        <h2 className="text-2xl font-semibold mb-4 uppercase">
          Potvrda ulaska vozila
        </h2>
        <p className="text-gray-700 mb-6 uppercase">
          Pretraga po registarskom broju vozila
        </p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Unesite registarsku oznaku vozila"
            onChange={regOznakaHandler}
          />
        </div>
        {isLoading && <Spinner />}
        <TableComponent
          columns={columns}
          data={filteredData}
          ponovniUlazak={false}
          onConfirmEntry={confirmEntryHandler}
          onCancelEntry={confirmEntryHandler}
        />
        <div className="pt-8 flex justify-center">
          <Link
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            to={"/"}
          >
            Nazad
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PotvrdaUlaskavozila;
