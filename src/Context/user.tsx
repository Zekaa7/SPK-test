"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const MyContext = createContext<
  | {
      user: User | null;
      login: (userData: User) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

interface User {
  name: string;
  password?: string;
  token: string;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("userLogin", JSON.stringify(userData));
    // console.log(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
export default UserProvider;
