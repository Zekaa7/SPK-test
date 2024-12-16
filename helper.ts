export const UlazIzlazFalseColumn = [
  { id: "brdokumenta", ime: "Br. Dokumenta" },
  { id: "razlogulaska", ime: "Ru" },
  { id: "regvozila", ime: "Reg. Vozila" },
  { id: "regprikolice", ime: "Reg. Prikolice" },
  { id: "prevId", ime: "ID. Prevoz." },
  { id: "prevoznikname", ime: "Prevoznik" },
  { id: "kupacnaziv", ime: "Naziv kupca" },
  { id: "jmbg", ime: "JMBG" },
  { id: "ime", ime: "Ime" },
  { id: "prezime", ime: "Prezime" },
  { id: "mestonaziv", ime: "Utov. Mesto" },
  { id: "datumprijave", ime: "Datum prijavljivanja" },
  { id: "ku", ime: "Kapija ulaz" },
  { id: "vremeulaska", ime: "Vreme ulaska" },
  { id: "ki", ime: "Kapija izlaz" },
  { id: "vremeizlaska", ime: "Vreme izlaska" },
  { id: "vremezadrzavanja", ime: "Vreme zadr." },
  { id: "komentar", ime: "Komentar" },
];

export const UlazIzlazTrueColumn = [
  { id: "regvozila", ime: "Reg. Vozila" },
  { id: "regprikolice", ime: "Reg. Prikolice" },
  { id: "jmbg", ime: "JMBG" },
  { id: "ime", ime: "Ime" },
  { id: "prezime", ime: "Prezime" },
  { id: "ku", ime: "Kap. Ulaza" },
  { id: "vremeulaska", ime: "Vreme ulaska" },
  { id: "ki", ime: "Kap. Izlaska" },
  { id: "vremeizlaska", ime: "Vreme izlaska" },
];

export const items = [
  {
    id: 1,
    title: "Ulaz",
    description: [
      "Inicijalizacija ulaza vozila",
      "Potvrda ulaska vozila",
      "Ponovni ulazak vozaca",
    ],
  },
  { id: 2, title: "Izlaz", description: ["Izlazak vozila", "Izlazak vozaca"] },
  {
    id: 3,
    title: "Izveštaji",
    description: [
      "Ulaz i izlaz kamiona",
      "Kamioni u krugu fabrike",
      "Dnevni promet na kapijama",
      "Pregled ulazaka",
    ],
  },
];

export const getRecordType = (ulaz: string) => {
  if (ulaz === "Otprema") {
    return ulaz.split("")[0];
  } else if (ulaz === "Doprema") {
    return ulaz.split("")[0];
  } else if (ulaz === "Ostalo") {
    return "D";
  }
};

export const rowsPerPage = 3;
export const rowsPerPageReports = 5;
