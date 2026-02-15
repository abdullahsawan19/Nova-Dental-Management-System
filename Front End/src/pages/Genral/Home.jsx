import React, { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CustomAlert from "../../components/feedback/Alert";
import PublicServices from "./PublicServices";
import PublicReviews from "./PublicReviews";
import PublicDoctors from "./PublicDoctors";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const alertShown = useRef(false);

  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (searchParams.get("payment") === "success" && !alertShown.current) {
      alertShown.current = true;
      setAlertConfig({
        open: true,
        message: "Payment Successful! Your appointment is confirmed ✅",
        severity: "success",
      });
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("payment");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <CustomAlert
        open={alertConfig.open}
        onClose={handleCloseAlert}
        message={alertConfig.message}
        severity={alertConfig.severity}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            py: 12,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" fontWeight="bold" color="primary">
            Welcome to Our Clinic
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: 2, mb: 4, maxWidth: "700px" }}
          >
            The best dental care for you and your family. Schedule your visit
            today and get the smile you deserve.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<CalendarMonthIcon />}
            onClick={() => navigate("/appointment")}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.2rem",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: 3,
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            Book Appointment Now
          </Button>
        </Box>

        <Box id="services" sx={{ py: 5 }}>
          <PublicServices />
        </Box>

        <Box id="doctors" sx={{ py: 5 }}>
          <PublicDoctors />
        </Box>

        <Box id="reviews" sx={{ py: 5 }}>
          <PublicReviews />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
