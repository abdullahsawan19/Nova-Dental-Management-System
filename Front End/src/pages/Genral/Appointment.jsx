import React, { useEffect, useState } from "react";
import { useSubmit, useActionData, useNavigation } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import AppointmentForm from "../../features/appointments/AppointmentForm";
import CustomAlert from "../../components/feedback/Alert";

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

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertInfo({ ...alertInfo, open: false });
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingBooking");
    if (savedData) {
      setBookingData(JSON.parse(savedData));
      sessionStorage.removeItem("pendingBooking");
    }
  }, []);

  useEffect(() => {
    if (actionData?.error) {
      setAlertInfo({
        open: true,
        message: actionData.error,
        severity: "error",
      });
    }
  }, [actionData]);

  const handleBookSubmit = () => {
    submit(bookingData, { method: "post" });
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Book Your Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Follow the steps below to schedule your visit.
          </Typography>
        </Box>

        <AppointmentForm
          bookingData={bookingData}
          setBookingData={setBookingData}
          onSubmit={handleBookSubmit}
          isSubmitting={isSubmitting}
        />
      </Container>

      <CustomAlert
        open={alertInfo.open}
        onClose={handleCloseAlert}
        message={alertInfo.message}
        severity={alertInfo.severity}
      />
    </Box>
  );
};

export default Appointment;
