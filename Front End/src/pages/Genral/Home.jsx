import React, { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CustomAlert from "../../components/feedback/Alert";
import PublicServices from "./PublicServices";
import PublicReviews from "./PublicReviews";
import PublicDoctors from "./PublicDoctors";

import coverImage from "../../assets/public/Cover.jfif";

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
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <CustomAlert
        open={alertConfig.open}
        onClose={handleCloseAlert}
        message={alertConfig.message}
        severity={alertConfig.severity}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "80vh", md: "92vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
        }}
      >
        <Typography
          variant="h2"
          fontWeight="900"
          sx={{
            color: "#ffffff",
            letterSpacing: "-0.02em",
            mb: 2,
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
          }}
        >
          Welcome to ClinicPro
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            mb: 5,
            maxWidth: "700px",
            lineHeight: 1.6,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
          }}
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
            px: { xs: 4, md: 6 },
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "primary.main",
            color: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            "&:hover": {
              bgcolor: "primary.dark",
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              transform: "translateY(-3px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Book Appointment Now
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Box id="services" sx={{ py: 8 }}>
          <PublicServices />
        </Box>

        <Box id="doctors" sx={{ py: 8 }}>
          <PublicDoctors />
        </Box>

        <Box id="reviews" sx={{ py: 8 }}>
          <PublicReviews />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
