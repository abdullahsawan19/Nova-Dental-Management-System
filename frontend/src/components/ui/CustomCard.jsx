import React from "react";
import {
  Card as MuiCard,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
} from "@mui/material";

const CustomCard = ({
  title,
  subheader,
  avatar,
  headerAction,

  media,
  mediaHeight = 200,
  mediaAlt = "Card image",

  content,
  children,

  actions,
  actionsSx = {},

  onClick,
  sx = {},
  elevation = 1,
  variant = "elevation",

  ...props
}) => {
  const InnerContent = (
    <>
      {(title || subheader || avatar || headerAction) && (
        <CardHeader
          avatar={avatar}
          action={headerAction}
          title={title}
          subheader={subheader}
          titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        />
      )}

      {media && (
        <CardMedia
          component="img"
          height={mediaHeight}
          image={media}
          alt={mediaAlt}
          sx={{ objectFit: "cover" }}
        />
      )}

      {(content || children) && (
        <CardContent>
          {content && (
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              {content}
            </Typography>
          )}
          {children}
        </CardContent>
      )}
    </>
  );

  return (
    <MuiCard
      sx={{
        borderRadius: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": onClick
          ? { transform: "translateY(-5px)", boxShadow: 6 }
          : {},
        ...sx,
      }}
      elevation={elevation}
      variant={variant}
      {...props}
    >
      {onClick ? (
        <CardActionArea onClick={onClick}>{InnerContent}</CardActionArea>
      ) : (
        InnerContent
      )}

      {actions && (
        <CardActions sx={{ p: 2, pt: 0, ...actionsSx }}>{actions}</CardActions>
      )}
    </MuiCard>
  );
};

export default CustomCard;
