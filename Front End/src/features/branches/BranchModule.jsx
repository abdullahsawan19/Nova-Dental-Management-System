import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapIcon from "@mui/icons-material/Map";

const BranchModule = () => {
  const { activeBranch } = useSelector((state) => state.branches);

  const { user } = useSelector((state) => state.auth || {});
  const lang = user?.preferredLanguage || "en";

  const getName = () => {
    const val = activeBranch?.name;
    if (!val) return "Clinic Branch";
    if (typeof val === "string") return val;
    if (val[lang]) return val[lang];
    if (val.en) return val.en;
    if (val.ar) return val.ar;
    return "Clinic Branch";
  };

  const getAddress = () => {
    const val = activeBranch?.address;
    if (!val) return "No Address Available";
    if (typeof val === "string") return val;
    if (val[lang]) return val[lang];
    if (val.en) return val.en;
    if (val.ar) return val.ar;
    return "No Address Available";
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    return url.includes("embed") ? url : `${url}&output=embed`;
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0px 12px 24px -10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            flex: { xs: "none", md: 1.2 },
            height: { xs: 300, md: "auto" },
            position: "relative",
            bgcolor: "#f0f2f5",
            minHeight: "400px",
          }}
        >
          <iframe
            title="Branch Location"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "100%", filter: "grayscale(20%)" }}
            loading="lazy"
            allowFullScreen
            src={getEmbedUrl(activeBranch.locationUrl)}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<MapIcon />}
            href={activeBranch.locationUrl}
            target="_blank"
            sx={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: 50,
              textTransform: "none",
              px: 3,
              py: 1,
              boxShadow: 4,
              whiteSpace: "nowrap",
            }}
          >
            Open in Google Maps
          </Button>
        </Box>

        <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, bgcolor: "#fff" }}>
          <Stack spacing={4}>
            <Box>
              <Typography
                variant="h3"
                fontWeight="800"
                color="#1a1a1a"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
              >
                {getName()}
              </Typography>
              <Stack direction="row" alignItems="flex-start" gap={1}>
                <LocationOnIcon
                  fontSize="small"
                  sx={{ mt: 0.5, color: "primary.main" }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  lineHeight={1.6}
                >
                  {getAddress()}
                </Typography>
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccessTimeIcon color="action" /> Working Hours
              </Typography>
              <Box sx={{ pl: 4, borderLeft: "3px solid #eee", py: 1 }}>
                <Typography variant="h5" color="primary.main" fontWeight="bold">
                  {activeBranch.openTime} - {activeBranch.closeTime}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                    .filter((_, i) => activeBranch.workingDays?.includes(i))
                    .join(" • ")}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Contact Details
              </Typography>
              <Grid container spacing={2}>
                {activeBranch.phones?.map((phone, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        bgcolor: "#f9fafb",
                        border: "1px solid #eee",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        transition: "0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "#f0f7ff",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "white",
                          p: 1,
                          borderRadius: "50%",
                          boxShadow: 1,
                          display: "flex",
                        }}
                      >
                        <PhoneIcon color="primary" fontSize="small" />
                      </Box>
                      <Typography fontWeight="600" color="#333">
                        {phone}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}

                {activeBranch.email && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        bgcolor: "#f9fafb",
                        border: "1px solid #eee",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        transition: "0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "#f0f7ff",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "white",
                          p: 1,
                          borderRadius: "50%",
                          boxShadow: 1,
                          display: "flex",
                        }}
                      >
                        <EmailIcon color="primary" fontSize="small" />
                      </Box>
                      <Typography fontWeight="600" color="#333">
                        {activeBranch.email}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default BranchModule;
