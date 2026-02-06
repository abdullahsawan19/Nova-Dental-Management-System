import React from "react";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

const DashboardLayout = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
