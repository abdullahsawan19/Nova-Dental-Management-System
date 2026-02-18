import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
  const { activeBranch } = useSelector((state) => state.branches);
  const branchName = activeBranch?.name;

  const features = [
    {
      icon: <MedicalServicesIcon fontSize="large" color="primary" />,
      title: "Advanced Technology",
      desc: "We use the latest dental equipment and techniques to ensure painless and effective treatments.",
    },
    {
      icon: <VerifiedUserIcon fontSize="large" color="primary" />,
      title: "Expert Doctors",
      desc: "Our team consists of highly qualified professionals with years of experience in dental care.",
    },
    {
      icon: <EmojiEmotionsIcon fontSize="large" color="primary" />,
      title: "Patient Comfort",
      desc: "Your comfort is our priority. We provide a relaxing environment to make your visit stress-free.",
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      title: "Flexible Hours",
      desc: "We offer convenient scheduling options, including evening and weekend appointments.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" mb={10}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="900"
              color="text.primary"
              gutterBottom
              sx={{
                fontSize: { xs: "2.2rem", md: "3rem" },
                letterSpacing: "-0.02em",
              }}
            >
              About{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {branchName}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              At {branchName}, we believe that a healthy smile is a beautiful
              smile. Founded with the vision of providing top-notch dental care,
              our clinic combines state-of-the-art technology with
              compassionate, personalized treatment.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              Whether you need a routine checkup, cosmetic dentistry, or complex
              oral surgery, our dedicated team is here to ensure you receive the
              highest standard of care in a comfortable environment.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Clinic Team"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: 6,
              }}
            />
          </Grid>
        </Grid>

        <Box mb={10} textAlign="center">
          <Typography
            variant="h4"
            fontWeight="800"
            color="text.primary"
            gutterBottom
          >
            Why Choose Us?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={6}>
            We are committed to delivering excellence in every smile.
          </Typography>

          <Grid container spacing={4} alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 4,
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 4,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                    mb={1}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.6}
                  >
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: "center",
            borderRadius: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "#fff",
            boxShadow: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready for a Brighter Smile?
          </Typography>
          <Typography
            variant="body1"
            sx={{ opacity: 0.9, mb: 4, maxWidth: "600px", mx: "auto" }}
          >
            Book your appointment today and let our expert team take care of
            your dental health.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/appointment")}
            sx={{
              bgcolor: "background.paper",
              color: "primary.main",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              textTransform: "none",
              "&:hover": {
                bgcolor: "background.default",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Book Appointment Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
