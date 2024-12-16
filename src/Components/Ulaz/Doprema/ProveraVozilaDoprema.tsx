"use client";
import { useDataContext } from "../../../Context/getData";

import React, { useEffect, useState } from "react";
import {
  DopremaKupacRegOznaka,
  DopremaVoziloCreate,
} from "../../../../Interface";
import { voziloGetAllById } from "../../../../ApiCalls";
import ModalPrevoznikVozilo from "../../Modals/ModalPrevoznikVozilo";
import { Button } from "react-bootstrap";
import Select from "react-select"; // Import react-select
import { keyframes } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

function ProveraVozilaDoprema({ href }: { href: string }) {
  const navigate = useNavigate();
  const { getDopremaPrevoznik, dopremaPrevoznik } = useDataContext();
  const id: number = dopremaPrevoznik?.prevId!;
  const [data, setData] = useState<DopremaKupacRegOznaka[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<DopremaKupacRegOznaka | null>(null);
  const [showModa, setShowModal] = useState<boolean>(false);
  const [newVehicle, setNewVehicle] = useState<DopremaVoziloCreate>();

  const handleChangeRegOznaka = (selectedOption: any) => {
    setNewVehicle(undefined);
    if (selectedOption) {
      const selectedId = selectedOption.value;
      const selected = data.find((item) => item.vzRegVoz === selectedId);
      setSelectedCustomer(selected || null);
    } else {
      setSelectedCustomer(null);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await voziloGetAllById(id);
      if (response?.isSuccess) {
        setData(response.value);
      }
    };
    getData();
  }, [showModa]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getDataFromModal = (data: DopremaVoziloCreate) => {
    setNewVehicle(data);
    setSelectedCustomer(data);
  };

  // Priprema podataka za react-select
  const vehicleOptions = data.map((zap) => ({
    value: zap.vzRegVoz!,
    label: zap.vzRegVoz!,
    key: zap.id!,
  }));
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/6 text-center">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">
          PRIPREMA VOZILA ZA ULAZAK
        </h2>

        {/* Text */}
        <p className="text-gray-700 mb-6">Provera vozila</p>

        {/* Form layout with two columns */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column: Kupac */}
          <div>
            <p className="text-left">Vozilo:</p>
            <Select
              options={vehicleOptions}
              onChange={handleChangeRegOznaka}
              // value={
              //   newVehicle
              //     ? { value: newVehicle.vzRegVoz, label: newVehicle.vzRegVoz }
              //     : null
              // }
              placeholder="Izaberite vozilo"
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
                to={href}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                onClick={() => {
                  getDopremaPrevoznik({
                    ...dopremaPrevoznik,
                    id: selectedCustomer.id,
                    vrVozId: selectedCustomer.vrVozId,
                    vzRegVoz: selectedCustomer.vzRegVoz,
                    vzBrMotora: selectedCustomer.vzBrMotora,
                    vzRegPrik: selectedCustomer.vzRegPrik,
                  });
                }}
              >
                Dalje
              </Link>
            )}
          </div>

          <Button variant="warning" className="mt-5" onClick={handleShowModal}>
            Dodajte novo vozilo
          </Button>

          {showModa && (
            <ModalPrevoznikVozilo
              getData={getDataFromModal}
              onClose={handleCloseModal}
              clicked={showModa}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProveraVozilaDoprema;
