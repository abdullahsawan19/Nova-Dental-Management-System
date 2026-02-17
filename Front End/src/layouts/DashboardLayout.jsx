import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import AdminSidebar from "../features/admin/Pages/AdminSidebar";
import GlobalSpinner from "../components/ui/GlobalSpinner";

const drawerWidth = 240;

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      <GlobalSpinner />

      <AdminSidebar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          color: "text.primary",
          bgcolor: "background.default",
          minHeight: "100vh",
          transition:
            "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
