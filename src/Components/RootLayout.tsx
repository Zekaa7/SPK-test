import React from "react";
import { UserProvider } from "../Context/user"; 
import { DataProvider } from "../Context/getData"; 
import Layout from "./Layout"; 

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <UserProvider>
        <DataProvider>
          <Layout>{children}</Layout>
        </DataProvider>
      </UserProvider>
    </div>
  );
};

export default RootLayout;
