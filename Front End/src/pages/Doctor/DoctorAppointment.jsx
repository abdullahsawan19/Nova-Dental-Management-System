import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        bgcolor: "#f8f9fa",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Stack direction="row" spacing={1}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
}

const DoctorAppointment = () => {
  const fetcher = useFetcher();

  const { doctorAppointments, isLoading } = useSelector(
    (state) => state.appointments,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const rows = useMemo(() => {
    return (
      doctorAppointments?.map((app) => ({
        ...app,
        parsedDate: new Date(app.date),
        patientName: app.patient?.name || "Unknown Patient",
        patientPhone: app.patient?.phone || "No Phone",
        serviceName:
          app.service?.name?.en || app.service?.name || "Standard Service",
      })) || []
    );
  }, [doctorAppointments]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const lowerSearch = searchTerm.toLowerCase();
    return rows.filter(
      (row) =>
        row.patientName.toLowerCase().includes(lowerSearch) ||
        row.serviceName.toLowerCase().includes(lowerSearch),
    );
  }, [rows, searchTerm]);

  const handleMarkAsCompleted = (id) => {
    if (window.confirm("Mark this appointment as completed?")) {
      fetcher.submit({ intent: "updateStatus", id }, { method: "post" });
    }
  };

  const columns = [
    {
      field: "patientName",
      headerName: "Patient Details",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.patientPhone}
          </Typography>
        </Box>
      ),
    },
    {
      field: "serviceName",
      headerName: "Service Type",
      flex: 1,
      minWidth: 150,
    },
    { field: "parsedDate", headerName: "Date", type: "date", width: 120 },
    { field: "timeSlot", headerName: "Time Slot", width: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          color={params.value === "confirmed" ? "primary" : "success"}
          size="small"
          sx={{ fontWeight: "bold", mt: 1.5 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const isCompleted = params.row.status === "completed";
        return (
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<CheckCircleIcon />}
            disabled={isCompleted || fetcher.state !== "idle"}
            onClick={() => handleMarkAsCompleted(params.row._id)}
            sx={{
              mt: 1,
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { boxShadow: "none", bgcolor: "#2e7d32" },
            }}
          >
            {isCompleted ? "Finished" : "Complete"}
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="900" color="#1a1a1a">
            My Appointments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your daily patient schedule.
          </Typography>
        </Box>

        <TextField
          placeholder="Search patients..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            width: "350px",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": { borderRadius: "12px" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          height: 650,
          width: "100%",
          borderRadius: 5,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          slots={{ toolbar: CustomToolbar }}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: "parsedDate", sort: "asc" }] },
          }}
          pageSizeOptions={[10, 20]}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f6f8",
              color: "#37474f",
              fontWeight: "800",
            },
            "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#f5faff" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default DoctorAppointment;
