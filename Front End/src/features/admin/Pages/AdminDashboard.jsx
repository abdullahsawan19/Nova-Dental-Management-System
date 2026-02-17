import React from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Box, Avatar, Container } from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const AdminDashboard = () => {
  const { patientsCount, doctorsCount, appointmentsToday } =
    useLoaderData() || {};

  const { user } = useSelector((state) => state.auth || {});

  const stats = [
    {
      title: "Total Patients",
      value: patientsCount || 0,
      color: "primary.main",
      bgColor: "action.hover",
      icon: <PeopleAltIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Today Appointments",
      value: appointmentsToday || 0,
      color: "success.main",
      bgColor: "action.hover",
      icon: <EventAvailableIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Available Doctors",
      value: doctorsCount || 0,
      color: "secondary.main",
      bgColor: "action.hover",
      icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontWeight: "900",
            color: "text.primary",
            textAlign: "left",
            letterSpacing: -0.5,
          }}
        >
          Dashboard Overview
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 6,
            p: { xs: 4, md: 5 },
            borderRadius: "24px",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, letterSpacing: -1 }}
            >
              Welcome back, {user?.name || "Admin"} 👋
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.8, fontWeight: "400", maxWidth: "600px" }}
            >
              Everything is looking good! You have {appointmentsToday || 0}{" "}
              appointments scheduled for today.
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {" "}
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "24px",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderTop: (theme) =>
                    `8px solid ${
                      index === 0
                        ? theme.palette.primary.main
                        : index === 1
                          ? theme.palette.success.main
                          : theme.palette.secondary.main
                    }`,
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      letterSpacing: 1.5,
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "900",
                      mt: 1,
                      color: "text.primary",
                      letterSpacing: -1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: stat.bgColor,
                    color: stat.color,
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
