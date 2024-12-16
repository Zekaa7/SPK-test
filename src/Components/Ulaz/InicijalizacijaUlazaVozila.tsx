import { Link, Navigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useDataContext } from "../../Context/getData";
import { GetKatalogDD } from "../../../ApiCalls";

function InicijalizacijaUlazaVozila() {
  const [getSelected, setGetSelected] = useState<string | null>("");
  const { getUlazData } = useDataContext();
  const [data, setData] = useState<{ id: number; vrednost: string }[]>([]);
  const [redirect, setRedirect] = useState<string | null>(null); // State for redirection

  const changeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setGetSelected(selected);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await GetKatalogDD();
      setData(response.value);
    };
    getData();
  }, []);

  const handleContinue = () => {
    if (getSelected) {
      getUlazData(getSelected);
      if (getSelected === "Otprema") {
        setRedirect("/inicijalizacijaulazavozila/otprema");
      } else if (getSelected === "Doprema") {
        setRedirect("/inicijalizacijaulazavozila/doprema");
      } else {
        setRedirect("/inicijalizacijaulazavozila/ostalo");
      }
    }
  };

  // Redirect if redirect state is set
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <Fragment>
      <div className="flex items-center justify-center w-auto h-screen bg-gray-950 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            PRIPREMA VOZILA ZA ULAZAK
          </h2>
          <p className="text-gray-700 mb-6">RAZLOG ULASKA</p>
          <select
            className="w-full p-2 border border-gray-300 rounded mb-6"
            onChange={changeSelected}
            value={getSelected || ""}
          >
            <option autoFocus value="">
              Izaberite željeni razlog
            </option>
            {data.map((item) => (
              <option key={item.id} value={item.vrednost}>
                {item.vrednost}
              </option>
            ))}
          </select>
          {!getSelected && (
            <p className="text-red-700 pb-3">Molimo Vas da izaberete razlog!</p>
          )}
          <div className="flex justify-between">
            <Link
              to={"/"}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Prekini
            </Link>
            {getSelected && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleContinue}
              >
                Dalje
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default InicijalizacijaUlazaVozila;
