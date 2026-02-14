import React, { useEffect } from "react";
import { Box, CircularProgress, MenuItem, Typography } from "@mui/material";
import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const EditForm = ({ fetcher, onSuccess }) => {
  const isSubmitting = fetcher.state === "submitting";

  const doctorData = useRouteLoaderData("doctor-root");
  const profile = doctorData?.data?.doctor || {};
  const user = profile?.user || {};

  const { services } = useSelector((state) => state.services || {});
  const safeServices = Array.isArray(services) ? services : [];

  const currentSpecializationId = profile.specializationData?.id || "";

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      onSuccess();
    }
  }, [fetcher.data, fetcher.state, onSuccess]);

  return (
    <fetcher.Form
      method="patch"
      action="/doctor/my-profile"
      encType="multipart/form-data"
    >
      <input type="hidden" name="intent" value="updateProfile" />

      <Box
        key={profile._id || "loading"}
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 1 }}
      >
        <Box>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Profile Photo
          </Typography>
          <input
            type="file"
            name="photo"
            accept="image/*"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </Box>

        <Input
          label="Full Name"
          name="name"
          defaultValue={user.name || ""}
          required
          fullWidth
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          defaultValue={user.phone || ""}
          required
          fullWidth
        />

        <Input
          label="Specialization"
          name="specialization"
          select
          defaultValue={currentSpecializationId}
          required
          fullWidth
        >
          {safeServices.map((service) => (
            <MenuItem key={service._id} value={service._id}>
              {service.name}
            </MenuItem>
          ))}
        </Input>

        <Input
          label="Education"
          name="education.en"
          defaultValue={profile.education || ""}
          fullWidth
        />

        <Input
          label="Years of Experience"
          name="experienceYears"
          type="number"
          defaultValue={profile.experienceYears || ""}
          fullWidth
        />

        <Input
          label="Bio"
          name="bio.en"
          multiline
          rows={3}
          defaultValue={profile.bio || ""}
          fullWidth
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            backgroundColor: isSubmitting ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} color="inherit" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </fetcher.Form>
  );
};

export default EditForm;
