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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
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
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              type="file"
              disableUnderline
              fullWidth
              onChange={handleFileChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Create Service"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddServiceForm;
