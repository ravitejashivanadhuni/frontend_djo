import React, { useState, useEffect } from "react";
import AlertBar from "../alertbar";
import TopTicker from "../topticker";
import Navbar from "../navbar";

function MainLayout({ children, isMobile, isDesktop, C, bp }) {

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AlertBar
        isMobile={false}
        C={{ accent: "#ff4d4f" }}
      />

      <TopTicker
        isMobile={isMobile}
        isDesktop={isDesktop}
        C={C}
        gutter="16px"
      />

      <Navbar
        bp={bp}
        sticky={isSticky}
        onMenuOpen={() => console.log("menu open")}
      />

      {children}
    </>
  );
}

export default MainLayout;