import Login from "../features/auth/LoginForm.jsx";
import Signup from "../features/auth/SignupForm.jsx";
import { loginAction } from "../features/auth/Login.actions";
import { loginLoader } from "../features/auth/login.Loader";
import { signUpLoader } from "../features/auth/SignUp.Loader.js";
import { signUpAction } from "../features/auth/Signup.actions.js";
import Home from "../Home";

const publicRoutes = [
  {
    index: true,
    element: <Home />,
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
    loader: signUpLoader,
    action: signUpAction,
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
    path: "/unauthorized",
    // element: <Unauthorized />,
    // loader: "#",
  },
];
export default publicRoutes;
