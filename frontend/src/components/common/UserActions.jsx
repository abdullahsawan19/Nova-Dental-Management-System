import { Box, IconButton, Tooltip, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const UserActions = ({
  token,
  user,
  mode,
  toggleColorMode,
  handleOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 0.5, sm: 1 },
        flexShrink: 0,
      }}
    >
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? (
          <LightModeIcon sx={{ color: "#fbbf24" }} />
        ) : (
          <DarkModeIcon sx={{ color: "#374151" }} />
        )}
      </IconButton>

      {token ? (
        <>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "600",
              color: "text.primary",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            {user?.name}
          </Typography>

          {user?.role === "patient" && (
            <Tooltip title="My Appointments">
              <IconButton
                onClick={() => navigate("/my-appointments")}
                sx={{ color: "primary.main" }}
              >
                <CalendarMonthIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Profile Settings">
            <IconButton onClick={handleOpen} sx={{ color: "primary.main" }}>
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
            sx={{ bgcolor: "primary.main" }}
          >
            Login
          </Button>
        </Link>
      )}
    </Box>
  );
};
