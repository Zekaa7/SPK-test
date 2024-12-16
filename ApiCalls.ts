import {
  CreateVozilo,
  DopremaVoziloCreate,
  ModalProps,
  prevoznikCreateProps,
  UiVozacUpdate,
  UiVoziloUpdate,
  UserLogin,
} from "./Interface.ts";

const getToken = () => {
  return localStorage.getItem("Token/TruckTrackingSystem");
};

const fetchData = async () => {
  const token = getToken();
  const response = await fetch(
    "http://coreprod/TruckTrackingSystem/kupacGetAll",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};
export default fetchData;

export const fetchDataById = async (id: number | undefined) => {
  const token = getToken();

  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/otpremnicaGetByKupId?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPrevoznikVozilo = async (id: number) => {
  const token = getToken();

  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/prevoznikGetByVzId?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const fetchUserJMBG = async (jmbg: string) => {
  const token = getToken();
  if (!jmbg && !token) {
    return;
  }
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/vozacGetByJmbg?jmbg=${jmbg}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("HTTP error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const createNewVozac = async (data: ModalProps) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/vozacCreate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during fetch: CreateUser", error);
    throw error;
  }
};

export const voziloCreate = async (data: CreateVozilo) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/uiVoziloCreate",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
};

export const fetchGetAllVoziloVozac = async (
  ulazIzlaz: string,
  voziloVozac: string
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/uiVoziloGetAllVoziloVozac?ulazIzlaz=${ulazIzlaz}&voziloVozac=${voziloVozac}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("HTTP error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const uiVoziloUpdate = async (obj: UiVoziloUpdate) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/uiVoziloUpdate",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data", error);
    throw error;
  }
};
export const uiVozacUpdate = async (obj: UiVozacUpdate) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/uiVozacUpdate",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating data", error);
    throw error;
  }
};

export const porudzbenicaGetById = async (id: string | undefined) => {
  const token = getToken();
  if (!id) {
    return;
  }
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/porudzbenicaGetById?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const prevoznikGetAll = async () => {
  const token = getToken();
  const response = await fetch(
    "http://coreprod/TruckTrackingSystem/prevoznikGetAll",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const voziloGetAllById = async (id: number) => {
  const token = getToken();
  if (!id) {
    return;
  }
  const response = await fetch(
    `http://coreprod/TruckTrackingSystem/VoziloGetAllByPrevId?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const prevoznikCreate = async (data: prevoznikCreateProps) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/prevoznikCreate",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
};

export const dopremaVoziloCreate = async (data: DopremaVoziloCreate) => {
  const token = getToken();
  try {
    const response = await fetch(
      "http://coreprod/TruckTrackingSystem/voziloCreate",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during fetch:", error);
  }
};

export const izvestajGetUlazIzlazKamiona = async (
  pocetniDatum: string,
  krajnjiDatum: string
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/izvestajGetUlazIzlazKamiona?pocetniDatum=${pocetniDatum}&krajnjiDatum=${krajnjiDatum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const pdfUlazIzlazKamiona = async (
  pocetniDatum: string,
  krajnjiDatum: string
) => {
  try {
    const token = localStorage.getItem("Token/TruckTrackingSystem");

    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/pdfUlazIzlazKamiona?pocetniDatum=${pocetniDatum}&krajnjiDatum=${krajnjiDatum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the PDF.");
    }

    return response.blob();
  } catch (error) {
    console.error(error);
  }
};

export const excelUlazIzlazKamiona = async (
  pocetniDatum: string,
  krajnjiDatum: string
) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/excelUlazIzlazKamiona?pocetniDatum=${pocetniDatum}&krajnjiDatum=${krajnjiDatum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.blob();
  } catch (error) {
    console.error(error);
  }
};

export const izvestajGetDnevniPrometNaKapijama = async (
  izabraniDatum: string
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/izvestajGetDnevniPrometNaKapijama?datum=${izabraniDatum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const loginCall = async (user: UserLogin) => {
  try {
    const response = await fetch("http://coreprod/TruckTrackingSystem/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  const response = await fetch(
    `http://coreprod/TruckTrackingSystem/verify-token?token=${token}`
  );
  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const GetKatalogDD = async () => {
  const token = getToken();
  try {
    const response = await fetch(
      `http://coreprod/TruckTrackingSystem/GetKatalogDD
`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
