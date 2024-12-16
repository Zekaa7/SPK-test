"use client";

// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDataContext } from "../../Context/getData";
import { Link } from "react-router-dom";

interface InfoProp {
  stvari: string;
  komentar: string;
}

function RegistracijaUlaskaVozila({
  href1,
  href2,
  plus,
}: {
  href1: string;
  href2: string;
  plus: boolean;
}) {
  const [weight, setWeight] = useState<number | undefined>(0);
  const [dokument, setDokument] = useState<string>("");
  const [info, setInfo] = useState<InfoProp>({
    stvari: "",
    komentar: "",
  });

  const [weightTimer, setWeightTimer] = useState<number | null>(null);
  const [infoTimer, setInfoTimer] = useState<number | null>(null);
  const { getNosivostData } = useDataContext();

  const changeDokumentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDokument(value);
  };

  const changeWeightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (weightTimer) {
      clearTimeout(weightTimer);
    }

    const newTimer = setTimeout(() => {
      if (value > 0) {
        setWeight(value);
      } else {
        setWeight(0);
      }
    }, 800);

    setWeightTimer(newTimer);
  };

  const changeInfoHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    if (infoTimer) {
      clearTimeout(infoTimer);
    }

    const newTimer = setTimeout(() => {
      setInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, 1000);
    setInfoTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (weightTimer) {
        clearTimeout(weightTimer);
      }
      if (infoTimer) {
        clearTimeout(infoTimer);
      }
    };
  }, [weightTimer, infoTimer]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/5 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          PRIPREMA VOZILA ZA ULAZAK
        </h2>

        <p className="text-gray-700 mb-6">REGISTRACIJA ULASKA VOZILA</p>

        <div className="flex flex-col items-center">
          {plus && (
            <div className="mb-4 w-full">
              <label className="text-left block mb-1">Broj dokumenta:</label>
              <input
                type="string"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Unesite broj dokumenta"
                onChange={changeDokumentHandler}
                required
              />
            </div>
          )}

          <div className="mb-4 w-full">
            <label className="text-left block mb-1">Nosivost vozila:</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Unesite nosivost vozila"
              onChange={changeWeightHandler}
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label className="text-left block mb-1">Lične stvari vozača:</label>
            <textarea
              name="stvari"
              className="w-full p-2 border border-gray-300 rounded min-h-[100px] max-h-[170px] resize-y"
              placeholder="Unesite lične stvari vozača"
              required
              onChange={changeInfoHandler}
            />
          </div>

          <div className="mb-4 w-full">
            <label className="text-left block mb-1">Komentar:</label>
            <textarea
              name="komentar"
              className="w-full p-2 border border-gray-300 rounded min-h-[100px] max-h-[170px] resize-y"
              placeholder="Unesite komentar"
              onChange={changeInfoHandler}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link
            to="/"
            className="bg-red-700 text-black py-2 px-4 rounded hover:bg-red-400"
          >
            Prekini
          </Link>
          <Link
            to={href1}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
          >
            Nazad
          </Link>
          {weight && `${plus ? dokument : undefined}` ? (
            <Link
              to={href2}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                getNosivostData({
                  nosivost: weight!,
                  licneStvari: info.stvari,
                  komentar: info.komentar,
                  docNum: dokument || "",
                });
              }}
            >
              Dalje
            </Link>
          ) : (
            <p className="text-red-700 font-bold">
              Molimo Vas da unesete nosivost vozila!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistracijaUlaskaVozila;
