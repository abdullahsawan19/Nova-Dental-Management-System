import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  useNavigation,
  useActionData,
  useSubmit,
} from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Tooltip,
  Switch,
  TextField,
  Grid,
  CircularProgress,
  Input,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const MangeServices = () => {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const { services = [], isLoading: isFetching } = useSelector(
    (state) => state.services,
  );

  // States
  const [openModal, setOpenModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    if (actionData?.success) {
      handleCloseModal();
    }
  }, [actionData]);

  const handleToggleActive = (id, currentStatus) => {
    const fd = new FormData();
    fd.append("intent", "toggle");
    fd.append("id", id);
    fd.append("isActive", currentStatus);
    submit(fd, { method: "post" });
  };

  const handleOpenAdd = () => {
    setCurrentService(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (service) => {
    setCurrentService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentService(null);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={
            params.row.image
              ? `${import.meta.env.VITE_API_URL}/uploads/${params.row.image}`
              : ""
          }
          variant="rounded"
          sx={{ width: 40, height: 40, bgcolor: "#eee" }}
        >
          {params.row.name?.en?.charAt(0) || "S"}
        </Avatar>
      ),
    },
    {
      field: "name",
      headerName: "Name (EN / AR)",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            🇬🇧 {params.row.name?.en}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            🇸🇦 {params.row.name?.ar}
          </Typography>
        </Box>
      ),
    },
    {
      field: "fees",
      headerName: "Fees",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.row.fees} EGP
        </Typography>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const isActive = params.row.isActive;
        return (
          <Chip
            label={isActive ? "Active" : "Inactive"}
            color={isActive ? "success" : "default"}
            size="small"
            variant="filled"
            sx={{ fontWeight: "bold", borderRadius: 1 }}
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Toggle Status">
              <Switch
                checked={!!params.row.isActive}
                size="small"
                color="success"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Tooltip>
          }
          label="Toggle"
          onClick={() =>
            handleToggleActive(params.row._id, params.row.isActive)
          }
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit Service">
              <EditIcon color="primary" />
            </Tooltip>
          }
          label="Edit"
          onClick={() => handleOpenEdit(params.row)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="#1a1a1a">
            Manage Services
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Services: {services?.length || 0}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
            boxShadow: 2,
            bgcolor: "#1976d2",
          }}
        >
          Add New Service
        </Button>
      </Box>

      {actionData?.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionData.error}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          height: 600,
          width: "100%",
          borderRadius: 4,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <DataGrid
          rows={services || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isFetching}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          rowHeight={70}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f6f8",
              color: "#455a64",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9fafb",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {currentService ? "Edit Service" : "Add New Service"}
          </Typography>
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            method="post"
            encType="multipart/form-data"
            key={currentService ? currentService._id : "new"}
          >
            <input
              type="hidden"
              name="intent"
              value={currentService ? "update" : "create"}
            />
            {currentService && (
              <input type="hidden" name="id" value={currentService._id} />
            )}

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name (English)"
                  name="nameEn"
                  required
                  defaultValue={currentService?.name?.en}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="الاسم (عربي)"
                  name="nameAr"
                  dir="rtl"
                  required
                  defaultValue={currentService?.name?.ar}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description (English)"
                  name="descEn"
                  multiline
                  rows={3}
                  required
                  defaultValue={currentService?.description?.en}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="الوصف (عربي)"
                  name="descAr"
                  dir="rtl"
                  multiline
                  rows={3}
                  required
                  defaultValue={currentService?.description?.ar}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Fees"
                  name="fees"
                  required
                  defaultValue={currentService?.fees}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" display="block" gutterBottom>
                  {currentService
                    ? "Update Image (Optional)"
                    : "Service Image (Required)"}
                </Typography>
                <Input
                  type="file"
                  name="image"
                  disableUnderline
                  fullWidth
                  required={!currentService}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : currentService ? (
                    "Update Service"
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MangeServices;
