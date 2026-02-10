import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { CircularProgress, Box } from "@mui/material";

function App() {
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
