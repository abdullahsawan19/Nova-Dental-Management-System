import { updateMeAction } from "../features/users/userAction";
import { meLoader } from "../features/users/userLoader";
import UpdatePatientData from "../pages/Genral/UpdatePatientData";
import AppointmentsDeatils from "../pages/Genral/AppointmentsDeatils";

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
  },
  {
    path: "/add-review",
    // element: <Reviews />,
    // loader: "#",
  },
];

export default patientRoutes;
