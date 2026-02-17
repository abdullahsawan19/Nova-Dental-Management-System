import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        textAlign: "center",
        gap: 2,
        p: 3,
      }}
    >
      <LockPersonIcon sx={{ fontSize: 100, color: "error.main" }} />
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
        You do not have permission to view this page. Please contact your
        administrator.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
