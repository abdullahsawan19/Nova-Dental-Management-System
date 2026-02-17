import React, { useEffect, useState } from "react"; // ضفنا useState هنا
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

  const [previewImage, setPreviewImage] = useState(
    user.photo || "../../assets/public/Doctor.jfif",
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      const timer = setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
      return () => clearTimeout(timer);
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          p: 1,
          bgcolor: "background.paper",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            fontWeight="bold"
            gutterBottom
            color="text.primary"
          >
            Profile Photo
          </Typography>

          <Box
            component="img"
            src={previewImage}
            alt="Profile Preview"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              mb: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "inherit",
            }}
          />
        </Box>

        <Input
          label="Full Name"
          name="name"
          defaultValue={user.name || ""}
          required
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          defaultValue={user.phone || ""}
          required
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        />

        <Input
          label="Specialization"
          name="specialization"
          select
          defaultValue={currentSpecializationId}
          required
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        >
          {safeServices.map((service) => (
            <MenuItem
              key={service._id}
              value={service._id}
              sx={{ color: "text.primary" }}
            >
              {service.name}
            </MenuItem>
          ))}
        </Input>

        <Input
          label="Education"
          name="education.en"
          defaultValue={profile.education || ""}
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        />

        <Input
          label="Years of Experience"
          name="experienceYears"
          type="number"
          defaultValue={profile.experienceYears || ""}
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        />

        <Input
          label="Bio"
          name="bio.en"
          multiline
          rows={3}
          defaultValue={profile.bio || ""}
          fullWidth
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              bgcolor: "background.default",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
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
