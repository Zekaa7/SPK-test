import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
// import truckWallpaper from "/images/truck-wallpaper.jpg";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavBarOnLogin = location.pathname === "/login";

  return (
    <Fragment>
      {!hideNavBarOnLogin && <NavBar />}
      <div className="relative w-auto h-screen">
        <img
          src="/spk/images/truck-wallpaper.jpg"
          alt="Truck wallpaper"
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
