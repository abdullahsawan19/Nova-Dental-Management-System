import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button, Alert, CircularProgress } from "@mui/material";

const UpdatePatientData = ({ fetcher, onSuccess }) => {
  const { currentUser, isLoading } = useSelector((state) => state.user);

  const isSubmitting = fetcher.state === "submitting";
  const actionData = fetcher.data;

  useEffect(() => {
    if (actionData?.success && fetcher.state === "idle") {
      const timer = setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [actionData, fetcher.state, onSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updatedName = formData.get("name");

    const confirmMsg =
      updatedName !== currentUser?.name
        ? `Are you sure you want to change the name from "${currentUser?.name}" to "${updatedName}"?`
        : "Are you sure you want to save the changes to your profile?";

    if (!window.confirm(confirmMsg)) return;

    fetcher.submit(event.currentTarget, {
      method: "patch",
      action: "/profile/update",
    });
  };

  if (isLoading && !currentUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 4,
          bgcolor: "background.paper",
        }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1, bgcolor: "background.paper" }}>
      {actionData?.success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {actionData.message}
        </Alert>
      )}
      {actionData?.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionData.error}
        </Alert>
      )}

      <fetcher.Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Full Name"
          name="name"
          defaultValue={currentUser?.name || ""}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true, sx: { color: "text.secondary" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
              "& input": { color: "text.primary" },
            },
          }}
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          defaultValue={currentUser?.email || ""}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true, sx: { color: "text.secondary" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
              "& input": { color: "text.primary" },
            },
          }}
        />

        <TextField
          label="Phone Number"
          name="phone"
          defaultValue={currentUser?.phone || ""}
          fullWidth
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true, sx: { color: "text.secondary" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
              "& input": { color: "text.primary" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </fetcher.Form>
    </Box>
  );
};

export default UpdatePatientData;
