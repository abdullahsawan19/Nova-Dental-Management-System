import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import FloatingChat from "../pages/General/FloatingChat";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <GlobalSpinner />
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          transition: "background-color 0.4s ease-in-out",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
      <FloatingChat />
    </Box>
  );
};

export default MainLayout;
