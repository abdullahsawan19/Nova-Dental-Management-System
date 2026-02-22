import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import { Box, Typography, Paper, Tooltip, Rating } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            lineHeight={1.2}
            color="text.primary"
          >
            {params.row.user?.name || "Deleted User"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.user?.email || "No Email"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography fontWeight="500" color="primary.main">
            Dr. {params.value}
          </Typography>
        </Box>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Tooltip title={params.value}>
            <Typography
              noWrap
              variant="body2"
              sx={{ width: "100%" }}
              color="text.primary"
            >
              {params.value}
            </Typography>
          </Tooltip>
        </Box>
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
    <Box
      sx={{
        p: 4,
        height: "100%",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="800" color="text.primary">
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
          border: 1,
          borderColor: "divider",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          bgcolor: "background.paper",
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
            color: "text.primary",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
              color: "text.primary",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "divider",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "divider",
            },
            "& .MuiTablePagination-root": {
              color: "text.primary",
            },
            "& .MuiButtonBase-root": {
              color: "text.primary",
            },
            "& .MuiDataGrid-iconSeparator": {
              color: "divider",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ManageReviews;
