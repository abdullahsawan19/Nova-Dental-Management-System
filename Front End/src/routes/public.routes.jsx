import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import { loginAction } from "../features/auth/Login.actions";
import { loginLoader } from "../features/auth/login.Loader";

const publicRoutes = [
  {
    index: true,
    element: <h1>Home</h1>,
  },
  {
    path: "/doctors",
    // element: <Doctors />,
    // loader: "#",
  },
  {
    path: "/services",
    // element: <Services />,
    // loader: "#",
  },
  {
    path: "/branch",
    // element: <Branch />,
    // loader: "#",
  },
  {
    path: "/faq",
    // element: <Faq />,
    // loader: "#",
  },
  {
    path: "/chat",
    // element: <Chat />,
    // loader: "#",
  },
  {
    path: "/reviews",
    // element: <Reviews />,
    // loader: "#",
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/signup",
    element: <Signup />,
    // loader: "#",
  },
  {
    path: "/unauthorized",
    // element: <Unauthorized />,
    // loader: "#",
  },
];
export default publicRoutes;
