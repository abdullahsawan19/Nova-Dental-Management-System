import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import PaymentAlert from "../../components/common/PaymentAlert";
import useHashScroll from "../../components/common/useHashScroll";

import Button from "../../components/ui/Button";

import PublicServices from "./PublicServices";
import PublicReviews from "./PublicReviews";
import PublicDoctors from "./PublicDoctors";
import { useSelector } from "react-redux";

const Home = () => {
  const activeBranch = useSelector((state) => state.branches?.activeBranch);
  const branchName = activeBranch?.name;

  const navigate = useNavigate();

  useHashScroll();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <PaymentAlert />

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
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(/Cover.jfif)`,
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
          Welcome to {branchName}
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
          size="large"
          startIcon={<CalendarMonthIcon />}
          onClick={() => navigate("/appointment")}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            px: { xs: 4, md: 6 },
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            borderRadius: "50px",
            color: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            "&:hover": {
              bgcolor: "primary.dark",
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              transform: "translateY(-3px)",
            },
          }}
        >
          Book Appointment Now
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            mt: 10,
            mb: 2,
            px: 2,
          }}
        >
          <HealthAndSafetyIcon
            sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
          />
          <Typography
            variant="h4"
            fontWeight="800"
            color="text.primary"
            gutterBottom
          >
            A Healthy Smile Starts at Home
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Brushing your teeth twice a day and flossing regularly is the
            foundation of good oral hygiene. Take care of your daily habits, and
            let us take care of the rest!
          </Typography>
        </Box>

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
