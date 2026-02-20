import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubmit, useActionData, useNavigation } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import AppointmentForm from "../../features/appointments/AppointmentForm";
import CustomAlert from "../../components/feedback/Alert";

import { clearCheckoutUrl } from "../../features/appointments/appointmentsSlice";

const Appointment = () => {
  const submit = useSubmit();
  const dispatch = useDispatch();

  const { checkoutUrl } = useSelector((state) => state.appointments);
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (checkoutUrl) {
      const url = checkoutUrl;

      dispatch(clearCheckoutUrl());

      window.location.href = url;
    }
  }, [checkoutUrl, dispatch]);

  const [bookingData, setBookingData] = useState(() => {
    const savedData = sessionStorage.getItem("pendingBooking");
    return savedData
      ? JSON.parse(savedData)
      : { serviceId: "", doctorId: "", date: "", timeSlot: "" };
  });

  useEffect(() => {
    sessionStorage.removeItem("pendingBooking");
  }, []);

  const [dismissedError, setDismissedError] = useState(null);

  const isAlertOpen = Boolean(
    actionData?.error && actionData.error !== dismissedError,
  );

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setDismissedError(actionData.error);
  };

  const handleBookSubmit = () => {
    submit(bookingData, { method: "post" });
    setDismissedError(null);
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
        open={isAlertOpen}
        onClose={handleCloseAlert}
        message={actionData?.error || ""}
        severity="error"
      />
    </Box>
  );
};

export default Appointment;
