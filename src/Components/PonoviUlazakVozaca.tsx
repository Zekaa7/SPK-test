"use client";
import React, { useEffect, useState } from "react";
import { PotvrdaIzlaskaVozaca, UiVozacUpdate } from "../../Interface";
import { fetchGetAllVoziloVozac, uiVozacUpdate } from "../../ApiCalls";
import TableComponent from "./TableComponent";
import { Spinner } from "react-bootstrap";
// import Link from "next/link";
import { Link } from "react-router-dom";

const columns = [
  {
    key: "jmbg",
    label: "JMBG",
  },
  {
    key: "ime",
    label: "Ime vozača",
  },
  {
    key: "prezime",
    label: "Prezime vozača",
  },
  {
    key: "brPasosa",
    label: "Br. lične isprave",
  },
  {
    key: "registracija",
    label: "Registracija vozila",
  },
  {
    key: "ulazak",
    label: "Potvrda ulaska",
  },
];

function PonoviUlazakVozaca() {
  const [jmbg, setJmbg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<
    PotvrdaIzlaskaVozaca[] | null
  >();
  const [data, setData] = useState<PotvrdaIzlaskaVozaca[] | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJmbg(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setIsValid(true);
    }, 1000);

    setDebounceTimeout(timeout);
  };
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetchGetAllVoziloVozac("ul", "vo");
      console.log("response", response);
      console.log(response);
      if (response?.value == null) {
        setIsValid(false);
        setData([]);
      } else {
        setData(
          Array.isArray(response.value) ? response.value : [response.value]
        );
      }
      setIsLoading(false);
    };
    getData();
  }, []);
  //Filter data

  useEffect(() => {
    if (jmbg) {
      setFilteredData(
        data?.filter((item) =>
          item.jmbg.toUpperCase().includes(jmbg.toUpperCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [jmbg, data]);

  const handleConfirmEntry = async (data: UiVozacUpdate) => {
    try {
      await uiVozacUpdate(data);
      console.log("Data successfully sent to the server.");
      setData((prevData) =>
        prevData!.filter((item) => item.uiVoId !== data.uiVoId)
      );
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ponovni ulazak vozača</h2>
        <p className="text-gray-700 mb-6">PRETRAGA PO JMBG - u VOZAČA</p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Unesite JMBG vozača"
            onChange={handleInputChange}
            value={jmbg}
          />
          {/* {isLoading && <span className="ml-2 text-blue-500">Loading...</span>} */}
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <TableComponent
            data={filteredData || []}
            columns={columns}
            onConfirmEntry={handleConfirmEntry}
            ponovniUlazak={true}
          />
        )}
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

export default PonoviUlazakVozaca;
