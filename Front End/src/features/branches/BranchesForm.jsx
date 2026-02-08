import { Form, useActionData } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/ui/Input";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const BranchesForm = () => {
  const [openForm, setOpenForm] = useState(false);
  const [phonesCount, setPhonesCount] = useState([0]);
  const actionData = useActionData();

  const handleClickOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);

  const addPhoneField = () =>
    setPhonesCount([...phonesCount, phonesCount.length]);
  const removePhoneField = (index) =>
    setPhonesCount(phonesCount.filter((_, i) => i !== index));

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add New Branch
      </Button>

      <Dialog open={openForm} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Branch
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          {actionData?.error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {actionData.error}
            </Typography>
          )}

          <Form method="post" id="branch-form">
            <input type="hidden" name="intent" value="create" />
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ mb: 1, textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="الاسم (عربي)"
                      name="nameAr"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="Name (English)"
                      name="nameEn"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="العنوان (عربي)"
                      name="addressAr"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="Address (English)"
                      name="addressEn"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      label="Google Maps Location URL"
                      name="locationUrl"
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ mb: 1, textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Contact Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          Phone Numbers
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={addPhoneField}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Stack>

                      {phonesCount.map((_, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", gap: 1, mb: 1 }}
                        >
                          <TextField
                            fullWidth
                            size="small"
                            label={`Phone ${index + 1}`}
                            name="phones"
                            required
                            sx={{ bgcolor: "white" }}
                          />
                          {phonesCount.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removePhoneField(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ mb: 1, textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Working Hours & Days
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6} md={3}>
                    <Input
                      label="Open Time"
                      name="openTime"
                      type="time"
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Input
                      label="Close Time"
                      name="closeTime"
                      type="time"
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel component="legend" sx={{ fontSize: "0.8rem" }}>
                      Working Days
                    </FormLabel>
                    <FormGroup
                      row
                      sx={{
                        "& .MuiFormControlLabel-label": { fontSize: "0.8rem" },
                      }}
                    >
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day, index) => (
                          <FormControlLabel
                            key={day}
                            control={
                              <Checkbox
                                name="workingDays"
                                value={index}
                                size="small"
                              />
                            }
                            label={day}
                          />
                        ),
                      )}
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Form>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "#f9fafb" }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            form="branch-form"
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ px: 4 }}
          >
            Save Branch
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BranchesForm;
