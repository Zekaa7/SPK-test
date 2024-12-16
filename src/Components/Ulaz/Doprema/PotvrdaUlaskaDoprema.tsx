"use client";
import { useDataContext } from "../../../Context/getData";
// import { useRouter } from "next/navigation";
import React from "react";
import { CreateVozilo } from "../../../../Interface";
import { voziloCreate } from "../../../../ApiCalls";
import { useNavigate } from "react-router-dom";

function PotvrdaUlaskaDoprema({ razlog }: { razlog: boolean }) {
  const navigate = useNavigate();
  const { dopremaPrevoznik, doprema, jmbgUser, ulaz, nosivost } =
    useDataContext();
  let recordType = ulaz.split("")[0];
  if (!razlog) {
    recordType = "F";
  }
  const data: CreateVozilo = {
    vzId: dopremaPrevoznik?.id!,
    prevId: dopremaPrevoznik?.prevId!,
    voId: jmbgUser?.id!,
    vzKomentar: nosivost?.komentar!,
    vzNosivost: nosivost?.nosivost!,
    valid: "",
    docNum: razlog ? doprema?.docNum! : nosivost?.docNum!,
    recordType: recordType!,
    otpremnicaId: 0,
    liscneStvariVozaca: nosivost?.licneStvari!,
  };

  const saveHandler = async () => {
    try {
      const response = await voziloCreate(data);
      console.log("Data successfully sent to the server.");
    } catch (error) {
      console.error("Failed to send data:", error);
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/5 text-left">
        <h2 className="text-2xl font-semibold mb-4 text-center">POTVRDA</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Razlog ulaza:</span>
            <span>{ulaz}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              {razlog ? "Dopremnica:" : "Broj dokumenta:"}
            </span>
            <span>{razlog ? doprema?.docNum! : nosivost?.docNum!}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Prevoznik:</span>
            <span>{dopremaPrevoznik?.prevNaziv}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Vozač:</span>
            <span>
              {jmbgUser?.ime} {jmbgUser?.prezime}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Registarska oznaka vozila:</span>
            <span className="text-red-700 font-bold">
              {dopremaPrevoznik?.vzRegVoz}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="flex space-x-4">
            <button
              className="bg-red-700 text-black py-2 px-4 rounded  hover:bg-red-400 mr-10"
              onClick={() => navigate("/")}
            >
              Prekini
            </button>
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              onClick={() => navigate(-1)}
            >
              Nazad
            </button>
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={saveHandler}
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
}

export default PotvrdaUlaskaDoprema;
