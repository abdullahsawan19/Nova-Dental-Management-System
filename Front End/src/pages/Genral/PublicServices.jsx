import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PublicServices = () => {
  const { services } = useSelector((state) => state.services);
  const navigate = useNavigate();

  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 3; 

  const handleNext = () => {
    if (startIndex + cardsToShow < services.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const visibleServices = services.slice(startIndex, startIndex + cardsToShow);

  return (
    <Box sx={{ position: "relative", p: 3 }}>
      <IconButton
        onClick={handlePrev}
        disabled={startIndex === 0}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.7)",
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <Grid container spacing={3} justifyContent="center">
        {visibleServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card
              sx={{ cursor: "pointer", height: "100%" }}
              onClick={() => navigate(`/services/${service._id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${import.meta.env.VITE_API_URL}/uploads/${service.image}`}
                alt={service.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                >
                  {service.name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {service.fees} EGP
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" fullWidth>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <IconButton
        onClick={handleNext}
        disabled={startIndex + cardsToShow >= services.length}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.7)",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default PublicServices;
