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
        height: "80vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      <LockPersonIcon sx={{ fontSize: 100, color: "error.main" }} />
      <Typography variant="h4" fontWeight="bold">
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You do not have permission to view this page. Please contact your
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
