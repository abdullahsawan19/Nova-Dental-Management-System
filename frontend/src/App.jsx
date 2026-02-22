import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./features/auth/authSlice";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <ThemeContextProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <Box
            sx={{
              display: "flex",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
            }}
          >
            <CircularProgress sx={{ color: "primary.main" }} />
          </Box>
        }
      />
    </ThemeContextProvider>
  );
}

export default App;
