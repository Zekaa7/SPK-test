"use client";
import React, { useEffect, useState } from "react";
import TableIzlaz from "./TableIzlaz";
import {
  PotvrdaIzlaska,
  PotvrdaIzlaskaVozaca,
  PotvrdiIzlazakVozacaButton,
} from "../../../Interface";
import {
  fetchGetAllVoziloVozac,
  uiVozacUpdate,
  uiVoziloUpdate,
} from "../../../ApiCalls";
// import Link from "next/link";
import { Link } from "react-router-dom";

const data: PotvrdaIzlaska[] = [
  {
    regVozila: "SD-TEST-AO",
    jmbg: "3113234141243",
    ime: "TEST",
    prezime: "TESTOVIC",
    Ku: 3,
    stvari: "",
    datum: new Date().toISOString().split("T")[0],
    komentar: "Komentar_TEST",
  },
];
const columns = [
  {
    key: "regVozila",
    label: "Registracija vozila",
  },
  {
    key: "jmbg",
    label: "JMBG",
  },
  {
    key: "ime",
    label: "Ime vozaca",
  },
  {
    key: "prezime",
    label: "Prezime vozaca",
  },
  {
    key: "Ku",
    label: "Kapija ulaska",
  },
  {
    key: "stvari",
    label: "Licne stvari",
  },
  {
    key: "datum",
    label: "Datum inicijalizacije ulaska",
  },
  {
    key: "komentar",
    label: "Komentar",
  },
  {
    key: "izlazak",
    label: "Potvrda izlaska",
  },
];

function IzlazakVozila() {
  const [data, setData] = useState<PotvrdaIzlaskaVozaca[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchGetAllVoziloVozac("iz", "vz");
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
      await uiVoziloUpdate(data);
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
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
        <h2 className="text-2xl font-semibold mb-4 uppercase">
          Potvrda izlaska vozila
        </h2>
        <p className="text-gray-700 mb-6 uppercase">
          Pretraga po registarskom broju vozila
        </p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Unesite registarsku oznaku vozila"
          />
          {/* {isLoading && <span className="ml-2 text-blue-500">Loading...</span>} */}
        </div>
        {/* {isLoading ? (
              <Spinner />
            ) : (
              <TableComponent
                data={data || []}
                columns={columns}
                onConfirmEntry={handleConfirmEntry}
              />
            )} */}
        <TableIzlaz
          data={data || []}
          vozac={false}
          columns={columns}
          sendData={getData}
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

export default IzlazakVozila;
