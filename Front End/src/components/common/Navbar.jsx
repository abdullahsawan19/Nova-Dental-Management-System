import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useFetcher, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UpdatePatientData from "../../pages/Genral/UpdatePatientData";
import { useThemeContext } from "../../theme/ThemeContextProvider";

import { useScrollSpy } from "./useScrollSpy";
import { DesktopNav } from "./DesktopNav";
import { UserActions } from "./UserActions";

const navLinks = [
  { title: "Services", path: "/#services" },
  { title: "Doctors", path: "/doctors" },
  { title: "Branches", path: "/branch" },
  { title: "About", path: "/about" },
  { title: "Reviews", path: "/#reviews" },
  { title: "FAQ", path: "/faq" },
  { title: "Book Appointment", path: "/appointment" },
];

const Navbar = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth || {});
  const { mode, toggleColorMode } = useThemeContext();
  const currentHash = useScrollSpy();

  const handleOpen = () => {
    fetcher.load("/profile/update");
    setOpenProfile(true);
    setMobileOpen(false);
  };

  const handleClose = () => setOpenProfile(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = (path) => {
    if (mobileOpen) setMobileOpen(false);
    if (path.includes("#")) {
      const sectionId = path.split("#")[1];
      if (location.pathname === "/") {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path);
      }
    }
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
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: "none" } }}
            >
              <MenuIcon sx={{ color: "primary.main" }} />
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

          <DesktopNav
            navLinks={navLinks}
            currentHash={currentHash}
            handleNavClick={handleNavClick}
            mode={mode}
          />

          <UserActions
            token={token}
            user={user}
            mode={mode}
            toggleColorMode={toggleColorMode}
            handleOpen={handleOpen}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { width: 240, bgcolor: "background.paper" },
        }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography
            variant="h6"
            sx={{ my: 2, fontWeight: "bold", color: "primary.main" }}
          >
            ClinicPro
          </Typography>
          <Divider sx={{ borderColor: "divider" }} />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemText>
                  <Box
                    component="div"
                    onClick={() => handleNavClick(link.path)}
                    sx={{
                      p: 1.5,
                      color: "text.secondary",
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.title}
                  </Box>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={openProfile}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
          },
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
          <b>Update Profile</b>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "divider" }}>
          <UpdatePatientData onSuccess={handleClose} fetcher={fetcher} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
