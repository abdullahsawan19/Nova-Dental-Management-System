import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function AddDocForm({ onSuccess }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const actionData = fetcher.data;

  useEffect(() => {
    if (actionData?.success && fetcher.state === "idle") {
      if (onSuccess) onSuccess();
    }
  }, [actionData, fetcher.state, onSuccess]);

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "background.default",
      "& input": { color: "text.primary" },
    },
    "& .MuiInputLabel-root": { color: "text.secondary" },
  };

  return (
    <fetcher.Form method="post" noValidate>
      <input type="hidden" name="intent" value="create" />

      {actionData?.error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {actionData.error.message ||
            actionData.error.response?.data?.message ||
            "Failed to add doctor"}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            name="name"
            placeholder="e.g. Dr. Abdullah Mohamed"
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={fieldStyles}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email Address"
            type="email"
            name="email"
            placeholder="doctor@clinic.com"
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={fieldStyles}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            name="phone"
            placeholder="01xxxxxxxxx"
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={fieldStyles}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={fieldStyles}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={fieldStyles}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          startIcon={!isSubmitting && <SaveIcon />}
          sx={{ px: 4, py: 1, fontWeight: "bold", borderRadius: 2 }}
        >
          {isSubmitting ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Creating...
            </Box>
          ) : (
            "Create Doctor"
          )}
        </Button>
      </Box>
    </fetcher.Form>
  );
}
