import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Paper,
  alpha,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import Button from "../../components/ui/Button";

const DetailItem = ({ icon, label, value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        px: 2,
        borderRadius: 2,
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateX(5px)",
          borderColor: "primary.main",
          boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          flexShrink: 0,
          boxShadow: 1,
        }}
      >
        {React.cloneElement(icon, { fontSize: "small" })}
      </Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="bold"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: "0.7rem",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight="bold"
          sx={{ fontSize: "0.95rem", mt: 0.2 }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const DoctorDetails = () => {
  const doctor = useLoaderData();
  const navigate = useNavigate();

  const { user = {}, education = "", photo = "", specialization = "" } = doctor;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            mb: 2,
            width: "fit-content",
            bgcolor: "transparent",
            color: "text.secondary",
            py: 0.5,
            px: 1,
            "&:hover": {
              bgcolor: "action.hover",
              color: "text.primary",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowBackIcon fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Back
            </Typography>
          </Box>
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={5} sx={{ p: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 300, md: "100%" },
                  minHeight: 350,
                  maxHeight: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 1,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    photo && photo !== "Doctor.jfif"
                      ? `${import.meta.env.VITE_API_URL}/uploads/${photo}`
                      : "/default-doctor.jpg"
                  }
                  alt={user?.name || "Doctor"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              sx={{
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  color="text.primary"
                  gutterBottom
                >
                  Dr. {user?.name || "Unknown"}
                </Typography>

                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1.5,
                  }}
                >
                  <LocalHospitalIcon sx={{ fontSize: "1rem" }} />
                  <Typography variant="body2" fontWeight="bold">
                    {specialization || "General Dentist"}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Professional Details
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mb: 4,
                }}
              >
                <DetailItem
                  icon={<SchoolIcon />}
                  label="Education"
                  value={education || "Pending update..."}
                />
                <DetailItem
                  icon={<EmailIcon />}
                  label="Email"
                  value={user?.email || "Not available"}
                />
                <DetailItem
                  icon={<PhoneIcon />}
                  label="Phone"
                  value={user?.phone || "Not available"}
                />
              </Box>

              <Button
                onClick={() => navigate("/appointment")}
                sx={{
                  mt: "auto",
                  py: 1.2,
                  fontSize: "1rem",
                  boxShadow: 2,
                  borderRadius: 2,
                }}
              >
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorDetails;
