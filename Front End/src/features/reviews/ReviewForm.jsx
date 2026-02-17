import React, { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  CircularProgress,
} from "@mui/material";

const ReviewForm = ({ onSuccess }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      onSuccess();
    }
  }, [fetcher.data, fetcher.state, onSuccess]);

  return (
    <fetcher.Form method="post" action="/?index">
      <input type="hidden" name="intent" value="create" />
      <input type="hidden" name="rating" value={rating} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 1,
          bgcolor: "background.paper",
        }}
      >
        <Box>
          <Typography component="legend" fontWeight="bold" color="text.primary">
            Your Rating
          </Typography>
          <Rating
            name="rating-ui"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
        </Box>

        <TextField
          name="doctorName"
          label="Doctor Name"
          variant="outlined"
          fullWidth
          required
          placeholder="e.g., Ahmed Ali"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
              "& input": { color: "text.primary" },
            },
            "& .MuiInputLabel-root": { color: "text.secondary" },
          }}
        />

        <TextField
          name="review"
          label="Your Review"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
          placeholder="Tell us about your experience..."
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
              "& textarea": { color: "text.primary" },
            },
            "& .MuiInputLabel-root": { color: "text.secondary" },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{ fontWeight: "bold", mt: 1 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Review"
          )}
        </Button>
      </Box>
    </fetcher.Form>
  );
};

export default ReviewForm;
