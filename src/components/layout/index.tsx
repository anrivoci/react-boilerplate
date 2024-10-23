import { useState, useCallback } from "react";
import { Outlet } from "@tanstack/react-router";
import { SideBar } from "./sidebar";
import "./layout.css";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [isSidebarOpen]);

  return (
    <div
      className={`layout ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <SideBar toggle={toggleSidebar} isOpen={isSidebarOpen} />
      <div className="main">
        <header className="header">Header</header>
        <div className="content">
          <Outlet />
        </div>
        <footer className="footer">
          © 2024 AnriVoci All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};
