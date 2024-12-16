import React, { useEffect, useState } from "react";
import { UlazIzlazKamionaIzvestaji } from "../../../Interface";
import DataRangePicker from "../DatePicker/DataRangePicker";
import { izvestajGetUlazIzlazKamiona } from "../../../ApiCalls";
import PregledUlazakaTable from "./PregledUlazakaTable";
import { Spinner } from "react-bootstrap";

interface Date {
  start: string;
  end: string;
}
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
};

function PregledUlazaka({ ulazIzlaz }: { ulazIzlaz: boolean }) {
  const [selected, setSelected] = useState<boolean>(false);
  const [date, setDate] = useState<Date>({ start: "", end: "" });
  const [data, setData] = useState<UlazIzlazKamionaIzvestaji[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getDataChange = (date: { start: string; end: string }) => {
    const formattedRange = {
      start: formatDate(date.start),
      end: formatDate(date.end),
    };
    setDate(formattedRange);
    setSelected(true);
  };
  const handleShow = () => {
    setSelected(false);
  };
  useEffect(() => {
    if (selected) {
      const getData = async () => {
        setIsLoading(true);
        const response = await izvestajGetUlazIzlazKamiona(
          date.start!,
          date.end!
        );
        console.log(response);
        if (response?.isSuccess) {
          setData(response.value);
        } else {
          return;
        }
        setIsLoading(false);
      };
      getData();
    } else {
      return;
    }
  }, [date]);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      {!selected ? (
        <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Praćenje kamiona
          </h2>

          {/* Text */}
          <p className="text-gray-700 mb-6">
            Izaberite zeljeni datum izvestaja
          </p>

          <div className="flex justify-center">
            <DataRangePicker onDate={getDataChange} visibleMonth={2} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 uppercase">
            Praćenje kamiona
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col text-left">
              <h3 className="text-lg font-semibold">DATUM</h3>
              <p className="mb-1">OD: {date.start}</p>
              <p className="mb-1">DO: {date.end}</p>
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

          {isLoading ? (
            <Spinner />
          ) : (
            <PregledUlazakaTable pregled={true} users={data || []} />
          )}
        </div>
      )}
    </div>
  );
}

export default PregledUlazaka;
