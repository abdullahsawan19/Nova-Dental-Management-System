import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useFetcher } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import Button from "../ui/Button";
import {
  IconButton,
  Tooltip,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import UpdatePatientData from "../../pages/Genral/UpdatePatientData";

const Navbar = () => {
  const dispatch = useDispatch();
  const fetcher = useFetcher(); // الـ fetcher المسؤول عن سحب بيانات البروفايل
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth || {});

  const handleOpen = () => {
    fetcher.load("/profile/update");
    setOpenProfile(true);
  };

  const handleClose = () => setOpenProfile(false);

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      const timer = setTimeout(() => setOpenProfile(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data, fetcher.state]);

  const navLinks = [
    { title: "Services", path: "/services" },
    { title: "Doctors", path: "/doctors" },
    { title: "Branches", path: "/branch" },
    { title: "Reviews", path: "/reviews" },
    { title: "FAQ", path: "/faq" },
    { title: "About", path: "/about" },
    { title: "AI Chat", path: "/chat" },
  ];

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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                ClinicPro
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                style={{
                  textDecoration: "none",
                  color: "#555",
                  fontWeight: "500",
                }}
              >
                {link.title}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {token ? (
              <>
                <Tooltip title="Profile Settings">
                  <IconButton onClick={handleOpen} sx={{ color: "#1976d2" }}>
                    <AccountCircleIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "600",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {user?.name}
                </Typography>
                <Button
                  onClick={() => dispatch(logoutUser())}
                  variant="outlined"
                  size="small"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="small">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={openProfile} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b>Update Profile</b>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <UpdatePatientData onSuccess={handleClose} fetcher={fetcher} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
