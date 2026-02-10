import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import GlobalSpinner from "../components/ui/GlobalSpinner";

const MainLayout = () => {
  return (
    <>
      <GlobalSpinner />
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
