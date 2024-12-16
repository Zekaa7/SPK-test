"use client";
import React, { useEffect, useState } from "react";
import DatePickerPromet from "../DatePicker/DatePickerPromet";
// import Image from "next/image";
import { DnevniPrometKapijeProps, KapijaPromet } from "../../../Interface";
import { izvestajGetDnevniPrometNaKapijama } from "../../../ApiCalls";
import { Spinner } from "react-bootstrap";

function DnevniPrometKapije() {
  const [getSelectedDate, setGetSelectedDate] = useState<string>("");
  const [selected, setSelected] = useState<boolean>(false);
  const [data, setData] = useState<DnevniPrometKapijeProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const izlazak = data?.izlazak?.map((el: KapijaPromet) => ({
    kapija: el.kapija,
    brojProlazaka: el.brojProlazaka,
  }));

  const ulazak = data?.ulazak?.map((el: KapijaPromet) => {
    return {
      kapija: el.kapija,
      brojProlazaka: el.brojProlazaka,
    };
  });

  const getDateHandler = (date: string) => {
    setGetSelectedDate(date);
    setSelected(true);
  };
  const handleShow = () => {
    setSelected(false);
  };
  useEffect(() => {
    if (getSelectedDate == "") {
      return;
    }
    const getData = async () => {
      setIsLoading(true);
      const response = await izvestajGetDnevniPrometNaKapijama(getSelectedDate);
      setData(response.value);
      setIsLoading(false);
    };
    getData();
  }, [getSelectedDate]);

  return (
    <div className="flex items-center justify-center w-auto h-screen bg-gray-900 bg-opacity-50">
      {!selected ? (
        <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Ulasci i izlasci kamiona
          </h2>

          {/* Text */}
          <p className="text-gray-700 mb-6">
            Izaberite željeni datum izveštaja
          </p>
          <div className="flex justify-center">
            <DatePickerPromet getDate={getDateHandler} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Ulasci i izlasci kamiona
          </h2>

          {/* Datum i dugme u jednom redu */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col text-left">
              <h3 className="text-lg font-semibold">DATUM</h3>
              <p className="mb-1">Izabrani datum: {getSelectedDate}</p>
            </div>

            <button
              onClick={handleShow}
              className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 flex items-center"
            >
              Promeni datum
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR4nO2UMQoAIAwD+/9Px8VVVJJaIj3IIIgcpDWiac7ATNb95QPq+AmoKqAFWHwrQLWAiv8EsJny9C1AtcAt/gIQn/0EWPwFQH69/gIsvgIQx0egaeIVA/UMAwxK1CczAAAAAElFTkSuQmCC"
                alt="Promeni datum"
                height={16}
                width={16}
                className="w-4 h-4 ml-2"
              />
            </button>
          </div>
          {!isLoading ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Izlazak/Ulazak
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Kapija</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Broj prolazaka
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Izlazak Rows */}
                  <tr className="bg-gray-100">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={2}
                    >
                      Izlazak
                    </td>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {izlazak
                        ?.map((el: KapijaPromet) => {
                          if (el.kapija === 2) {
                            return el.brojProlazaka;
                          }
                          return null;
                        })
                        .filter(Boolean)}{" "}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      {izlazak
                        ?.map((el: KapijaPromet) => {
                          if (el.kapija === 6) {
                            return el.brojProlazaka;
                          }
                          return null;
                        })
                        .filter(Boolean)}{" "}
                    </td>
                  </tr>
                  {/* Ulazak Rows */}
                  <tr className="bg-white">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={2}
                    >
                      Ulazak
                    </td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      {ulazak
                        ?.map((el: KapijaPromet) => {
                          if (el.kapija === 3) {
                            return el.brojProlazaka;
                          }
                          return null;
                        })
                        .filter(Boolean)}{" "}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {ulazak
                        ?.map((el: KapijaPromet) => {
                          if (el.kapija === 6) {
                            return el.brojProlazaka;
                          }
                          return null;
                        })
                        .filter(Boolean)}{" "}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-200">
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colSpan={2}
                    >
                      Ukupno izlazaka:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.ukupnoIzlazaka || ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colSpan={2}
                    >
                      Ukupno ulazaka:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.ukupnoUlazaka || ""}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}

export default DnevniPrometKapije;
