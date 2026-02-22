import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchAvailableSlots, clearAvailableSlots } from "./appointmentsSlice";

const AppointmentForm = ({
  bookingData,
  setBookingData,
  onSubmit,
  isSubmitting,
}) => {
  const dispatch = useDispatch();

  const { doctors } = useSelector((state) => state.doctor || {});
  const { workingDays, availableSlots, isSlotLoading } = useSelector(
    (state) => state.appointments || {},
  );

  const uniqueServices = Array.from(
    new Set(doctors.map((doc) => doc.specializationData?.id)),
  ).map(
    (id) =>
      doctors.find((doc) => doc.specializationData?.id === id)
        .specializationData,
  );

  const filteredDoctors = doctors.filter(
    (doc) => doc.specializationData?.id === bookingData.serviceId,
  );

  useEffect(() => {
    if (bookingData.doctorId && bookingData.date) {
      dispatch(
        fetchAvailableSlots({
          doctorId: bookingData.doctorId,
          date: bookingData.date,
        }),
      );
    } else {
      dispatch(clearAvailableSlots());
    }
  }, [bookingData.doctorId, bookingData.date, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "serviceId") {
        newData.doctorId = "";
        newData.date = "";
        newData.timeSlot = "";
      } else if (name === "doctorId") {
        newData.date = "";
        newData.timeSlot = "";
      } else if (name === "date") {
        newData.timeSlot = "";
      }

      return newData;
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>1. Select Service</InputLabel>
        <Select
          name="serviceId"
          value={bookingData.serviceId}
          onChange={handleChange}
          label="1. Select Service"
        >
          {uniqueServices.map(
            (service) =>
              service && (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ),
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }} disabled={!bookingData.serviceId}>
        <InputLabel>2. Select Doctor</InputLabel>
        <Select
          name="doctorId"
          value={bookingData.doctorId}
          onChange={handleChange}
          label="2. Select Doctor"
        >
          {filteredDoctors.map((doc) => (
            <MenuItem key={doc._id} value={doc._id}>
              Dr. {doc.user?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }} disabled={!bookingData.doctorId}>
        <InputLabel>3. Select Date</InputLabel>
        <Select
          name="date"
          value={bookingData.date}
          onChange={handleChange}
          label="3. Select Date"
        >
          {workingDays?.map((day, index) => (
            <MenuItem key={index} value={day}>
              {new Date(day).toDateString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        sx={{ mb: 4 }}
        disabled={!bookingData.date || isSlotLoading}
      >
        <InputLabel>
          {isSlotLoading ? "Loading Slots..." : "4. Select Time Slot"}
        </InputLabel>
        <Select
          name="timeSlot"
          value={bookingData.timeSlot}
          onChange={handleChange}
          label={isSlotLoading ? "Loading Slots..." : "4. Select Time Slot"}
        >
          {availableSlots?.length > 0 ? (
            availableSlots.map((slot, index) => (
              <MenuItem key={index} value={slot}>
                {slot}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No slots available
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={onSubmit}
        disabled={!bookingData.timeSlot || isSubmitting}
        sx={{
          py: 1.5,
          fontSize: "1.1rem",
          borderRadius: 8,
          fontWeight: "bold",
        }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Processing...
          </>
        ) : (
          "Confirm & Proceed to Payment"
        )}
      </Button>
    </Paper>
  );
};

export default AppointmentForm;
