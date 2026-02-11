import React from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Tooltip,
  Switch,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageUsers = () => {
  const fetcher = useFetcher();
  const { users, isLoading } = useSelector((state) => state.user);

  const handleToggleActive = (userId) => {
    fetcher.submit(
      { intent: "deactivate", userId: userId },
      { method: "post" },
    );
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetcher.submit({ intent: "delete", userId: userId }, { method: "post" });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => {
        const role = params.value;
        return (
          <Chip
            label={role?.toUpperCase()}
            size="small"
            color={"primary"}
            variant="outlined"
            sx={{ fontWeight: "600" }}
          />
        );
      },
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
            color={isActive ? "success" : "error"}
            size="small"
            sx={{ minWidth: 70, fontWeight: "bold" }}
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
        const userId = params.row._id;
        const isActive = params.row.isActive;

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title={isActive ? "Deactivate User" : "Activate User"}>
                <Switch
                  checked={!!isActive}
                  size="small"
                  color="success"
                  disabled={fetcher.state !== "idle"}
                />
              </Tooltip>
            }
            label="Toggle Status"
            onClick={() => handleToggleActive(userId)}
          />,

          <GridActionsCellItem
            icon={
              <Tooltip title="Delete User">
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

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="800" color="#1a1a1a">
          User Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all users roles, account status, and permissions
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          height: 650,
          width: "100%",
          borderRadius: 4,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading || fetcher.state !== "idle"}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f6f8",
              color: "#455a64",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ManageUsers;
