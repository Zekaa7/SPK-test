"use client";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../Button";
import { porudzbenicaGetById } from "../../../../ApiCalls";
import { OtpremnicaData } from "../../../../Interface";
import { useDataContext } from "../../../Context/getData";

function ProveraPorudzbenice() {
  const [otpremnica, setOptremnica] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [otpremnicaData, setOtpremnicaData] = useState<OtpremnicaData>();
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
  const { getDopremaData } = useDataContext();

  const getOtpremnicaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOptremnica(value);

    // Ako postoji prethodni debounce, očisti ga
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Kreiraj novi debounce timeout
    const newTimeout = setTimeout(() => {
      fetchOtpremnicaData(value);
    }, 1000);

    setDebounceTimeout(newTimeout);
  };

  const fetchOtpremnicaData = async (value: string) => {
    const response = await porudzbenicaGetById(value);
    if (response?.isSuccess === false) {
      setIsValid(false);
      setOtpremnicaData(response.error.description);
    } else {
      setIsValid(true);
      setOtpremnicaData(response);
    }
  };

  // console.log(otpremnicaData);
  // console.log(isValid);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/5 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          PRIPREMA VOZILA ZA ULAZAK
        </h2>

        <p className="text-gray-700 mb-6">Provera porudžbenice</p>

        <div className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="text-left block mb-1">Broj porudžbenice:</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-left"
              placeholder="Unesite broj porudžbenice"
              onChange={getOtpremnicaHandler}
              value={otpremnica || ""}
            />
          </div>
        </div>
        {otpremnicaData && isValid ? (
          <Button
            href2="/inicijalizacijaulazavozila/doprema/proveravozaca"
            onClick={() => {
              getDopremaData({
                docNum: otpremnica,
              });
            }}
          />
        ) : (
          <p>{!otpremnicaData}</p>
        )}
      </div>
    </div>
  );
}

export default ProveraPorudzbenice;
