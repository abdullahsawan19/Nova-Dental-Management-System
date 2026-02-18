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
  GridActionsCellItem,
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
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box>
        <GridToolbarColumnsButton sx={{ color: "text.primary" }} />
        <GridToolbarFilterButton sx={{ color: "text.primary" }} />
      </Box>

      <GridToolbarQuickFilter
        variant="outlined"
        size="small"
        placeholder="Search..."
        sx={{
          width: 250,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "background.default",
            color: "text.primary",
            "& fieldset": { borderColor: "divider" },
            "&:hover fieldset": { borderColor: "primary.main" },
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

  // 🌟 دالة الحذف بنفس اللوجيك
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete branch "${name}"?`)) {
      fetcher.submit({ intent: "delete", id }, { method: "post" });
    }
  };

  const columns = [
    {
      field: "nameEn",
      headerName: "Name (English)",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => row?.name?.en || "---",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (value, row) =>
        row?.address?.en || row?.address?.ar || "---",
    },
    {
      field: "openTime",
      headerName: "Open Time",
      flex: 1,
      minWidth: 120,
      valueGetter: (value, row) => row?.openTime || "---",
    },
    {
      field: "closeTime",
      headerName: "Close Time",
      flex: 1,
      minWidth: 120,
      valueGetter: (value, row) => row?.closeTime || "---",
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        const isActive = params.row.isActive;
        return (
          <Chip
            label={isActive ? "Active" : "Inactive"}
            color={isActive ? "success" : "default"}
            size="small"
            variant="filled" // 🌟 توحيد شكل الشريحة زي الـ FAQ
            sx={{ fontWeight: "bold", borderRadius: 1 }}
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 140, // 🌟 جمعنا التفعيل، التعديل، والحذف في عمود واحد احترافي
      getActions: (params) => {
        const branchId = params.row._id;
        const isActive = params.row.isActive;

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title={isActive ? "Deactivate" : "Activate"}>
                <Switch
                  checked={!!isActive}
                  size="small"
                  color="success"
                  onChange={(e) => {
                    fetcher.submit(
                      {
                        intent: "update",
                        id: branchId,
                        isActive: e.target.checked,
                      },
                      { method: "post" },
                    );
                  }}
                />
              </Tooltip>
            }
            label="Toggle Status"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit Branch">
                <EditIcon color="primary" />
              </Tooltip>
            }
            label="Edit"
            onClick={() => handleOpenModal(params.row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete Branch">
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={() =>
              handleDelete(branchId, params.row.name?.en || "this branch")
            }
          />,
        ];
      },
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
      {/* 🌟 هيدر مطابق تماماً للـ FAQ */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="text.primary">
            Manage Branches
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Branches: {branches?.length || 0}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null)}
          disabled={isGlobalLoading}
          sx={{ borderRadius: 3, textTransform: "none", px: 3, boxShadow: 2 }}
        >
          Add Branch
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          height: 600, // 🌟 نفس ارتفاع الـ FAQ
          width: "100%",
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", // 🌟 نفس الظل الناعم
          bgcolor: "background.paper",
        }}
      >
        <DataGrid
          rows={branches || []}
          columns={columns}
          getRowId={(row) => row._id}
          slots={{ toolbar: CustomToolbar }} // حافظنا على التول بار بتاعك عشان الـ Search
          loading={isGlobalLoading}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            color: "text.primary",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
              color: "text.primary",
              fontWeight: "bold", // 🌟 بولد زي الـ FAQ
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
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
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
