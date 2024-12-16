export interface CardProps {
  title: string;
  className: string;
  onClick: () => void;
  isActive: boolean;
}

export interface DataProps {
  zapId?: number;
  kupCode: number | string;
  kupId: number;
  naziv: string | null;
  drzava?: string | null;
}

export interface DataPropsById {
  id: number;
  matId: number;
  zapId: number | string;
  firId: number;
  otpOznaka: string;
  otpBrojKomada: number;
  otpTezina: number;
  mestoId: number;
  mestoNaziv: number;
  datumOtpreme: string;
  isValid: boolean;
  VZ_ID: number;
  groupId: number;
  updateNum: number;
  insertDate: string;
}
export interface DataById {
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    description: string;
  };
  value: DataPropsById[];
}

export interface PrevoznikProps {
  prevoznikName?: string;
  regVozila?: string;
  regPrikolice?: string;
}
export interface VozacProps {
  brPasosa: string;
  drzavljanstvo: null;
  id: number;
  ime: string;
  jmbg: string;
  legitimacija: null;
  prevId: number;
  prezime: string;
  stranac: string;
  regVozila: string;
}

export interface PotvrdaUlaska {
  registracija: string;
  jmbg: string;
  ime: string;
  prezime: string;
  datum: string;
  komentar?: string;
}

export interface PotvrdaIzlaska {
  regVozila: string;
  jmbg: string;
  ime: string;
  prezime: string;
  Ku: number;
  stvari?: string;
  komentar?: string;
  datum: string;
}

export interface RowData {
  key: number;
  brPasosa?: string;
  ime?: string;
  insertDate?: string;
  jmbg?: string;
  komentar?: string;
  prezime?: string;
  regVozila?: string;
  uiVoId?: number;
  uiVoIzlaz?: string;
  uiVoUlaz?: string;
  uiVzId?: number;
  uiVzIzlaz?: number;
  uiVzUlaz?: string;
  ku?: string;
  licneStvari?: string;
}

export interface UlazIzlazProps {
  brDokumenta: string;
  Ru: string;
  regVozila: string;
  regPrikolice?: string;
  id: string;
  prevoznikName: string;
  zapId?: string;
  jmbg: string;
  ime: string;
  prezime: string;
  mestoId?: string;
  datumPrijave: string;
  Ku: string;
  vremeUlaska: string;
  Ki: string;
  vremeIzlaska: string;
  vremeZadrzavanja: string;
  komentar?: string;
}

export interface ModalProps {
  id?: number;
  prevId?: number | string;
  ime: string;
  prezime: string;
  jmbg: string;
  brPasosa: string;
  drzavljanstvo: null;
  stranac: string;
  legitimacija: null;
}

export interface CreateVozilo {
  vzId: number;
  prevId: number;
  voId: number;
  vzKomentar: string;
  vzNosivost: number;
  valid: string;
  docNum: string;
  recordType: string;
  otpremnicaId: number | string;
  liscneStvariVozaca: string;
}

export interface NosivostProps {
  nosivost: number;
  licneStvari?: string;
  komentar?: string;
  docNum?: string;
}

export interface PotvrdaUlaskavozila {
  uiVzId: number;
  uiVoId: number;
  ime: string;
  prezime: string;
  jmbg: string;
  brPasosa: string;
  regVozila: string;
  insertDate: string;
  komentar: string;
}

export interface UiVoziloUpdate {
  uiVzId?: number;
  uiVoId: number;
  potvrdiPonisti: boolean;
  ulazIzlaz: string;
}
export interface UiVozacUpdate {
  uiVoId: number;
  potvrdiPonisti: boolean;
  ulazIzlaz: string;
}

export interface OtpremnicaData {
  value: {
    porudzbenicaId: string;
  };
  error: {
    code: string;
    description: string;
  };
}

export interface DopremaCreate {
  uiVzId?: number;
  uiVoId?: number;
  vzKomentar?: string;
  vzNosivost?: number;
  valid?: string;
  docNum?: string;
  recordType?: string;
  otpremnicaId?: number;
}
export interface DopremaKupacRegOznaka {
  prevId?: number | undefined;
  prevNaziv?: string;
  prevCode?: null | string;
  id?: number;
  vrVozId?: number;
  vzRegVoz?: string;
  vzBrMotora?: null | string;
  vzRegPrik?: null | string;
}

export interface prevoznikCreateProps {
  id?: number;
  prevNaziv: string;
  prevCode?: string;
}

export interface DopremaVoziloCreate {
  id?: number;
  vrVozId?: number;
  vzRegVoz: string;
  vzRegPrik?: string;
  prevId: number;
}

export interface PotvrdaIzlaskaVozaca {
  brPasosa?: string;
  ime: string;
  insertDate?: string;
  jmbg: string;
  komentar?: string;
  prezime: string;
  regVozila: string;
  uiVoId: number;
  uiVoIzlaz?: string;
  uiVoUlaz?: string;
  uiVzId?: number;
  uiVzIzlaz?: number;
  uiVzUlaz?: string;
  ku?: string;
  licneStvari?: string;
}

export interface PotvrdiIzlazakVozacaButton {
  uiVoId: number;
  potvrdiPonisti: boolean;
  ulazIzlaz: string;
  uiVzId?: number;
}

export interface PregledUlazakaIzvestaji {
  vzRegVoz: string;
  vzRegPrik?: string;
  jmbg: string;
  ime: string;
  prezime: string;
  ku: number | string;
  vremeUlaska: string;
  ki: number | string;
  vremeIzlaska: string;
}
export interface UlazIzlazKamionaIzvestaji {
  brdokumenta?: string;
  datumprijave?: string;
  prevId?: number;
  id?: number;
  ime: string;
  jmbg: string;
  ki?: number | null;
  komentar: string;
  ku?: number | null;
  kupacnaziv?: string;
  mestonaziv?: string;
  prevcode?: string;
  prevoznikname?: string;
  prezime: string;
  razlogulaska?: string;
  regprikolice: string;
  regvozila: string;
  vremeizlaska: string | null;
  vremeulaska: string;
  vremezadrzavanja?: string;
}

export interface KapijaPromet {
  kapija: number;
  brojProlazaka: number;
}

export interface DnevniPrometKapijeProps {
  izlazak: KapijaPromet[];
  ukupnoIzlazaka: number;
  ulazak: KapijaPromet[];
  ukupnoUlazaka: number;
}

export interface UserLogin {
  username: string;
  password: string;
}
