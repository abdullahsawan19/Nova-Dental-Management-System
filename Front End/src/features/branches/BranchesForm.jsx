import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { CircularProgress } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";

const BranchesForm = ({ open, onClose, initialData }) => {
  const [phonesCount, setPhonesCount] = useState([0]);

  const fetcher = useFetcher();

  const actionData = fetcher.data;

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (initialData?.phones?.length > 0) {
      setPhonesCount(initialData.phones.map((_, i) => i));
    } else {
      setPhonesCount([0]);
    }
  }, [initialData]);

  useEffect(() => {
    if (actionData?.success && fetcher.state === "idle") {
      onClose();
    }
  }, [actionData, fetcher.state, onClose]);

  const addPhoneField = () =>
    setPhonesCount([...phonesCount, phonesCount.length]);
  const removePhoneField = (index) =>
    setPhonesCount(phonesCount.filter((_, i) => i !== index));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {initialData ? "Edit Branch" : "Add New Branch"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        {actionData?.error && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
            {actionData.error?.message || "Something went wrong!"}
          </Typography>
        )}

        <fetcher.Form method="post" id="branch-form">
          <input
            type="hidden"
            name="intent"
            value={initialData ? "update" : "create"}
          />
          {initialData && (
            <input type="hidden" name="id" value={initialData._id} />
          )}

          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ mb: 1, fontWeight: "bold" }}
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
                    defaultValue={initialData?.name?.ar}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Name (English)"
                    name="nameEn"
                    required
                    fullWidth
                    defaultValue={initialData?.name?.en}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="العنوان (عربي)"
                    name="addressAr"
                    required
                    fullWidth
                    defaultValue={initialData?.address?.ar}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Address (English)"
                    name="addressEn"
                    required
                    fullWidth
                    defaultValue={initialData?.address?.en}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    label="Google Maps URL"
                    name="locationUrl"
                    required
                    fullWidth
                    defaultValue={initialData?.locationUrl}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Contact Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    defaultValue={initialData?.email}
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
                      <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`Phone ${index + 1}`}
                          name="phones"
                          required
                          sx={{ bgcolor: "white" }}
                          defaultValue={initialData?.phones?.[index] || ""}
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
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Working Hours
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
                    defaultValue={initialData?.openTime}
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
                    defaultValue={initialData?.closeTime}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel component="legend" sx={{ fontSize: "0.8rem" }}>
                    Working Days
                  </FormLabel>
                  <FormGroup row>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day, index) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              name="workingDays"
                              value={index}
                              size="small"
                              defaultChecked={
                                initialData?.workingDays?.includes(index) ||
                                false
                              }
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
        </fetcher.Form>
      </DialogContent>
      <DialogActions sx={{ p: 3, bgcolor: "#f9fafb" }}>
        <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="branch-form"
          variant="contained"
          color="primary"
          sx={{ px: 4 }}
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Branch"
              : "Save Branch"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BranchesForm;
