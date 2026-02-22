import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import DoctorNav from "../features/Doctor/DoctorNav";

const DocDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <DoctorNav />

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DocDashboard;
