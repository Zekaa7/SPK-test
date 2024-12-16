"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  DopremaCreate,
  DopremaKupacRegOznaka,
  NosivostProps,
  PrevoznikProps,
} from "../../Interface";
import { DataProps } from "../../Interface";
import { VozacProps } from "../../Interface";

interface User extends PrevoznikProps, DataProps {
  otpremnica: string | undefined;
  otpremnicaId?: number | undefined;
  mesto: number | undefined;
  mestoNaziv?: number | undefined;
  Vz_Id?: number | undefined;
  prevId?: number | undefined;
  id?: number | undefined;
}

interface DataContextProps {
  user: User | null;
  jmbgUser: VozacProps | null;
  nosivost: NosivostProps | null;
  doprema: DopremaCreate | null;
  dopremaPrevoznik: DopremaKupacRegOznaka | null;
  getDopremaPrevoznik: (userData: DopremaKupacRegOznaka) => void;
  getNosivostData: (userData: NosivostProps) => void;
  getDopremaData: (userData: DopremaCreate) => void;
  getUserData: (userData: User) => void;
  getjmbgData: (userData: VozacProps) => void;
  ulaz: string;
  getUlazData: (razlog: string) => void;
}

export const getDataContext = createContext<DataContextProps | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [jmbgUser, setJmbgUser] = useState<VozacProps | null>(null);
  const [ulaz, setUlaz] = useState<string>("");
  const [nosivost, setNosivost] = useState<NosivostProps | null>(null);
  const [doprema, setDoprema] = useState<DopremaCreate | null>(null);
  const [dopremaPrevoznik, setDopremaPrevoznik] =
    useState<DopremaKupacRegOznaka | null>(null);

  const getDopremaPrevoznik = (userData: DopremaKupacRegOznaka) => {
    setDopremaPrevoznik(userData);
    localStorage.setItem("dopremaPrevoznik", JSON.stringify(userData));
  };

  const getDopremaData = (userData: DopremaCreate) => {
    setDoprema(userData);
    localStorage.setItem("dopremaData", JSON.stringify(userData));
  };

  const getNosivostData = (userData: NosivostProps) => {
    setNosivost(userData);
    localStorage.setItem("nosivostData", JSON.stringify(userData));
  };

  const getUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const getjmbgData = (userData: VozacProps) => {
    setJmbgUser(userData);
    localStorage.setItem("jmbgData", JSON.stringify(userData));
  };

  const getUlazData = (razlog: string) => {
    setUlaz(razlog);
    localStorage.setItem("ulaz", JSON.stringify(razlog));
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedJmbgData = localStorage.getItem("jmbgData");
    const storedUlazData = localStorage.getItem("ulaz");
    const storedNosivostData = localStorage.getItem("nosivostData");
    const storedDopremaPrevoznik = localStorage.getItem("dopremaPrevoznik");
    const storedDopremaData = localStorage.getItem("dopremaData");

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }

    if (storedJmbgData) {
      setJmbgUser(JSON.parse(storedJmbgData));
    }

    if (storedUlazData) {
      setUlaz(JSON.parse(storedUlazData));
    }
    if (storedNosivostData) {
      setNosivost(JSON.parse(storedNosivostData));
    }
    if (storedDopremaPrevoznik) {
      setDopremaPrevoznik(JSON.parse(storedDopremaPrevoznik));
    }
    if (storedDopremaData) {
      setDoprema(JSON.parse(storedDopremaData));
    }
  }, []);

  return (
    <getDataContext.Provider
      value={{
        user,
        getUserData,
        getjmbgData,
        jmbgUser,
        ulaz,
        getUlazData,
        getNosivostData,
        nosivost,
        doprema,
        getDopremaData,
        getDopremaPrevoznik,
        dopremaPrevoznik,
      }}
    >
      {children}
    </getDataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(getDataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
