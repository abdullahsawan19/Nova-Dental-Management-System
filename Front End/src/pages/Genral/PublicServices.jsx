import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const PublicServices = () => {
  const { services } = useSelector((state) => state.services);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} md={4} key={service._id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`${import.meta.env.VITE_API_URL}/uploads/${service.image}`}
              alt={service.name}
            />
            <CardContent>
              {/* هنا الاسم جاي string جاهز حسب لغة اليوزر */}
              <Typography gutterBottom variant="h5" component="div">
                {service.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                {service.fees} EGP
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Book Now</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PublicServices;
