const adminRoutes = [
  {
    index: true,
    path: "appointments",
    element: <Appointments />,
    loader: "#",
  },
  {
    path: "users",
    element: <Users />,
    loader: "#",
  },
  {
    path: "doctors",
    element: <Doctors />,
    loader: "#",
  },
  {
    path: "branch",
    element: <Branch />,
    loader: "#",
  },
  {
    path: "faq",
    element: <Faq />,
    loader: "#",
  },
  {
    path: "chat",
    element: <Chat />,
    loader: "#",
  },
  {
    path: "reviews",
    element: <Reviews />,
    loader: "#",
  },
  {
    path: "services",
    element: <Services />,
    loader: "#",
  },
];

export default adminRoutes;
