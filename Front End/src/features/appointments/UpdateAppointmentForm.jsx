import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchAvailableSlots } from "./appointmentsSlice";

const UpdateAppointmentForm = ({ appt, onClose }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();

  const { availableSlots, workingDays } = useSelector(
    (state) => state.appointments,
  );

  const [newDate, setNewDate] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState("");

  useEffect(() => {
    if (newDate && appt) {
      dispatch(
        fetchAvailableSlots({
          date: newDate,
          doctorId: appt.doctor._id,
        }),
      );
    }
  }, [newDate, appt, dispatch]);

  const handleSubmit = () => {
    fetcher.submit(
      {
        intent: "reschedule",
        id: appt._id,
        date: newDate,
        timeSlot: newTimeSlot,
      },
      { method: "post" },
    );
    onClose();
  };

  return (
    <>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Select a new date from the available working days for Dr.{" "}
          <Typography component="span" fontWeight="bold" color="primary">
            {appt?.doctor?.user?.name}
          </Typography>
          .
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select New Date</InputLabel>
          <Select
            value={newDate}
            onChange={(e) => {
              setNewDate(e.target.value);
              setNewTimeSlot("");
            }}
            label="Select New Date"
          >
            {workingDays?.length > 0 ? (
              workingDays.map((day, index) => {
                const dateValue = typeof day === "string" ? day : day.date;
                return (
                  <MenuItem key={index} value={dateValue}>
                    {new Date(dateValue).toDateString()}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled>No working days available</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!newDate}>
          <InputLabel>Available Time Slots</InputLabel>
          <Select
            value={newTimeSlot}
            onChange={(e) => setNewTimeSlot(e.target.value)}
            label="Available Time Slots"
          >
            {availableSlots?.length > 0 ? (
              availableSlots.map((slot, index) => (
                <MenuItem key={index} value={slot}>
                  {slot}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                {newDate
                  ? "No slots available on this date"
                  : "Select a date first"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: "bold" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!newDate || !newTimeSlot || fetcher.state !== "idle"}
          sx={{ borderRadius: 2, fontWeight: "bold" }}
        >
          {fetcher.state === "submitting" ? "Updating..." : "Confirm Changes"}
        </Button>
      </DialogActions>
    </>
  );
};

export default UpdateAppointmentForm;
