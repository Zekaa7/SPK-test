"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import TableIzlaz from "./TableIzlaz";
import {
  PotvrdaIzlaskaVozaca,
  PotvrdiIzlazakVozacaButton,
} from "../../../Interface";
import { fetchGetAllVoziloVozac, uiVozacUpdate } from "../../../ApiCalls";
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
    key: "regVozila",
    label: "Registracija vozila",
  },
  {
    key: "poslednjiUlaz",
    label: "Poslednji ulazak",
  },
  {
    key: "izlazak",
    label: "Potvrda izlaska",
  },
];

function IzlazakVozaca() {
  const [data, setData] = useState<PotvrdaIzlaskaVozaca[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchGetAllVoziloVozac("iz", "vo");
        if (response?.value == null) {
          setData([]);
        } else {
          setData(response.value);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getData();
  }, []);

  const getData = async (data: PotvrdiIzlazakVozacaButton) => {
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
        <h2 className="text-2xl font-semibold mb-4">Potvrda izlaska vozača</h2>
        <p className="text-gray-700 mb-6">PRETRAGA PO JMBG - u VOZAČA</p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Unesite JMBG vozača"
          />
          {/* {isLoading && <span className="ml-2 text-blue-500">Loading...</span>} */}
        </div>
        {data ? (
          <TableIzlaz
            data={data || []}
            columns={columns}
            vozac={true}
            sendData={getData}
          />
        ) : (
          <Spinner />
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

export default IzlazakVozaca;
