const publicRoutes = [
  {
    index: true,
    element: <Home />,
    loader: "#",
  },
  {
    path: "/doctors",
    element: <Doctors />,
    loader: "#",
  },
  {
    path: "/services",
    element: <Services />,
    loader: "#",
  },
  {
    path: "/branch",
    element: <Branch />,
    loader: "#",
  },
  {
    path: "/faq",
    element: <Faq />,
    loader: "#",
  },
  {
    path: "/chat",
    element: <Chat />,
    loader: "#",
  },
  {
    path: "/reviews",
    element: <Reviews />,
    loader: "#",
  },
  {
    path: "/login",
    element: <Login />,
    loader: "#",
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    loader: "#",
  },
];
export default publicRoutes;
