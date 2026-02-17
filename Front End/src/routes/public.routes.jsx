import Login from "../features/auth/LoginForm.jsx";
import Signup from "../features/auth/SignupForm.jsx";
import BranchModule from "../pages/Genral/BranchModule.jsx";

import { activeBranchLoader } from "../features/branches/branchesLoader.js";
import Home from "../pages/Genral/Home.jsx";
import Unauthorized from "../pages/Genral/Unauthorized.jsx";
import { serviceDetailsLoader } from "../features/services/servicesLoader.js";
import ServiceDetails from "../pages/Genral/ServiceDetails.jsx";
import { homeLoader } from "../features/Home/homeLoader.js";
import { homeAction } from "../features/Home/homeAction.js";
import DoctorsPage from "../pages/Genral/DoctorsPage.jsx";
import {
  doctorDetailsLoader,
  doctorsLoader,
} from "../features/doctors/doctorsLoader.js";
import DoctorDetails from "../pages/Genral/DoctorDetails.jsx";
import Appointment from "../pages/Genral/appointment.jsx";
import { appointmentLoader } from "../features/appointments/appointmentsLoader.js";
import { appointmentAction } from "../features/appointments/appointmentsAction.js";
import Faq from "../pages/Genral/Faq.jsx";
import { publicFaqLoader } from "../features/Faq/faqLoader.js";
import About from "../pages/Genral/About.jsx";

const publicRoutes = [
  {
    index: true,
    element: <Home />,
    loader: homeLoader,
    action: homeAction,
  },
  {
    path: "/doctors",
    element: <DoctorsPage />,
    loader: doctorsLoader,
  },
  {
    path: "/doctors/:id",
    element: <DoctorDetails />,
    loader: doctorDetailsLoader,
  },
  {
    path: "services/:id",
    element: <ServiceDetails />,
    loader: serviceDetailsLoader,
  },
  {
    path: "/branch",
    element: <BranchModule />,
    loader: activeBranchLoader,
  },
  {
    path: "appointment",
    element: <Appointment />,
    loader: appointmentLoader,
    action: appointmentAction,
  },
  {
    path: "/faq",
    element: <Faq />,
    loader: publicFaqLoader,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];
export default publicRoutes;
