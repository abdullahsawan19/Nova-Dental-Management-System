import React from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";

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
      color: "#1976d2",
      bgColor: "#e3f2fd",
      icon: <PeopleAltIcon fontSize="large" />,
    },
    {
      title: "Today Appointments",
      value: appointmentsToday || 0,
      color: "#2e7d32",
      bgColor: "#e8f5e9",
      icon: <EventAvailableIcon fontSize="large" />,
    },
    {
      title: "Available Doctors",
      value: doctorsCount || 0,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
      icon: <MedicalServicesIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#2c3e50",
          textAlign: "left",
        }}
      >
        Dashboard Overview
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: "12px",
          bgcolor: "primary.main",
          color: "white",
          boxShadow: "0 4px 20px rgba(25, 118, 210, 0.2)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome back, {user?.name || "Admin"} 👋
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Here is what's happening in your clinic today.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "16px",
                border: "1px solid #e0e0e0",
                borderLeft: `8px solid ${stat.color}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "900", mt: 1, color: "#2c3e50" }}
                >
                  {stat.value}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  bgcolor: stat.bgColor,
                  color: stat.color,
                  width: 56,
                  height: 56,
                }}
              >
                {stat.icon}
              </Avatar>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
