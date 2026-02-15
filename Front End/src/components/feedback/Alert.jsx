import { Snackbar, Alert as MuiAlert } from "@mui/material";

/**
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} message
 * @param {string} severity
 */
const CustomAlert = ({ open, onClose, message, severity = "success" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", borderRadius: "8px", fontWeight: "bold" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
