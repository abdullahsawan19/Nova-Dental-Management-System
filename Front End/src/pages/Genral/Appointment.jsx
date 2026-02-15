import React, { useEffect, useState } from "react";
import { useSubmit, useActionData, useNavigation } from "react-router-dom";
import { Box, Typography, Container, Alert } from "@mui/material";
import AppointmentForm from "../../features/appointments/AppointmentForm";

const Appointment = () => {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [bookingData, setBookingData] = useState({
    serviceId: "",
    doctorId: "",
    date: "",
    timeSlot: "",
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingBooking");
    if (savedData) {
      setBookingData(JSON.parse(savedData));
      sessionStorage.removeItem("pendingBooking");
    }
  }, []);

  const handleBookSubmit = () => {
    if (
      !bookingData.doctorId ||
      !bookingData.serviceId ||
      !bookingData.date ||
      !bookingData.timeSlot
    ) {
      alert("Please complete all booking steps!");
      return;
    }
    submit(bookingData, { method: "post" });
  };

  return (
    <Box sx={{ py: 8, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Book Your Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Follow the steps below to schedule your visit.
          </Typography>
        </Box>

        {actionData?.error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {actionData.error}
          </Alert>
        )}

        <AppointmentForm
          bookingData={bookingData}
          setBookingData={setBookingData}
          onSubmit={handleBookSubmit}
          isSubmitting={isSubmitting}
        />
      </Container>
    </Box>
  );
};

export default Appointment;
