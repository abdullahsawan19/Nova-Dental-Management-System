import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentService } from "../../features/services/serviceSlice";
import { Box, Typography, Button, Container, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const { currentService, isLoading } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // تنظيف الـ State لما نخرج من الصفحة عشان لما ندخل خدمة تانية متبقاش القديمة ظاهرة
  useEffect(() => {
    return () => {
      dispatch(clearCurrentService());
    };
  }, [dispatch]);

  if (isLoading || !currentService) {
    return (
      <Typography sx={{ p: 5, textAlign: "center" }}>
        Loading details...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Grid container spacing={4}>
          {/* الصورة */}
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
              }}
            />
          </Grid>

          {/* البيانات */}
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
              color="primary"
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
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              {currentService.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, width: "fit-content" }}
            >
              Book Appointment Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ServiceDetails;
