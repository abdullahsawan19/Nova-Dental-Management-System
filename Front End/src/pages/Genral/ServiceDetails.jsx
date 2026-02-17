import { useSelector } from "react-redux";
import { Box, Typography, Button, Container, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const { currentService, isLoading } = useSelector((state) => state.services);
  const navigate = useNavigate();

  if (isLoading || !currentService) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ p: 5, textAlign: "center", color: "text.primary" }}>
          Loading details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Back
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={`${import.meta.env.VITE_API_URL}/uploads/${currentService.image}`}
                alt={currentService.name}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  maxHeight: 400,
                  objectFit: "cover",
                  bgcolor: "action.hover",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                color="primary.main"
              >
                {currentService.name}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Fees: {currentService.fees} EGP
              </Typography>
              <Typography
                variant="body1"
                paragraph
                color="text.primary"
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                {currentService.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ServiceDetails;
