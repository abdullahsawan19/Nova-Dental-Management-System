import { updateMeAction } from "../features/users/userAction";
import { meLoader } from "../features/users/userLoader";
import UpdatePatientData from "../pages/Genral/UpdatePatientData";
import AppointmentsDeatils from "../pages/Genral/AppointmentsDeatils";
import { myAppointmentsLoader } from "../features/appointments/appointmentsLoader";
import { myAppointmentsAction } from "../features/appointments/appointmentsAction";

const patientRoutes = [
  {
    path: "profile/update",
    element: <UpdatePatientData />,
    loader: meLoader,
    action: updateMeAction,
  },
  {
    path: "appointment",
    element: <appointment />,
  },
  {
    path: "my-appointments",
    element: <AppointmentsDeatils />,
    loader: myAppointmentsLoader,
    action: myAppointmentsAction,
  },
];

export default patientRoutes;
