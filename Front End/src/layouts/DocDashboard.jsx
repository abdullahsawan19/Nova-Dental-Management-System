import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

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
