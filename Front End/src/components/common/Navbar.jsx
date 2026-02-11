import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useFetcher } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";

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
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import UpdatePatientData from "../../pages/Genral/UpdatePatientData";

const Navbar = () => {
  const dispatch = useDispatch();
  const fetcher = useFetcher();
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth || {});

  const handleOpen = () => {
    fetcher.load("/profile/update");
    setOpenProfile(true);
    setMobileOpen(false);
  };

  const handleClose = () => setOpenProfile(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon sx={{ color: "#1976d2" }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                ClinicPro
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { md: 1.5, lg: 3 },
              justifyContent: "center",
              flexGrow: 1,
              px: 2,
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
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                {link.title}
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0,
            }}
          >
            {token ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "600",
                    display: "block",
                    color: "#333",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {user?.name}
                </Typography>

                <Tooltip title="Profile Settings">
                  <IconButton onClick={handleOpen} sx={{ color: "#1976d2" }}>
                    <AccountCircleIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>

                <Button
                  onClick={() => dispatch(logoutUser())}
                  variant="text"
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: "#d32f2f",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    px: 1,
                    "&:hover": {
                      bgcolor: "#d32f2f",
                      color: "#fff",
                      "& .MuiButton-startIcon": { color: "#fff" },
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 240 } }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography
            variant="h6"
            sx={{ my: 2, fontWeight: "bold", color: "#1976d2" }}
          >
            ClinicPro
          </Typography>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemText>
                  <Link
                    to={link.path}
                    style={{
                      textDecoration: "none",
                      color: "#555",
                      display: "block",
                      padding: "12px",
                    }}
                    onClick={handleDrawerToggle}
                  >
                    {link.title}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

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
