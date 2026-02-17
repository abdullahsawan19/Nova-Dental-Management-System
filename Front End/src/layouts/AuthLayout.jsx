import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../theme/ThemeContextProvider";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        background: (theme) =>
          theme.palette.mode === "light"
            ? "radial-gradient(circle at 2% 10%, rgba(37, 99, 235, 0.05) 0%, transparent 50%), radial-gradient(circle at 98% 90%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)"
            : "radial-gradient(circle at 2% 10%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: { xs: 2, sm: 3 },
          zIndex: 10,
        }}
      >
        <Tooltip title="Back to Home">
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 2,
              border: 1,
              borderColor: "divider",
              "&:hover": {
                bgcolor: "action.hover",
                transform: "translateX(-4px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h6"
          fontWeight="900"
          color="primary.main"
          sx={{
            display: { xs: "none", sm: "block" },
            opacity: 0.8,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ClinicPro
        </Typography>

        <IconButton
          onClick={toggleColorMode}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 2,
            border: 1,
            borderColor: "divider",
          }}
        >
          {mode === "dark" ? (
            <LightModeIcon sx={{ color: "#fbbf24", fontSize: 20 }} />
          ) : (
            <DarkModeIcon sx={{ color: "#374151", fontSize: 20 }} />
          )}
        </IconButton>
      </Stack>

      <GlobalSpinner />

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
