import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CustomCard from "../../components/ui/CustomCard";
import Button from "../../components/ui/Button";

const PublicServices = () => {
  const { services } = useSelector((state) => state.services || {});
  const safeServices = Array.isArray(services) ? services : [];

  const navigate = useNavigate();
  const theme = useTheme();

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const cardsToShow = isLarge ? 4 : isMedium ? 2 : 1;
  const [startIndex, setStartIndex] = useState(0);

  const validStartIndex =
    startIndex >= safeServices.length && safeServices.length > 0
      ? 0
      : startIndex;

  const isSliderActive = safeServices.length > cardsToShow;

  const handleNext = () => {
    setStartIndex((validStartIndex + 1) % safeServices.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (validStartIndex - 1 + safeServices.length) % safeServices.length,
    );
  };

  const visibleServices = isSliderActive
    ? Array.from({ length: cardsToShow }).map(
        (_, i) => safeServices[(validStartIndex + i) % safeServices.length],
      )
    : safeServices;

  if (safeServices.length === 0) return null;

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
              <CustomCard
                variant="outlined"
                mediaHeight={220}
                media={`${import.meta.env.VITE_API_URL}/uploads/${service.image}`}
                mediaAlt={service.name}
                sx={{
                  position: "relative",
                  height: "450px",
                  width: "230px",
                  minWidth: "230px",
                  maxWidth: "230px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  "& .MuiCardMedia-root": {
                    flexShrink: 0,
                    bgcolor: "action.hover",
                  },
                  "& .MuiCardContent-root": {
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    pb: 0,
                    width: "100%",
                    overflow: "hidden",
                    boxSizing: "border-box",
                  },
                }}
                actionsSx={{ width: "100%", p: 2, pt: 2 }}
                actions={
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/services/${service._id}`)}
                    sx={{
                      height: "40px",
                      py: 0,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    View Details
                  </Button>
                }
              >
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
                    boxShadow: 2,
                    zIndex: 10,
                  }}
                >
                  {service.fees} EGP
                </Box>

                <Box sx={{ width: "100%", overflow: "hidden", px: 1 }}>
                  <Tooltip title={service.name} placement="top">
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      color="text.primary"
                      sx={{
                        mb: 0.5,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Tooltip>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mt: 1,
                    }}
                  >
                    {service.description ||
                      "Top-tier dental care services available."}
                  </Typography>
                </Box>
              </CustomCard>
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
