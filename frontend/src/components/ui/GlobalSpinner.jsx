import { useNavigation, useFetchers } from "react-router-dom";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const GlobalSpinner = () => {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const branchLoading = useSelector((state) => state.branches?.isLoading);
  const doctorLoading = useSelector((state) => state.doctor?.isLoading);
  const userLoading = useSelector((state) => state.user?.isLoading);

  const isNavigating = navigation.state !== "idle";

  const isFetching = fetchers.some((fetcher) => fetcher.state !== "idle");

  const isLoading =
    isNavigating || isFetching || branchLoading || doctorLoading || userLoading;

  if (!isLoading) return null;

  return (
    <Backdrop
      sx={{
        color: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 999,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "action.disabledBackground",
        backdropFilter: "blur(3px)",
      }}
      open={true}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            color: "text.primary",
          }}
        >
          {isNavigating || isFetching ? "Processing..." : "Loading Data..."}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlobalSpinner;
