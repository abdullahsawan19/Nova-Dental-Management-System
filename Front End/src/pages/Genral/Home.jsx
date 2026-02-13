import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicServices from "./PublicServices";
import { Box } from "@mui/material";
import PublicReviews from "./PublicReviews";
import PublicDoctors from "./PublicDoctors";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div>
      <h1>Home Page</h1>

      <Box id="services">
        <PublicServices />
      </Box>
      <Box id="reviews">
        <PublicReviews />
      </Box>
      <Box id="doctors">
        <PublicDoctors />
      </Box>
    </div>
  );
};

export default Home;
