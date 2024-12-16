"use client";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import {
  DataProps,
  DopremaKupacRegOznaka,
  prevoznikCreateProps,
} from "../../../../Interface";
import fetchData, { prevoznikGetAll } from "../../../../ApiCalls";
import Button from "react-bootstrap/Button";

import { useDataContext } from "../../../Context/getData";
import ModalPrevoznik from "../../Modals/ModalPrevoznik";
import { useNavigate, Link } from "react-router-dom";

function PrevoznikDoprema({ href }: { href: string }) {
  const { getDopremaPrevoznik } = useDataContext();
  const navigate = useNavigate();
  const [data, setData] = useState<DopremaKupacRegOznaka[]>([]);
  const [showModa, setShowModal] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<DopremaKupacRegOznaka | null>(null);
  const [prevNaziv, setPrevNaziv] = useState<prevoznikCreateProps>();

  useEffect(() => {
    const getData = async () => {
      const response = await prevoznikGetAll();
      if (response.isSuccess) {
        setData(response.value);
      }
    };
    getData();
  }, [showModa]);

  const handleChangeKupac = (selectedOption: any) => {
    setPrevNaziv(undefined);
    const selectedId = selectedOption?.value;
    console.log(selectedId);
    if (selectedId) {
      const selected = data.find((item) => item.prevNaziv === selectedId);
      setSelectedCustomer(selected || null);
    } else {
      setSelectedCustomer(null);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const getDataFromModal = (data: prevoznikCreateProps) => {
    setPrevNaziv(data);
    setSelectedCustomer(data);
  };

  const optionsKupac = useMemo(() => {
    return data.map((zap) => ({
      value: zap.prevNaziv,
      label: zap.prevNaziv,
      key: zap.id,
    }));
  }, [data]);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/6 text-center">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">
          PRIPREMA VOZILA ZA ULAZAK
        </h2>

        {/* Text */}
        <p className="text-gray-700 mb-6">PROVERA OTPREMNICE I PREVOZNIKA</p>

        {/* Form layout with two columns */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column: Kupac */}
          <div>
            <p className="text-left">Prevoznik:</p>
            <Select
              options={optionsKupac}
              onChange={handleChangeKupac}
              // value={
              //   prevNaziv
              //     ? { value: prevNaziv.prevNaziv, label: prevNaziv.prevNaziv }
              //     : null
              // }
              placeholder="Izaberite prevoznika"
              isClearable
              isSearchable
            />
          </div>

          {/* Right Column: Buttons */}
          <div className="flex flex-col justify-center gap-3">
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={() => navigate(-1)}
            >
              Nazad
            </button>
            {selectedCustomer && (
              <Link
                to={{
                  pathname: href,
                }}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                onClick={() => {
                  if (selectedCustomer) {
                    getDopremaPrevoznik({
                      prevId: selectedCustomer.id,
                      prevNaziv: selectedCustomer.prevNaziv,
                    });
                  }
                }}
              >
                Dalje
              </Link>
            )}
          </div>
        </div>
        <Button variant="warning" className="mt-5" onClick={handleShowModal}>
          Dodajte novog kupca
        </Button>
        {showModa && (
          <ModalPrevoznik
            getData={getDataFromModal}
            onClose={handleCloseModal}
            clicked={showModa}
          />
        )}
      </div>
    </div>
  );
}

export default PrevoznikDoprema;
