import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import AdminSidebar from "../features/admin/Pages/AdminSidebar";

const drawerWidth = 240;

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", bgcolor: "#1b0c0c" }}>
      <CssBaseline />
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
