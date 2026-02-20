import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Container, Pagination } from "@mui/material";

import CustomCard from "../../components/ui/CustomCard";
import Button from "../../components/ui/Button";

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

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
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
              <CustomCard
                variant="outlined"
                mediaHeight={250}
                media={
                  doc.photo && doc.photo !== "Doctor.jfif"
                    ? `${import.meta.env.VITE_API_URL}/uploads/${doc.photo}`
                    : "/default-doctor.jpg"
                }
                mediaAlt={doc.user?.name || "Doctor"}
                sx={{
                  height: "450px",
                  width: "230px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  "& .MuiCardMedia-root": {
                    flexShrink: 0,
                    bgcolor: "action.hover",
                  },
                  "& .MuiCardContent-root": {
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    pb: 0,
                    width: "100%",
                    overflow: "hidden",
                    boxSizing: "border-box",
                  },
                }}
                actionsSx={{ width: "100%", p: 2, pt: 2 }}
                actions={
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/doctors/${doc._id}`)}
                    sx={{
                      height: "40px",
                      py: 0,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    View Details
                  </Button>
                }
              >
                <Box sx={{ width: "100%", overflow: "hidden", px: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    color="text.primary"
                    sx={{
                      mb: 0.5,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                    }}
                  >
                    Dr. {doc.user?.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight="bold"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {doc.specialization || "General Dentist"}
                  </Typography>
                </Box>
              </CustomCard>
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
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "text.primary",
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DoctorsPage;
