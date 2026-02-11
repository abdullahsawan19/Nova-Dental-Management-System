import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDocForm from "../../features/doctors/AddDocForm";

import { deactivateUser, deleteUser } from "../../features/users/userSlice";

const ManageDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, isLoading } = useSelector((state) => state.doctor);
  const [open, setOpen] = useState(false);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleToggleActive = (userId) => {
    dispatch(deactivateUser(userId));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => row?.user?.name || "---",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (value, row) => row?.user?.email || "---",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 130,
      valueGetter: (value, row) => row?.user?.phone || "---",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 130,
      valueGetter: (value, row) => row?.specialization || "Pending...",
    },

    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const isActive = params.row.user?.isActive;
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
      getActions: (params) => {
        const userId = params.row.user?._id;
        const isActive = params.row.user?.isActive;

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title={isActive ? "Deactivate" : "Activate"}>
                <Switch
                  checked={!!isActive}
                  size="small"
                  color="success"
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Tooltip>
            }
            label="Toggle Status"
            onClick={() => handleToggleActive(userId)}
          />,

          <GridActionsCellItem
            icon={
              <Tooltip title="Delete Doctor">
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={() => handleDelete(userId)}
          />,
        ];
      },
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="#1a1a1a">
            Manage Doctors
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Doctors: {doctors?.length || 0}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 3, textTransform: "none", px: 3, boxShadow: 2 }}
        >
          Add Doctor
        </Button>
      </Box>

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
          rows={doctors || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Add New Doctor
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddDocForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageDoctors;
