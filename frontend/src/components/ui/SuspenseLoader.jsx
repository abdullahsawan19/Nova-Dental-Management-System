import { Box, CircularProgress } from "@mui/material";

const SuspenseLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SuspenseLoader;
