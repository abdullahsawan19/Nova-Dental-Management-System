import { useNavigation, useFetchers } from "react-router-dom";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const GlobalSpinner = () => {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const isReduxLoading = useSelector((state) => state.branches.isLoading);

  const isNavigating = navigation.state !== "idle";

  const isFetching = fetchers.some((fetcher) => fetcher.state !== "idle");

  const isLoading = isNavigating || isFetching;

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {isReduxLoading || navigation.state === "submitting"
            ? "Saving changes..."
            : isFetching
              ? "Processing..."
              : "Loading..."}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlobalSpinner;
