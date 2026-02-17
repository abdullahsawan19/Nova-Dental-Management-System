import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const { publicFaqs, isLoading } = useSelector((state) => state.faq);

  return (
    <Box sx={{ py: 8, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight="900"
            color="primary"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Find answers to common questions about our clinic, services, and
            bookings.
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={50} />
          </Box>
        ) : publicFaqs?.length > 0 ? (
          publicFaqs.map((faq) => (
            <Accordion
              key={faq._id}
              sx={{
                mb: 2,
                borderRadius: "12px !important",
                "&:before": { display: "none" },
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                bgcolor: "background.paper",
                color: "text.primary",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" fontWeight="600" color="text.primary">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "action.hover",
                  borderTop: 1,
                  borderColor: "divider",
                  p: 3,
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No frequently asked questions available at the moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Faq;
