import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import UpdateAppointmentForm from "../../features/appointments/UpdateAppointmentForm";

const AppointmentsDeatils = () => {
  const fetcher = useFetcher();
  const { myAppointments, isLoading } = useSelector(
    (state) => state.appointments,
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const rows = useMemo(() => {
    return (
      myAppointments?.map((app) => ({
        ...app,
        parsedDate: new Date(app.date),
        doctorName: app.doctor?.user?.name || "Unknown Doctor",
        serviceName: app.service?.name?.en || app.service?.name || "Service",
        price: app.service?.fees || 0,
      })) || []
    );
  }, [myAppointments]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      fetcher.submit({ intent: "cancel", id }, { method: "post" });
    }
  };

  const columns = [
    {
      field: "serviceName",
      headerName: "Service",
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ mt: 2, color: "text.primary" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "doctorName",
      headerName: "Doctor",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ mt: 2, fontWeight: "600" }}
        >
          Dr. {params.value}
        </Typography>
      ),
    },
    { field: "parsedDate", headerName: "Date", type: "date", width: 120 },
    { field: "timeSlot", headerName: "Time", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const status = params.value;
        return (
          <Chip
            label={status.toUpperCase()}
            color={
              status === "completed"
                ? "success"
                : status === "cancelled"
                  ? "error"
                  : "primary"
            }
            size="small"
            sx={{ fontWeight: "bold", mt: 1.5 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => {
        const isFinished =
          params.row.status === "completed" ||
          params.row.status === "cancelled";

        return (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              disabled={isFinished || fetcher.state !== "idle"}
              onClick={() => {
                setSelectedAppt(params.row);
                setOpenModal(true);
              }}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CancelIcon />}
              disabled={isFinished || fetcher.state !== "idle"}
              onClick={() => handleCancel(params.row._id)}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Cancel
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="900"
          color="text.primary"
          gutterBottom
        >
          My Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track, reschedule, or cancel your upcoming visits easily.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          height: 650,
          width: "100%",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
          bgcolor: "background.paper",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: "parsedDate", sort: "desc" }] },
          }}
          getRowClassName={(params) =>
            params.row.status === "completed" ||
            params.row.status === "cancelled"
              ? "blurred-row"
              : ""
          }
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
              color: "text.primary",
              fontWeight: "800",
            },
            "& .MuiDataGrid-cell": {
              color: "text.primary",
            },
            "& .MuiDataGrid-toolbarContainer": {
              color: "text.primary",
            },
            "& .blurred-row": {
              opacity: 0.6,
              filter: "grayscale(30%) blur(0.3px)",
              pointerEvents: "none",
            },
          }}
        />
      </Paper>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "text.primary" }}>
          Reschedule Appointment
        </DialogTitle>
        {selectedAppt && (
          <UpdateAppointmentForm
            appt={selectedAppt}
            onClose={() => setOpenModal(false)}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default AppointmentsDeatils;
