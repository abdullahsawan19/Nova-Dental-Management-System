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
    <Box
      sx={{
        p: 4,
        height: "100%",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="text.primary">
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

      <Paper
        elevation={0}
        sx={{
          height: 600,
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
          rows={adminFaqs || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
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
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { bgcolor: "background.paper" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
            color: "text.primary",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Add New FAQ
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "divider" }}>
          <FaqForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageFaq;
