import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import MainPage from "./Components/MainPage";
import LoginForm from "./Components/LoginForm";
import PregledUlazaka from "./Components/Izvestaj/PregledUlazaka";
import UlazIzlazIzvestaj from "./Components/Izvestaj/UlazIzlaz";
import DnevniPrometKapije from "./Components/Izvestaj/DnevniPrometKapije";
import InicijalizacijaUlazaVozila from "./Components/Ulaz/InicijalizacijaUlazaVozila";
import PripremaVozilaZaUlaz from "./Components/Ulaz/PripremaVozilaZaUlaz";
import ProveraVozaca from "./Components/Ulaz/ProveraVozaca";
import RegistracijaUlaskaVozila from "./Components/Ulaz/RegistracijaUlaskaVozila";
import PotvrdaUlaska from "./Components/Ulaz/PotvrdaUlaska";
import ProveraPorudzbenice from "./Components/Ulaz/Doprema/ProveraPorudzbenice";
import PrevoznikDoprema from "./Components/Ulaz/Doprema/PrevoznikDoprema";
import ProveraVozilaDoprema from "./Components/Ulaz/Doprema/ProveraVozilaDoprema";
import PotvrdaUlaskaDoprema from "./Components/Ulaz/Doprema/PotvrdaUlaskaDoprema";
import PotvrdaUlaskavozila from "./Components/PotvrdaUlaskavozila";
import PonoviUlazakVozaca from "./Components/PonoviUlazakVozaca";
import IzlazakVozila from "./Components/Izlaz/IzlazakVozila";
import IzlazakVozaca from "./Components/Izlaz/IzlazakVozaca";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Glavne rute */}
        <Route path="/" index element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        {/* {Potvrda Ulaska vozaca} */}
        <Route path="/potvrdaulaskavozila" element={<PotvrdaUlaskavozila />} />
        {/* {Ponovni ulazak vozaca} */}
        <Route path="/ponovniulazakvozaca" element={<PonoviUlazakVozaca />} />
        {/* {Izlazak vozila} */}
        <Route path="/izlazakvozila" element={<IzlazakVozila />} />
        {/* {Izlazak vozaca} */}
        <Route path="/izlazakvozaca" element={<IzlazakVozaca />} />
        {/* Izveštaji */}
        <Route
          path="/pregledulazaka"
          element={<PregledUlazaka ulazIzlaz={true} />}
        />
        <Route
          path="/ulaziizlazkamiona"
          element={<UlazIzlazIzvestaj ulazIzlaz={false} />}
        />
        <Route
          path="/dnevniprometnakapijama"
          element={<DnevniPrometKapije />}
        />

        {/* Inicijalizacija ulaza */}
        {/* {OTPREMA} */}
        <Route path="inicijalizacijaulazavozila">
          <Route index element={<InicijalizacijaUlazaVozila />} />
          <Route path="otprema">
            <Route index element={<PripremaVozilaZaUlaz />} />
            <Route
              path="proveravozaca"
              element={
                <ProveraVozaca href="/inicijalizacijaulazavozila/otprema/proveravozaca/registracijaulaskavozila" />
              }
            />
            <Route
              path="proveravozaca/registracijaulaskavozila"
              element={
                <RegistracijaUlaskaVozila
                  href1="/inicijalizacijaulazavozila/otprema/proveravozaca"
                  href2="/inicijalizacijaulazavozila/otprema/proveravozaca/registracijaulaskavozila/potvrda"
                  plus={false}
                />
              }
            />
            <Route
              path="proveravozaca/registracijaulaskavozila/potvrda"
              element={<PotvrdaUlaska />}
            />
          </Route>
        </Route>
        {/* {DOPREMA} */}
        <Route path="inicijalizacijaulazavozila">
          <Route index element={<InicijalizacijaUlazaVozila />} />
          <Route path="doprema">
            <Route index element={<ProveraPorudzbenice />} />
            <Route
              path="proveravozaca"
              element={
                <ProveraVozaca href="/inicijalizacijaulazavozila/doprema/proveravozaca/prevoznik" />
              }
            />
            <Route
              path="proveravozaca/prevoznik"
              element={
                <PrevoznikDoprema href="/inicijalizacijaulazavozila/doprema/proveraVozaca/prevoznik/vozilo" />
              }
            />
            <Route
              path="proveravozaca/prevoznik/vozilo"
              element={
                <ProveraVozilaDoprema href="/inicijalizacijaulazavozila/doprema/proveraVozaca/prevoznik/vozilo/registracija" />
              }
            />
            <Route
              path="proveravozaca/prevoznik/vozilo/registracija"
              element={
                <RegistracijaUlaskaVozila
                  href1="/inicijalizacijaulazavozila/doprema/proveraVozaca/prevoznik/vozilo"
                  href2="/inicijalizacijaulazavozila/doprema/proveraVozaca/prevoznik/vozilo/registracija/potvrda"
                  plus={false}
                />
              }
            />
            <Route
              path="proveravozaca/prevoznik/vozilo/registracija/potvrda"
              element={<PotvrdaUlaskaDoprema razlog={true} />}
            />
          </Route>
        </Route>
        {/* {OSTALO} */}
        <Route path="inicijalizacijaulazavozila">
          <Route index element={<InicijalizacijaUlazaVozila />} />
          <Route path="ostalo">
            <Route
              index
              element={
                <ProveraVozaca href="/inicijalizacijaulazavozila/ostalo/prevoznik" />
              }
            />
            <Route
              path="prevoznik"
              element={
                <PrevoznikDoprema href="/inicijalizacijaulazavozila/ostalo/prevoznik/vozilo" />
              }
            />
            <Route
              path="prevoznik/vozilo"
              element={
                <ProveraVozilaDoprema href="/inicijalizacijaulazavozila/ostalo/prevoznik/vozilo/registracija" />
              }
            />
            <Route
              path="prevoznik/vozilo/registracija"
              element={
                <RegistracijaUlaskaVozila
                  plus={true}
                  href1="/inicijalizacijaulazavozila/ostalo/prevoznik/vozilo"
                  href2="/inicijalizacijaulazavozila/ostalo/prevoznik/vozilo/registracija/potvrda"
                />
              }
            />
            <Route
              path="prevoznik/vozilo/registracija/potvrda"
              element={<PotvrdaUlaskaDoprema razlog={false} />}
            />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
}
