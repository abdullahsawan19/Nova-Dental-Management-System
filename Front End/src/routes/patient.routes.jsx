import { updateMeAction } from "../features/users/userAction";
import { meLoader } from "../features/users/userLoader";
import UpdatePatientData from "../pages/Genral/UpdatePatientData";

const patientRoutes = [
  {
    path: "profile/update",
    element: <UpdatePatientData />,
    loader: meLoader,
    action: updateMeAction,
  },
  {
    path: "appointment",
    element: <div>Appointment Page</div>,
  },
  {
    path: "my-appointments",
    element: <div>My Appointments</div>,
  },
  {
    path: "/profile",
    // element: <Profile />,
    // loader: "#",
  },
  {
    path: "/add-review",
    // element: <Reviews />,
    // loader: "#",
  },
];

export default patientRoutes;
