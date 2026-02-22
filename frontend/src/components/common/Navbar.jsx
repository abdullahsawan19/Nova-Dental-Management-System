import React, { useState, useMemo, memo } from "react";
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
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UpdatePatientData from "../../pages/General/UpdatePatientData";
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
  const { activeBranch } = useSelector((state) => state.branches || {});

  const { mode, toggleColorMode } = useThemeContext();
  const currentHash = useScrollSpy();

  const lang = user?.preferredLanguage || "en";

  const branchName = useMemo(() => {
    const val = activeBranch?.name;
    if (!val) return "ClinicPro";
    if (typeof val === "string") return val;
    return val[lang] || val.en || val.ar || "ClinicPro";
  }, [activeBranch, lang]);

  const handleOpen = () => {
    fetcher.load("/profile/update");
    setOpenProfile(true);
    setMobileOpen(false);
  };

  const handleClose = () => setOpenProfile(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = (path) => {
    setMobileOpen(false);
    if (path.includes("#")) {
      const sectionId = path.split("#")[1];
      if (location.pathname === "/") {
        setTimeout(() => {
          const elem = document.getElementById(sectionId);
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
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
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Logo & Menu Toggle */}
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, mr: 0.5 }}
            >
              <MenuIcon sx={{ color: "primary.main" }} />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                maxWidth: { xs: "150px", sm: "none" },
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {branchName}
              </Link>
            </Typography>
          </Box>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <DesktopNav
              navLinks={navLinks}
              currentHash={currentHash}
              handleNavClick={handleNavClick}
              mode={mode}
            />
          </Box>

          {/* User Actions & Theme Toggle */}
          <UserActions
            token={token}
            user={user}
            mode={mode}
            toggleColorMode={toggleColorMode}
            handleOpen={handleOpen}
          />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            bgcolor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {branchName}
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton onClick={() => handleNavClick(link.path)}>
                  <ListItemText
                    primary={link.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: 500,
                          color:
                            location.pathname + location.hash === link.path
                              ? "primary.main"
                              : "text.secondary",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Profile Dialog */}
      <Dialog
        open={openProfile}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: { bgcolor: "background.paper", borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Update Profile
          </Typography>
          <IconButton onClick={handleClose} size="small">
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

export default memo(Navbar);
