import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useFetcher,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
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

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import UpdatePatientData from "../../pages/Genral/UpdatePatientData";

const Navbar = () => {
  const dispatch = useDispatch();
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentHash, setCurrentHash] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    setCurrentHash(location.hash);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setCurrentHash("");
      return;
    }

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("#services, #reviews");

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`;
            setCurrentHash(newHash);
            window.history.replaceState(null, "", newHash);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions,
      );

      sections.forEach((sec) => observer.observe(sec));

      return () => {
        sections.forEach((sec) => observer.unobserve(sec));
        observer.disconnect();
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleOpen = () => {
    fetcher.load("/profile/update");
    setOpenProfile(true);
    setMobileOpen(false);
  };

  const handleClose = () => setOpenProfile(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { title: "Services", path: "/#services" },
    { title: "Doctors", path: "/doctors" },
    { title: "Branches", path: "/branch" },
    { title: "Book Appointment", path: "/appointment" },
    { title: "Reviews", path: "/#reviews" },
    { title: "FAQ", path: "/faq" },
    { title: "About", path: "/about" },
    { title: "AI Chat", path: "/chat" },
  ];

  const handleNavClick = (path) => {
    if (mobileOpen) setMobileOpen(false);

    if (path.includes("#")) {
      const sectionId = path.split("#")[1];

      if (location.pathname === "/") {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
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
            {navLinks.map((link) => {
              const isLinkActive = (isActive) => {
                if (link.path.includes("#")) {
                  const targetHash = link.path.split("/")[1];
                  return (
                    location.pathname === "/" && currentHash === targetHash
                  );
                }
                return isActive;
              };

              return (
                <NavLink
                  key={link.title}
                  to={link.path}
                  onClick={(e) => {
                    if (link.path.includes("#") && location.pathname === "/") {
                      e.preventDefault();
                    }
                    handleNavClick(link.path);
                  }}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isLinkActive(isActive) ? "#1976d2" : "#555",
                    fontWeight: isLinkActive(isActive) ? "700" : "500",
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  })}
                >
                  {link.title}
                </NavLink>
              );
            })}
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

                {user?.role === "patient" && (
                  <Tooltip title="My Appointments">
                    <IconButton
                      onClick={() => navigate("/my-appointments")}
                      sx={{ color: "#1976d2" }}
                    >
                      <CalendarMonthIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                )}

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
            {navLinks.map((link) => {
              const isLinkActive = (isActive) => {
                if (link.path.includes("#")) {
                  const targetHash = link.path.split("/")[1];
                  return (
                    location.pathname === "/" && currentHash === targetHash
                  );
                }
                return isActive;
              };

              return (
                <ListItem key={link.title} disablePadding>
                  <ListItemText>
                    <NavLink
                      to={link.path}
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isLinkActive(isActive) ? "#1976d2" : "#555",
                        fontWeight: isLinkActive(isActive) ? "700" : "500",
                        display: "block",
                        padding: "12px",
                        transition: "color 0.3s ease",
                      })}
                      onClick={(e) => {
                        if (
                          link.path.includes("#") &&
                          location.pathname === "/"
                        ) {
                          e.preventDefault();
                        }
                        handleNavClick(link.path);
                      }}
                    >
                      {link.title}
                    </NavLink>
                  </ListItemText>
                </ListItem>
              );
            })}
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
