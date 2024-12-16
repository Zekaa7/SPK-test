"use client";

import { createNewVozac, verifyToken, voziloCreate } from "../../../ApiCalls";
import { CreateVozilo } from "../../../Interface";
import { useDataContext } from "../../Context/getData";

import { getRecordType } from "../../../helper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PotvrdaUlaska() {
  // const router = useRouter();
  const navigation = useNavigate();
  const { jmbgUser, ulaz, user, nosivost } = useDataContext();
  const [isVerif, setIsVerif] = useState<boolean>(true);

  let recordType = getRecordType(ulaz);

  const data: CreateVozilo = {
    vzId: user?.Vz_Id!,
    prevId: user?.prevId!,
    voId: jmbgUser?.id!,
    vzKomentar: nosivost?.komentar!,
    vzNosivost: nosivost?.nosivost!,
    valid: "",
    docNum: "",
    recordType: recordType!,
    otpremnicaId: user?.otpremnicaId!,
    liscneStvariVozaca: nosivost?.licneStvari!,
  };
  const saveHandler = async () => {
    try {
      await voziloCreate(data!);
      console.log(data);
      console.log("Data successfully sent to the server.");
    } catch (error) {
      console.error("Failed to send data:", error);
    }
    navigation("/");
  };

  // useEffect(() => {
  //   const verify = async () => {
  //     const token = localStorage.getItem("Token/TruckTrackingSystem");
  //     const isVerif = await verifyToken(token!);
  //     if (!isVerif) {
  //       setIsVerif(false);
  //       router.push("/login");
  //     } else {
  //       setIsVerif(true);
  //     }
  //   };
  //   verify();
  // }, [isVerif]);
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
            <span className="font-semibold">Kupac:</span>
            <span>{user?.naziv}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Otpremnica:</span>
            <span>{user?.otpremnica}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Prevoznik:</span>
            <span>{user?.prevoznikName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Vozač:</span>
            <span>
              {jmbgUser?.prezime} {jmbgUser?.ime}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Registarska oznaka vozila:</span>
            <span className="text-red-700 font-bold">{user?.regVozila}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Registarska oznaka prikolice:</span>
            <span className="text-red-700 font-bold">{user?.regPrikolice}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Mesto utovara:</span>
            <span>{user?.mestoNaziv}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="flex space-x-4">
            <button
              className="bg-red-700 text-black py-2 px-4 rounded  hover:bg-red-400 mr-10"
              onClick={() => navigation("/")}
            >
              Prekini
            </button>
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              onClick={() => navigation(-1)}
            >
              Nazad
            </button>
          </div>

          {isVerif && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={saveHandler}
            >
              Potvrdi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PotvrdaUlaska;
