import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

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

const ManageAppointments = () => {
  const fetcher = useFetcher();
  const { allAppointments, isLoading } = useSelector(
    (state) => state.appointments,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const allRows = useMemo(() => {
    return (
      allAppointments?.map((app) => ({
        ...app,
        parsedDate: new Date(app.date),
        patientName: app.patient?.name || "Deleted User",
        doctorName: app.doctor?.user?.name || "Unknown Doctor",
        serviceName: app.service?.name?.en || app.service?.name || "Unknown",
      })) || []
    );
  }, [allAppointments]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return allRows;
    const lowerSearch = searchTerm.toLowerCase();
    return allRows.filter(
      (row) =>
        row.patientName.toLowerCase().includes(lowerSearch) ||
        row.doctorName.toLowerCase().includes(lowerSearch) ||
        row.serviceName.toLowerCase().includes(lowerSearch),
    );
  }, [allRows, searchTerm]);

  const handleStatusChange = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) {
      fetcher.submit(
        { intent: "updateStatus", id, status: newStatus },
        { method: "post" },
      );
    }
  };

  const columns = [
    {
      field: "patientName",
      headerName: "Patient",
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2 }}>
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
          color="primary"
          sx={{ mt: 2, fontWeight: "600" }}
        >
          Dr. {params.value}
        </Typography>
      ),
    },
    { field: "serviceName", headerName: "Service", flex: 1, minWidth: 130 },
    { field: "parsedDate", headerName: "Date", type: "date", width: 120 },
    { field: "timeSlot", headerName: "Time", width: 160 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ mt: 2, fontWeight: "bold", color: "#2e7d32" }}
        >
          {params.value} EGP
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status & Action",
      width: 190,
      renderCell: (params) => {
        const currentStatus = params.row.status;
        const isFinished =
          currentStatus === "cancelled" || currentStatus === "completed";

        return (
          <Select
            value={currentStatus}
            size="small"
            disabled={isFinished || fetcher.state !== "idle"}
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
            sx={{
              width: "100%",
              mt: 1,
              borderRadius: "8px",
              bgcolor:
                currentStatus === "confirmed"
                  ? "#e8f5e9"
                  : currentStatus === "cancelled"
                    ? "#ffebee"
                    : currentStatus === "completed"
                      ? "#e3f2fd"
                      : "#fff3e0",
              fontSize: "0.8rem",
              fontWeight: "700",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
          >
            <MenuItem value="pending_payment" disabled>
              Pending Payment
            </MenuItem>
            <MenuItem value="confirmed" disabled>
              Confirmed
            </MenuItem>
            <MenuItem value="completed">Mark Completed</MenuItem>
            <MenuItem value="cancelled">Cancel Appt.</MenuItem>
          </Select>
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
            Appointments Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Full control over clinic schedule and patient records.
          </Typography>
        </Box>

        <TextField
          placeholder="Search by name, doctor or service..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            width: "380px",
            borderRadius: "12px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
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
          height: 700,
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
            sorting: { sortModel: [{ field: "parsedDate", sort: "desc" }] },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f6f8",
              color: "#37474f",
              fontWeight: "800",
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#f5faff" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ManageAppointments;
