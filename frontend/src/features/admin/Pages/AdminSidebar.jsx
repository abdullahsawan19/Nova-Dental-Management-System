import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { useThemeContext } from "../../../theme/ThemeContextProvider";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import StoreIcon from "@mui/icons-material/Store";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const AdminSidebar = ({ drawerWidth }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { mode, toggleColorMode } = useThemeContext();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const adminLinks = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    {
      label: "Appointments",
      path: "/admin/appointments",
      icon: <CalendarTodayIcon />,
    },
    { label: "Manage Patients", path: "/admin/users", icon: <PeopleIcon /> },
    { label: "Doctors", path: "/admin/doctors", icon: <PersonIcon /> },
    { label: "Branches", path: "/admin/branches", icon: <StoreIcon /> },
    {
      label: "Services",
      path: "/admin/services",
      icon: <MedicalServicesIcon />,
    },
    { label: "Reviews", path: "/admin/reviews", icon: <RateReviewIcon /> },
    { label: "Faq", path: "/admin/faq", icon: <LiveHelpIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          color: "text.primary",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
      anchor="left"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          🦷 Admin
        </Typography>

        <Tooltip title={mode === "dark" ? "Light Mode" : "Dark Mode"}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? (
              <LightModeIcon sx={{ color: "#fbbf24" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#374151" }} />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Divider sx={{ borderColor: "divider" }} />

      <List>
        {adminLinks.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                sx={{
                  color: "text.primary",
                  "&.Mui-selected": {
                    backgroundColor: "action.selected",
                    color: "primary.main",
                    "&:hover": { backgroundColor: "action.hover" },
                    borderRight: "4px solid",
                    borderColor: "primary.main",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "primary.main" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "medium",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ marginTop: "auto", p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
