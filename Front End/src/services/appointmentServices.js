import axiosInstance from "./axiosInstance";

const appointmentServices = {
  getWorkingDays: async () => {
    const response = await axiosInstance.get("/appointments/working-days");
    return response.data;
  },

  getAvailableSlots: async (date, doctorId) => {
    const response = await axiosInstance.get("/appointments/available-slots", {
      params: { date, doctorId },
    });
    return response.data;
  },

  checkoutSession: async (bookingData) => {
    const response = await axiosInstance.post(
      "/appointments/checkout-session",
      bookingData,
    );
    return response.data;
  },

  getMyAppointments: async () => {
    const response = await axiosInstance.get("/appointments/my-appointments");
    return response.data;
  },

  updateAppointment: async (id, updateData) => {
    const response = await axiosInstance.patch(
      `/appointments/${id}`,
      updateData,
    );
    return response.data;
  },

  cancelAppointment: async (id) => {
    const response = await axiosInstance.patch(`/appointments/cancel/${id}`);
    return response.data;
  },

  getDoctorAppointments: async () => {
    const response = await axiosInstance.get("/appointments/doctor/me");
    return response.data;
  },

  completeAppointment: async (id) => {
    const response = await axiosInstance.patch(
      `/appointments/doctor/appointments/${id}/status`,
      { status: "completed" },
    );
    return response.data;
  },

  getAllAppointments: async (params) => {
    const response = await axiosInstance.get("/appointments", { params });
    return response.data;
  },

  getConfirmedAppointments: async (params) => {
    const response = await axiosInstance.get("/appointments/confirmed", {
      params,
    });
    return response.data;
  },

  adminUpdateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/appointments/${id}/status`, {
      status,
    });
    return response.data;
  },
};

export default appointmentServices;

// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const BookingPage = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login", { state: { from: "/booking" } });
//     }
//   }, [isAuthenticated, navigate]);

//   if (!isAuthenticated) return null;

//   return (
//     <div>
//     </div>
//   );
// };

// const handleBook = async () => {
//   try {
//     const res = await appointmentServices.checkoutSession(data);
//     if (res.sessionUrl) {
//       window.location.href = res.sessionUrl;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
