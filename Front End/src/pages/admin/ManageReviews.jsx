import React from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Tooltip,
  Rating,
  IconButton,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageReviews = () => {
  const fetcher = useFetcher();
  const { reviews, isLoading } = useSelector((state) => state.reviews);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      fetcher.submit({ intent: "delete", reviewId: id }, { method: "post" });
    }
  };

  const columns = [
    {
      field: "user",
      headerName: "Reviewer",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={
              params.row.user?.photo
                ? `${import.meta.env.VITE_API_URL}/img/users/${params.row.user.photo}`
                : null
            }
            alt={params.row.user?.name}
          >
            {params.row.user?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {params.row.user?.name || "Deleted User"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.user?.email || "No Email"}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography fontWeight="500" color="primary">
          Dr. {params.value}
        </Typography>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 140,
      renderCell: (params) => (
        <Rating value={params.value} readOnly size="small" precision={0.5} />
      ),
    },
    {
      field: "review",
      headerName: "Review Text",
      flex: 2,
      minWidth: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap variant="body2" sx={{ width: "100%" }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          disabled={fetcher.state !== "idle"}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="800" color="#1a1a1a">
          Manage Reviews
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor and manage patient reviews and ratings
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
          rows={reviews || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
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
        />
      </Paper>
    </Box>
  );
};

export default ManageReviews;
