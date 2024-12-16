import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/user"; // User context if required
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";
import App from "./App";
import { DataProvider } from "./Context/getData";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@nextui-org/react/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <BrowserRouter basename="/spk">
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </BrowserRouter>
      </DataProvider>
    </UserProvider>
  </React.StrictMode>
);
