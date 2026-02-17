import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewService } from "../../features/services/serviceSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Input,
  Alert,
  CircularProgress,
} from "@mui/material";

const AddServiceForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, successMessage } = useSelector(
    (state) => state.services,
  );

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descEn: "",
    descAr: "",
    fees: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(
    "../../assets/public/Teeth.jfif",
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({ ...formData, image: file });

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name[en]", formData.nameEn);
    data.append("name[ar]", formData.nameAr);
    data.append("description[en]", formData.descEn);
    data.append("description[ar]", formData.descAr);
    data.append("fees", formData.fees);
    if (formData.image) {
      data.append("image", formData.image);
    }

    dispatch(createNewService(data));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        color="text.primary"
      >
        Add New Service
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name (English)"
              name="nameEn"
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.default" },
                "& .MuiInputLabel-root": { color: "text.secondary" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="الاسم (عربي)"
              name="nameAr"
              onChange={handleChange}
              dir="rtl"
              required
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.default" },
                "& .MuiInputLabel-root": { color: "text.secondary" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description (English)"
              name="descEn"
              multiline
              rows={3}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.default" },
                "& .MuiInputLabel-root": { color: "text.secondary" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="الوصف (عربي)"
              name="descAr"
              multiline
              rows={3}
              onChange={handleChange}
              dir="rtl"
              required
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.default" },
                "& .MuiInputLabel-root": { color: "text.secondary" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Fees"
              name="fees"
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.default" },
                "& .MuiInputLabel-root": { color: "text.secondary" },
              }}
            />
          </Grid>

          {/* تعديل مكان الـ Input الخاص بالصورة */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // عشان نوسطن الصورة
                gap: 1.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                alignSelf="flex-start" // نخلي النص على الشمال
              >
                Service Image
              </Typography>

              {/* 3. عرض الصورة هنا */}
              <Box
                component="img"
                src={previewImage}
                alt="Service Preview"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 2, // خليناها حواف ناعمة بدل الدائرة عشان دي خدمة مش شخص
                  objectFit: "cover",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />

              <Input
                type="file"
                disableUnderline
                fullWidth
                onChange={handleFileChange}
                sx={{ color: "text.primary" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ mt: 2, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Service"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddServiceForm;
