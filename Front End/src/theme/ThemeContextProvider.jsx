import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "light",
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#2563eb", light: "#60a5fa", dark: "#1d4ed8" },
                background: { default: "#f8fafc", paper: "#ffffff" },
                text: { primary: "#0f172a", secondary: "#475569" },
                action: { hover: "rgba(37, 99, 235, 0.08)" },
              }
            : {
                primary: { main: "#3b82f6", light: "#93c5fd", dark: "#2563eb" },
                background: { default: "#0f172a", paper: "#1e293b" },
                text: { primary: "#f8fafc", secondary: "#94a3b8" },
                action: { hover: "rgba(255, 255, 255, 0.08)" },
              }),
        },
        typography: {
          fontFamily: '"Poppins", "Cairo", sans-serif',
          button: { textTransform: "none", fontWeight: 600 },
        },
        components: {
          MuiPopover: {
            defaultProps: {
              disableScrollLock: true,
            },
          },
          MuiDialog: {
            defaultProps: {
              disableScrollLock: true,
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: "all 0.4s ease-in-out",
                overflowY: "scroll !important",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: { transition: "all 0.4s ease-in-out" },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
