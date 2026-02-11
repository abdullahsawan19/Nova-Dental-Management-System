import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1b0c0c",
          }}
        >
          <CircularProgress sx={{ color: "primary.main" }} />
        </Box>
      }
    />
  );
}

export default App;
