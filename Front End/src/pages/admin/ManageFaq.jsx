import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Chip,
  Tooltip,
  Switch,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FaqForm from "../../features/Faq/FaqForm";

const ManageFaq = () => {
  const fetcher = useFetcher();
  const { adminFaqs, isLoading } = useSelector((state) => state.faq);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      fetcher.submit({ intent: "deleteFaq", id }, { method: "post" });
    }
  };

  const handleToggleActive = (id, currentStatus) => {
    fetcher.submit(
      { intent: "toggleStatus", id, isActive: currentStatus },
      { method: "post" },
    );
  };

  const columns = [
    {
      field: "questionEn",
      headerName: "Question (EN)",
      flex: 1,
      minWidth: 180,
      valueGetter: (value, row) => row?.question?.en || "---",
    },
    {
      field: "questionAr",
      headerName: "Question (AR)",
      flex: 1,
      minWidth: 180,
      valueGetter: (value, row) => row?.question?.ar || "---",
    },
    {
      field: "answerEn",
      headerName: "Answer (EN)",
      flex: 1.5,
      minWidth: 220,
      valueGetter: (value, row) => row?.answer?.en || "---",
    },
    {
      field: "answerAr",
      headerName: "Answer (AR)",
      flex: 1.5,
      minWidth: 220,
      valueGetter: (value, row) => row?.answer?.ar || "---",
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
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
      width: 130,
      getActions: (params) => {
        const faqId = params.row._id;
        const isActive = params.row.isActive;

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title={isActive ? "Deactivate" : "Activate"}>
                <Switch checked={!!isActive} size="small" color="success" />
              </Tooltip>
            }
            label="Toggle Status"
            onClick={() => handleToggleActive(faqId, isActive)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete FAQ">
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={() => handleDelete(faqId)}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ p: 4, height: "100%", width: "100%", bgcolor: "#f9fafb" }}>
      {/* Header & Add Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="#1a1a1a">
            Manage FAQs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total FAQs: {adminFaqs?.length || 0}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 3, textTransform: "none", px: 3, boxShadow: 2 }}
        >
          Add FAQ
        </Button>
      </Box>

      {/* DataGrid */}
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
          rows={adminFaqs || []}
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
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      {/* Add FAQ Modal */}
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
            Add New FAQ
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FaqForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageFaq;
