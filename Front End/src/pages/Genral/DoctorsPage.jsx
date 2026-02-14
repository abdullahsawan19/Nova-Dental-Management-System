import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Pagination,
} from "@mui/material";

const DoctorsPage = () => {
  const { doctors } = useSelector((state) => state.doctor || {});
  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const navigate = useNavigate();

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentDoctors = safeDoctors.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(safeDoctors.length / itemsPerPage);
  console.log(
    "Image URL:",
    `${import.meta.env.VITE_API_URL}/uploads/${currentDoctors[0]?.photo}`,
  );
  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight="800"
            gutterBottom
            color="text.primary"
          >
            Meet Our Doctors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Choose from our highly qualified and experienced team of dental
            professionals.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {currentDoctors.map((doc) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={doc._id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  height: "400px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "220px",
                    width: "100%",
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    image={
                      doc.photo && doc.photo !== "Doctor.jfif"
                        ? `${import.meta.env.VITE_API_URL}/uploads/${doc.photo}`
                        : "/default-doctor.jpg"
                    }
                    alt={doc.user?.name || "Doctor"}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    sx={{ mb: 0.5, lineHeight: 1.2 }}
                  >
                    Dr. {doc.user?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    {doc.specialization || "General Dentist"}
                  </Typography>

                  <Box sx={{ mt: "auto", width: "100%" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/doctors/${doc._id}`)}
                      sx={{
                        height: "40px",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          bgcolor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DoctorsPage;
