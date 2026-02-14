import React, { useState } from "react";
import { useNavigate, useFetcher } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import EditForm from "../../pages/Doctor/EditForm";

const DoctorNav = () => {
  const dispatch = useDispatch();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpen = () => setOpenProfile(true);
  const handleClose = () => setOpenProfile(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#fff",
          color: "#000",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalHospitalIcon
              sx={{ color: "#1976d2", display: { xs: "none", sm: "block" } }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "800",
                color: "#1976d2",
                letterSpacing: "-0.5px",
              }}
            >
              Doctor Dashboard
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "700",
                color: "#333",
                display: { xs: "none", sm: "block" },
              }}
            >
              Dr. {user?.name || "Doctor"}
            </Typography>

            <Tooltip title="Update Profile">
              <IconButton
                onClick={handleOpen}
                sx={{ color: "#1976d2", bgcolor: "rgba(25, 118, 210, 0.08)" }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Button
              onClick={handleLogout}
              variant="text"
              startIcon={<LogoutIcon />}
              sx={{
                color: "#d32f2f",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                display: { xs: "none", sm: "flex" },
                "&:hover": {
                  bgcolor: "#d32f2f",
                  color: "#fff",
                  "& .MuiButton-startIcon": { color: "#fff" },
                },
              }}
            >
              Logout
            </Button>

            <IconButton
              onClick={handleLogout}
              sx={{
                color: "#d32f2f",
                display: { xs: "flex", sm: "none" },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={openProfile} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b>Update Professional Profile</b>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <EditForm onSuccess={handleClose} fetcher={fetcher} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorNav;
