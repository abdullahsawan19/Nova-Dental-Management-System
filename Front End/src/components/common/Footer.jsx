import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
  const { activeBranch } = useSelector((state) => state.branches || {});
  const { user } = useSelector((state) => state.auth || {});

  const lang = user?.preferredLanguage || "en";

  const getBranchName = () => {
    const val = activeBranch?.name;
    if (!val) return "ClinicPro";
    if (typeof val === "string") return val;
    if (val[lang]) return val[lang];
    if (val.en) return val.en;
    if (val.ar) return val.ar;
    return "ClinicPro";
  };

  const getWorkingDays = () => {
    if (!activeBranch?.workingDays || activeBranch.workingDays.length === 0)
      return "Everyday";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return activeBranch.workingDays.map((i) => days[i]).join(" • ");
  };

  const navLinks = [
    { title: "Services", path: "/#services" },
    { title: "Doctors", path: "/doctors" },
    { title: "Branches", path: "/branch" },
    { title: "FAQ", path: "/faq" },
    { title: "Book Appointment", path: "/appointment" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        pt: 3,
        pb: 2,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              fontWeight="900"
              color="primary.main"
              sx={{ textTransform: "capitalize", mb: 0.5 }}
            >
              {getBranchName()}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1, lineHeight: 1.4 }}
            >
              Providing the best healthcare services with modern technology.
            </Typography>
            <Box sx={{ ml: -1 }}>
              <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
                <FacebookIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
                <InstagramIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
                <TwitterIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="text.primary"
              mb={1}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {navLinks.map((link) => (
                <MuiLink
                  key={link.title}
                  component={Link}
                  to={link.path}
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.title}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="text.primary"
              mb={1}
            >
              Contact Us
            </Typography>
            <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon color="primary" sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  {activeBranch?.address || "123 Health St, Medical City"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon color="primary" sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  {activeBranch?.phones?.length > 0
                    ? activeBranch.phones.join(" / ")
                    : "+20 123 456 7890"}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="primary.main"
                sx={{ fontWeight: "bold", mt: 0.5 }}
              >
                Hours:{" "}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="span"
                >
                  {getWorkingDays()} ({activeBranch?.openTime || "09:00 AM"} -{" "}
                  {activeBranch?.closeTime || "10:00 PM"})
                </Typography>
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2, mb: 1, borderColor: "divider" }} />

        <Typography
          variant="caption"
          align="center"
          sx={{
            color: "text.disabled",
            display: "block",
          }}
        >
          © {new Date().getFullYear()} {getBranchName()}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
