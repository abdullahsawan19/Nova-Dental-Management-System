import { Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export const DesktopNav = ({ navLinks, currentHash, handleNavClick, mode }) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: { md: 1.5, lg: 3 },
        justifyContent: "center",
        flexGrow: 1,
        px: 2,
      }}
    >
      {navLinks.map((link) => {
        const isLinkActive = (isActive) => {
          if (link.path.includes("#")) {
            const targetHash = link.path.split("/")[1];
            return location.pathname === "/" && currentHash === targetHash;
          }
          return isActive;
        };

        return (
          <NavLink
            key={link.title}
            to={link.path}
            onClick={(e) => {
              if (link.path.includes("#") && location.pathname === "/")
                e.preventDefault();
              handleNavClick(link.path);
            }}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isLinkActive(isActive)
                ? "#1976d2"
                : mode === "dark"
                  ? "#cbd5e1"
                  : "#555",
              fontWeight: isLinkActive(isActive) ? "700" : "500",
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "color 0.3s ease",
            })}
          >
            {link.title}
          </NavLink>
        );
      })}
    </Box>
  );
};
