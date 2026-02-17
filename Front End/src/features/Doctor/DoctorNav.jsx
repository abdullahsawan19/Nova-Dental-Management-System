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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditForm from "../../pages/Doctor/EditForm";
import { useThemeContext } from "../../theme/ThemeContextProvider";

const DoctorNav = () => {
  const dispatch = useDispatch();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});
  const { mode, toggleColorMode } = useThemeContext();
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
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalHospitalIcon
              sx={{
                color: "primary.main",
                display: { xs: "none", sm: "block" },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "800",
                color: "primary.main",
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
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              Dr. {user?.name || "Doctor"}
            </Typography>

            <Tooltip
              title={
                mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? (
                  <LightModeIcon sx={{ color: "#fbbf24" }} />
                ) : (
                  <DarkModeIcon sx={{ color: "#374151" }} />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Update Profile">
              <IconButton
                onClick={handleOpen}
                sx={{
                  color: "primary.main",
                  bgcolor: "action.hover",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Button
              onClick={handleLogout}
              variant="text"
              startIcon={<LogoutIcon />}
              sx={{
                color: "error.main",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                display: { xs: "none", sm: "flex" },
                "&:hover": {
                  bgcolor: "error.main",
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
                color: "error.main",
                display: { xs: "flex", sm: "none" },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={openProfile}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { bgcolor: "background.paper" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.primary",
          }}
        >
          <b>Update Professional Profile</b>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "divider" }}>
          <EditForm onSuccess={handleClose} fetcher={fetcher} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorNav;
