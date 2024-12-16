"use client";
import Select from "react-select";
import React from "react";
import { useEffect, useState } from "react";
import { DataProps, DataPropsById } from "../../../Interface";
import fetchData, {
  fetchPrevoznikVozilo,
  verifyToken,
} from "../../../ApiCalls";
import { DataById } from "../../../Interface";
import { fetchDataById } from "../../../ApiCalls";
import { PrevoznikProps } from "../../../Interface";
// import Link from "next/link";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../../Context/getData";
// import { useRouter } from "next/navigation";

interface State {
  otpremnica: string | undefined;
  mestoID: number | undefined;
  mestoNaziv: number | undefined;
  Vz_Id: number | undefined;
  otpremnicaId: number | undefined;
}

function PripremaVozilaZaUlaz() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataProps[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<DataProps | null>(
    null
  );
  const [state, setState] = useState<State>({
    otpremnica: "",
    mestoID: 0,
    mestoNaziv: 0,
    Vz_Id: 0,
    otpremnicaId: 0,
  });
  const [dataNote, setDataNote] = useState<DataPropsById[]>([]);
  const [selectedOtp, setSelectedOtp] = useState<number>();
  const [getData, setGetData] = useState<PrevoznikProps>();
  const [isAllow, setIsAllow] = useState<boolean>(true);

  const { getUserData } = useDataContext();

  const handleChangeKupac = (selectedOption: any) => {
    const selectedId = selectedOption?.value;
    if (selectedId) {
      const selected = data.find(
        (item) => item.kupCode.toString() === selectedId
      );
      setSelectedCustomer(selected || null);
    } else {
      setSelectedCustomer(null);
    }
  };

  const optionsKupac = data.map((zap) => ({
    value: zap.kupCode.toString(),
    label: zap.naziv,
    key: zap.kupCode.toString(),
  }));

  const handleChangeOtpremnica = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOtp = Number(e.target.value);
    setSelectedOtp(isNaN(selectedOtp) ? undefined : selectedOtp);
    const otpremnica = dataNote.find((item) => item.VZ_ID === selectedOtp);
    const mesto = dataNote.find((item) => item.VZ_ID === selectedOtp);

    setState((prev) => ({
      ...prev,
      mesto: mesto?.mestoId,
      otpremnica: otpremnica?.otpOznaka,
      otpremnicaId: otpremnica?.id,
      mestoNaziv: mesto?.mestoNaziv,
      Vz_Id: mesto?.VZ_ID,
    }));
  };
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData();
      if (response.isSuccess) {
        setData(response.value);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getDataById = async () => {
      if (selectedCustomer) {
        const dataCall = await fetchDataById(selectedCustomer.kupId);
        if (dataCall.isSuccess) {
          setDataNote(dataCall.value);
        }
      }
    };
    getDataById();
  }, [selectedCustomer]);

  useEffect(() => {
    const getDataPrevoznik = async () => {
      if (selectedOtp) {
        const data = await fetchPrevoznikVozilo(selectedOtp);
        if (data.isSuccess) {
          setGetData(data.value);
        }
      }
    };
    getDataPrevoznik();
  }, [selectedOtp]);
  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/6 text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4">
            PRIPREMA VOZILA ZA ULAZAK
          </h2>

          {/* Text */}
          <p className="text-gray-700 mb-6">PROVERA OTPREMNICE I PREVOZNIKA</p>

          {/* Form layout with two columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Left Column: Kupac and Otpremnica */}
            <div>
              {/* ComboBox for Kupac */}
              <p className="text-left">Kupac:</p>
              <Select
                options={optionsKupac}
                onChange={handleChangeKupac}
                placeholder="Izaberite kupca"
                className="mb-6"
              />
              {/* <option value="">Izaberite kupca</option>
                {data.map((zap) => (
                  <option key={zap.kupId} value={zap.kupCode}>
                    {zap.naziv}
                  </option>
                ))}
              </Select> */}

              {/* ComboBox for Otpremnica */}
              <p className="text-left">Otpremnica:</p>
              <select
                className="w-full p-2 border border-gray-300 rounded mb-6"
                onChange={handleChangeOtpremnica}
                disabled={!selectedCustomer}
              >
                <option value="">Izaberite otpremnicu</option>
                {dataNote.map((el) => (
                  <option key={el.id} value={el.VZ_ID}>
                    {el.otpOznaka}
                  </option>
                ))}
              </select>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  className="mr-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="vehicle1" className="text-gray-700">
                  Proveri sve otpremnice za dati kamion
                </label>
              </div>
            </div>

            {/* Right Column: Prevoznik and Registracija */}
            <div>
              {/* Prevoznik Input */}
              <p className="text-left">Prevoznik:</p>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-6"
                readOnly
                value={
                  selectedCustomer &&
                  selectedOtp !== undefined &&
                  selectedOtp !== 0
                    ? getData?.prevoznikName || ""
                    : ""
                }
              />

              {/* Registrarska oznaka vozila */}
              <p className="text-left">Registrarska oznaka vozila:</p>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-6"
                readOnly
                value={
                  selectedCustomer &&
                  selectedOtp !== undefined &&
                  selectedOtp !== 0
                    ? getData?.regVozila || ""
                    : ""
                }
              />

              {/* Registrarska oznaka prikolice */}
              <p className="text-left">Registrarska oznaka prikolice:</p>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-6"
                readOnly
                value={
                  selectedCustomer &&
                  selectedOtp !== undefined &&
                  selectedOtp !== 0
                    ? getData?.regPrikolice || ""
                    : ""
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-around">
            <Link
              to="/inicijalizacijaulazavozila"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              // onClick={() => route.back()}
            >
              Nazad
            </Link>
            {selectedCustomer &&
              selectedOtp !== undefined &&
              selectedOtp !== 0 && (
                <Link
                  to={{
                    pathname:
                      "/inicijalizacijaulazavozila/otprema/proveravozaca",
                  }}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => {
                    if (getData && selectedCustomer) {
                      getUserData({
                        otpremnica: state.otpremnica || "",
                        otpremnicaId: state.otpremnicaId!,
                        mestoNaziv: state.mestoNaziv!,
                        mesto: state.mestoID! || 0,
                        Vz_Id: state.Vz_Id!,
                        ...getData,
                        ...selectedCustomer,
                      });
                    }
                  }}
                >
                  Dalje
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PripremaVozilaZaUlaz;
