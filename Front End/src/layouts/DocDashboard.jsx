import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const DocDashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Doctor Dashboard</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default DocDashboard;
