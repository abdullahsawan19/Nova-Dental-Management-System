import React, { Suspense, lazy } from "react";
import { Box, CircularProgress } from "@mui/material";

import { activeBranchLoader } from "../features/branches/branchesLoader.js";
import { serviceDetailsLoader } from "../features/services/servicesLoader.js";
import { homeLoader } from "../features/Home/homeLoader.js";
import { homeAction } from "../features/Home/homeAction.js";
import {
  doctorDetailsLoader,
  doctorsLoader,
} from "../features/doctors/doctorsLoader.js";
import { appointmentLoader } from "../features/appointments/appointmentsLoader.js";
import { appointmentAction } from "../features/appointments/appointmentsAction.js";
import { publicFaqLoader } from "../features/Faq/faqLoader.js";

const Home = lazy(() => import("../pages/General/Home.jsx"));
const DoctorsPage = lazy(() => import("../pages/General/DoctorsPage.jsx"));
const DoctorDetails = lazy(() => import("../pages/General/DoctorDetails.jsx"));
const ServiceDetails = lazy(
  () => import("../pages/General/ServiceDetails.jsx"),
);
const BranchModule = lazy(() => import("../pages/General/BranchModule.jsx"));
const Appointment = lazy(() => import("../pages/General/Appointment.jsx"));
const Faq = lazy(() => import("../pages/General/Faq.jsx"));
const About = lazy(() => import("../pages/General/About.jsx"));
const Unauthorized = lazy(() => import("../pages/General/Unauthorized.jsx"));
import SuspenseLoader from "../components/ui/SuspenseLoader.jsx";

const publicRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Home />
      </Suspense>
    ),
    loader: homeLoader,
    action: homeAction,
  },
  {
    path: "/doctors",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <DoctorsPage />
      </Suspense>
    ),
    loader: doctorsLoader,
  },
  {
    path: "/doctors/:id",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <DoctorDetails />
      </Suspense>
    ),
    loader: doctorDetailsLoader,
  },
  {
    path: "services/:id",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <ServiceDetails />
      </Suspense>
    ),
    loader: serviceDetailsLoader,
  },
  {
    path: "/branch",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <BranchModule />
      </Suspense>
    ),
    loader: activeBranchLoader,
  },
  {
    path: "appointment",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Appointment />
      </Suspense>
    ),
    loader: appointmentLoader,
    action: appointmentAction,
  },
  {
    path: "/faq",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Faq />
      </Suspense>
    ),
    loader: publicFaqLoader,
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Unauthorized />
      </Suspense>
    ),
  },
];
export default publicRoutes;
