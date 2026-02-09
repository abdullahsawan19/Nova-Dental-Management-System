import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useNavigation } from "react-router-dom";
import BranchesForm from "../../features/branches/BranchesForm";
import {
  Box,
  Button,
  Typography,
  Switch,
  IconButton,
  Tooltip,
  Chip,
  Paper,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Box>
        <GridToolbarColumnsButton sx={{ color: "#555" }} />
        <GridToolbarFilterButton sx={{ color: "#555" }} />
      </Box>

      <GridToolbarQuickFilter
        variant="outlined"
        size="small"
        placeholder="Search..."
        sx={{
          width: 250,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "#fafafa",
            "& fieldset": { borderColor: "#ddd" },
            "&:hover fieldset": { borderColor: "#bbb" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
        }}
      />
    </GridToolbarContainer>
  );
}

const MangeBranches = () => {
  const { branches } = useSelector((state) => state.branches);
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const isGlobalLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleOpenModal = (branch = null) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  const columns = [
    {
      field: "nameEn",
      headerName: "Name (English)",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => row?.name?.en || "---",
      disableColumnMenu: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (value, row) =>
        row?.address?.en || row?.address?.ar || "---",
      disableColumnMenu: true,
    },
    {
      field: "openTime",
      headerName: "Open Time",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => row?.openTime || "---",
      disableColumnMenu: true,
    },
    {
      field: "closeTime",
      headerName: "Close Time",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => row?.closeTime || "---",
      disableColumnMenu: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 100,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          color={params.row.isActive ? "success" : "default"}
          size="small"
          variant={params.row.isActive ? "filled" : "outlined"}
          sx={{ fontWeight: "bold", minWidth: 70 }}
        />
      ),
    },
    {
      field: "toggle",
      headerName: "Active",
      width: 80,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="id" value={params.row._id} />
          <Switch
            checked={params.row.isActive}
            size="small"
            onChange={(e) => {
              fetcher.submit(
                {
                  intent: "update",
                  id: params.row._id,
                  isActive: e.target.checked,
                },
                { method: "post" },
              );
            }}
          />
        </fetcher.Form>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{
                color: "#1976d2",
                bgcolor: "#e3f2fd",
                "&:hover": { bgcolor: "#bbdefb" },
              }}
              onClick={() => handleOpenModal(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{
                color: "#d32f2f",
                bgcolor: "#ffebee",
                "&:hover": { bgcolor: "#ffcdd2" },
              }}
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete branch "${params.row.name.en}"?`,
                  )
                ) {
                  fetcher.submit(
                    { intent: "delete", id: params.row._id },
                    { method: "post" },
                  );
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="800" color="#1a1a1a">
            Manage Branches
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            View and manage all clinic branches
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null)}
          disabled={isGlobalLoading}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1,
            textTransform: "none",
            fontSize: "0.95rem",
            boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.2)",
          }}
        >
          Add Branch
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          height: 650,
          width: "100%",
          borderRadius: 4,
          border: "1px solid #eaeaea",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={branches || []}
          columns={columns}
          getRowId={(row) => row._id}
          slots={{ toolbar: CustomToolbar }}
          loading={isGlobalLoading}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "linear-progress",
            },
          }}
          disableDensitySelector
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          rowHeight={60}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8f9fa",
              color: "#333",
              fontSize: "0.9rem",
              fontWeight: "700",
              borderBottom: "1px solid #eee",
            },
            "& .MuiDataGrid-row": {
              "&:hover": { backgroundColor: "#fcfcfc" },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
              fontSize: "0.9rem",
              color: "#444",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>

      <BranchesForm
        open={isModalOpen}
        onClose={handleCloseModal}
        initialData={selectedBranch}
      />
    </Box>
  );
};

export default MangeBranches;
