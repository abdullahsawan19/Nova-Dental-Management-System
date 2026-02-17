import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PublicServices = () => {
  const { services } = useSelector((state) => state.services || {});
  const safeServices = Array.isArray(services) ? services : [];

  const navigate = useNavigate();
  const theme = useTheme();

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const cardsToShow = isLarge ? 4 : isMedium ? 2 : 1;
  const [startIndex, setStartIndex] = useState(0);

  const isSliderActive = safeServices.length > cardsToShow;

  useEffect(() => {
    if (startIndex >= safeServices.length && safeServices.length > 0) {
      setStartIndex(0);
    }
  }, [safeServices.length, startIndex]);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % safeServices.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + safeServices.length) % safeServices.length,
    );
  };

  const visibleServices = isSliderActive
    ? Array.from({ length: cardsToShow }).map(
        (_, i) => safeServices[(startIndex + i) % safeServices.length],
      )
    : safeServices;

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: 4,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          color="text.primary"
        >
          Our Professional Services
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 4,
            bgcolor: "primary.main",
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      <Box sx={{ position: "relative", px: { xs: 0, md: 4 } }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { xs: -10, md: -20 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.main", color: "white" },
            display: isSliderActive ? "flex" : "none",
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ transition: "all 0.5s ease" }}
        >
          {visibleServices.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={`${service._id}-${index}`}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  height: "450px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => navigate(`/services/${service._id}`)}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "220px",
                    width: "100%",
                    flexShrink: 0,
                    bgcolor: "action.hover",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    image={`${import.meta.env.VITE_API_URL}/uploads/${service.image}`}
                    alt={service.name}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "background.paper",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      color: "primary.main",
                      fontSize: "0.85rem",
                      boxShadow: 1,
                    }}
                  >
                    {service.fees} EGP
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    pb: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: "55px",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Tooltip title={service.name} placement="top">
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color="text.primary"
                        sx={{
                          textAlign: "center",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: "1.2",
                          fontSize: "1.1rem",
                        }}
                      >
                        {service.name}
                      </Typography>
                    </Tooltip>
                  </Box>

                  <Box sx={{ height: "45px", overflow: "hidden", mb: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.4",
                      }}
                    >
                      {service.description ||
                        "Top-tier dental care services available."}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: "auto", width: "100%" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        height: "40px",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          bgcolor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: -10, md: -20 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.main", color: "white" },
            display: isSliderActive ? "flex" : "none",
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PublicServices;
