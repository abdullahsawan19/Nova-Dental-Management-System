import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReviewForm from "../../features/reviews/ReviewForm";

const PublicReviews = () => {
  const { reviews } = useSelector((state) => state.reviews || {});
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const { token } = useSelector((state) => state.auth || {});
  const theme = useTheme();

  const [openForm, setOpenForm] = useState(false);

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const cardsToShow = isLarge ? 4 : isMedium ? 2 : 1;
  const [startIndex, setStartIndex] = useState(0);

  const validStartIndex =
    startIndex >= safeReviews.length && safeReviews.length > 0 ? 0 : startIndex;

  const isSliderActive = safeReviews.length > cardsToShow;

  const handleNext = () => {
    setStartIndex((validStartIndex + 1) % safeReviews.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (validStartIndex - 1 + safeReviews.length) % safeReviews.length,
    );
  };

  const visibleReviews = isSliderActive
    ? Array.from({ length: cardsToShow }).map(
        (_, i) => safeReviews[(validStartIndex + i) % safeReviews.length],
      )
    : safeReviews;

  return (
    <Box
      id="reviews"
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: 6,
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          color="text.primary"
        >
          Patient Stories
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 4,
            bgcolor: "primary.main",
            borderRadius: 2,
            mb: 2,
          }}
        />

        {token && (
          <Button
            variant="contained"
            startIcon={<RateReviewIcon />}
            onClick={() => setOpenForm(true)}
            sx={{
              position: { md: "absolute" },
              right: 0,
              top: 0,
              borderRadius: 8,
              fontWeight: "bold",
            }}
          >
            Write a Review
          </Button>
        )}
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
          alignItems="stretch"
          sx={{ transition: "all 0.5s ease" }}
        >
          {visibleReviews.map((review, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={`${review._id}-${index}`}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  p: 2,
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        lineHeight={1.2}
                        color="text.primary"
                      >
                        {review.user?.name || "Anonymous"}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Treated by Dr. {review.doctorName}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontStyle: "italic",
                      }}
                    >
                      "{review.review}"
                    </Typography>
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

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.primary",
          }}
        >
          <b>Share Your Experience</b>
          <IconButton
            onClick={() => setOpenForm(false)}
            size="small"
            sx={{ color: "text.primary" }}
          >
            <Typography fontWeight="bold">X</Typography>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "divider" }}>
          <ReviewForm onSuccess={() => setOpenForm(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PublicReviews;
