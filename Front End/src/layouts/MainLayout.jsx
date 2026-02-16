import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import FloatingChat from "../pages/Genral/FloatingChat";

const MainLayout = () => {
  return (
    <>
      <GlobalSpinner />
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
      <FloatingChat />
    </>
  );
};

export default MainLayout;
