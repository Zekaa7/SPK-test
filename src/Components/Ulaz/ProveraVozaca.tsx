"use client";
import React, { useState, useEffect } from "react";
import { useDataContext } from "../../Context/getData";
import { fetchUserJMBG } from "../../../ApiCalls";
import { ModalProps, VozacProps } from "../../../Interface";
import ModalDialog from "../Modals/ModalUser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import ModalTest from "../Modals/ModalTest";

function ProveraVozaca({ href }: { href: string }) {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModa, setShowModal] = useState<boolean>(false);
  const [jmbg, setJmbg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { getjmbgData } = useDataContext();
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const [data, setData] = useState<VozacProps | null>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setJmbg(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setDebounceTimeout(null);

      // console.log("JMBG je validan:", value);
    }, 1000);

    setIsValid(true);
    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  useEffect(() => {
    if (isValid) {
      const getData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchUserJMBG(jmbg);

          if (response?.value == null) {
            setIsValid(false);
          } else {
            setData(response?.value);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    } else {
      setData(null);
    }
  }, [jmbg, isValid]);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const getDataFromModal = (data: ModalProps) => {
    console.log("modal data", data);
    setJmbg(data.jmbg);
    setIsValid(true);
  };

  //POSTAVITI SPINNER
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-3/6 text-center">
        {/* Naslov */}
        <h2 className="text-2xl font-semibold mb-4">
          PRIPREMA VOZILA ZA ULAZAK
        </h2>

        {/* Provera vozaca */}
        <p className="text-gray-700 mb-6">PROVERA VOZAČA</p>

        {/* Layout sa dva diva */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Prvi div: Unos vozača i status državljanstva */}
          <div>
            {/* Vozač: Unos */}
            <p className="text-left mr-2">Vozač:</p>
            <div className="flex items-center mb-6">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l"
                placeholder="Unesite JMBG vozača"
                value={jmbg}
                onChange={handleInputChange}
              />
            </div>
            {!isValid && jmbg.length > 2 && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                JMBG se ne nalazi u bazi
              </p>
            )}
            <Button
              // variant="warning"
              // className="mt-5"
              size="lg"
              color="warning"
              onPress={handleShowModal}
            >
              Dodajte novog vozača
            </Button>
            {showModa && (
              <ModalDialog
                clicked={showModa}
                onClose={handleCloseModal}
                getData={getDataFromModal}
              />
            )}
          </div>

          {/* Drugi div: Ime, Prezime, JMBG, Broj lične isprave */}

          <div>
            {/* Ime */}
            <p className="text-left">Ime:</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-6"
              readOnly
              disabled
              value={(isValid && data?.ime) || ""}
            />

            {/* Prezime */}
            <p className="text-left">Prezime:</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-6"
              readOnly
              disabled
              value={(isValid && data?.prezime) || ""}
            />

            {/* JMBG */}
            <p className="text-left">JMBG:</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-6"
              readOnly
              disabled
              value={(isValid && data?.jmbg) || ""}
            />

            {/* Broj lične isprave */}
            <p className="text-left">Broj lične isprave:</p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-6"
              readOnly
              disabled
              value={(isValid && data?.brPasosa) || ""}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-around">
          <Link
            to="/inicijalizacijaulazavozila/"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Nazad
          </Link>
          {isValid && jmbg && (
            <Link
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              to={href}
              onClick={() => {
                if (data && isValid) {
                  getjmbgData(data);
                }
              }}
            >
              Dalje
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProveraVozaca;
