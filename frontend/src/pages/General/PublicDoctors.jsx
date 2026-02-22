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
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CustomCard from "../../components/ui/CustomCard";
import Button from "../../components/ui/Button";

const PublicDoctors = () => {
  const { doctors } = useSelector((state) => state.doctor || {});
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  const navigate = useNavigate();
  const theme = useTheme();

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const cardsToShow = isLarge ? 4 : isMedium ? 2 : 1;
  const [startIndex, setStartIndex] = useState(0);

  if (safeDoctors.length === 0) return null;

  const isSliderActive = safeDoctors.length > cardsToShow;

  const actualStartIndex = startIndex >= safeDoctors.length ? 0 : startIndex;

  const handleNext = () => {
    setStartIndex((actualStartIndex + 1) % safeDoctors.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (actualStartIndex - 1 + safeDoctors.length) % safeDoctors.length,
    );
  };

  const visibleDoctors = isSliderActive
    ? Array.from({ length: cardsToShow }).map(
        (_, i) => safeDoctors[(actualStartIndex + i) % safeDoctors.length],
      )
    : safeDoctors;

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: 4,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <Box
          onClick={() => navigate("/doctors")}
          sx={{
            textAlign: "center",
            cursor: "pointer",
            display: "inline-block",
            p: 1,
            "&:hover .title-text": { color: "primary.main" },
            "&:hover .underline": { width: "100%" },
            "&:hover .icon": { transform: "translateX(8px)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography
              className="title-text"
              variant="h4"
              fontWeight="800"
              color="text.primary"
              sx={{ transition: "color 0.3s ease" }}
            >
              Our Doctors
            </Typography>
            <ArrowForwardIosIcon
              className="icon"
              sx={{
                color: "primary.main",
                fontSize: "1.5rem",
                transition: "transform 0.3s ease",
              }}
            />
          </Box>
          <Box
            className="underline"
            sx={{
              width: 60,
              height: 4,
              bgcolor: "primary.main",
              mx: "auto",
              borderRadius: 2,
              transition: "width 0.3s ease",
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block", fontWeight: 500 }}
          >
            View All
          </Typography>
        </Box>
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
          {visibleDoctors.map((doc, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={`${doc._id}-${index}`}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CustomCard
                variant="outlined"
                mediaHeight={250}
                media={
                  doc.photo && doc.photo !== "Doctor.jfif"
                    ? `${import.meta.env.VITE_API_URL}/uploads/${doc.photo}`
                    : "/default-doctor.jpg"
                }
                mediaAlt={doc.user?.name || "Doctor"}
                sx={{
                  height: "450px",
                  width: "230px",

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
                    onClick={() => navigate(`/doctors/${doc._id}`)}
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
                <Box sx={{ width: "100%", overflow: "hidden", px: 1 }}>
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
                    Dr. {doc.user?.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight="bold"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {doc.specialization || "General Dentist"}
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

export default PublicDoctors;
