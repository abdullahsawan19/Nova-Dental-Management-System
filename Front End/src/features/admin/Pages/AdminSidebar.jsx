import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../auth/authSlice";

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
import { useDispatch } from "react-redux";

const AdminSidebar = ({ drawerWidth }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
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
          backgroundColor: "#1b0c0c",
          borderRight: "3px solid #e0e0e0",
        },
      }}
      anchor="left"
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          🦷 Admin Panel
        </Typography>
      </Toolbar>
      <Divider />

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
                  color: "rgb(255, 255, 255)",
                  "&.Mui-selected": {
                    backgroundColor: "#1a1d20",
                    color: "rgb(255, 255, 255)",
                    "&:hover": { backgroundColor: "#394a58" },
                    borderRight: "4px solid #1976d2",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#1976d2" : "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
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
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
