import Login from "../features/auth/LoginForm.jsx";
import Signup from "../features/auth/SignupForm.jsx";
import BranchModule from "../pages/Genral/BranchModule.jsx";
import { loginAction } from "../features/auth/Login.actions";
import { loginLoader } from "../features/auth/login.Loader";
import { signUpLoader } from "../features/auth/SignUp.Loader.js";
import { signUpAction } from "../features/auth/Signup.actions.js";
import { activeBranchLoader } from "../features/branches/branchesLoader.js";
import Home from "../pages/Genral/Home.jsx";
import Unauthorized from "../pages/Genral/Unauthorized.jsx";

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
    element: <BranchModule />,
    loader: activeBranchLoader,
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
    element: <Unauthorized />,
    // loader: "#",
  },
];
export default publicRoutes;
