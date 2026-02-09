import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import AdminSidebar from "../features/admin/Pages/AdminSidebar";
import GlobalSpinner from "../components/ui/GlobalSpinner";

const drawerWidth = 240;

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", bgcolor: "#1b0c0c" }}>
      <CssBaseline />

      <GlobalSpinner />

      <AdminSidebar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          color: "#fff",
          bgcolor: "#1b0c0c",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
