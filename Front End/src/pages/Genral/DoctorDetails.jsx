import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const DoctorDetails = () => {
  const doctor = useLoaderData();
  const navigate = useNavigate();

  if (!doctor || Object.keys(doctor).length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" color="error">
          No details found for this doctor.
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const { user = {}, education = "", photo = "", specialization = "" } = doctor;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                bgcolor: "action.hover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
              }}
            >
              <Card
                sx={{
                  borderRadius: "50%",
                  width: 250,
                  height: 250,
                  border: 5,
                  borderColor: "background.paper",
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    photo && photo !== "Doctor.jfif"
                      ? `${import.meta.env.VITE_API_URL}/uploads/${photo}`
                      : "/default-doctor.jpg"
                  }
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={user?.name || "Doctor"}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight="800"
                    color="text.primary"
                    gutterBottom
                  >
                    Dr. {user?.name || "Unknown"}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LocalHospitalIcon />
                    {specialization || "General Dentist"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: 8, px: 4, fontWeight: "bold" }}
                >
                  Book Appointment
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
              >
                Professional Details
              </Typography>

              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Education & Background"
                    secondary={education || "Pending update..."}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "text.primary",
                    }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>

                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Address"
                    secondary={user?.email || "Not available"}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "text.primary",
                    }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>

                <ListItem disablePadding>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone Number"
                    secondary={user?.phone || "Not available"}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "text.primary",
                    }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DoctorDetails;
