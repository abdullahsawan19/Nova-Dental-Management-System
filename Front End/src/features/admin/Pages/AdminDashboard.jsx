import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,250",
      color: "#1976d2",
      bgColor: "#e3f2fd",
      icon: <PeopleAltIcon fontSize="large" />,
    },
    {
      title: "Today Appointments",
      value: "12",
      color: "#2e7d32",
      bgColor: "#e8f5e9",
      icon: <EventAvailableIcon fontSize="large" />,
    },
    {
      title: "Available Doctors",
      value: "8",
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
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "12px",
                borderLeft: `8px solid ${stat.color}`,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", mt: 1, color: "#34495e" }}
                >
                  {stat.value}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  bgcolor: stat.bgColor,
                  color: stat.color,
                  width: 64,
                  height: 64,
                }}
              >
                {stat.icon}
              </Avatar>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          borderRadius: "12px",
          bgcolor: "#fff",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hello
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
