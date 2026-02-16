import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 2,
        bgcolor: "#ffffff",
        borderTop: "1px solid #eee",
      }}
    >
      <TextField
        fullWidth
        placeholder="Type your message here... (e.g. Who is the best dentist?)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            bgcolor: "#f4f6f8",
            "& fieldset": { border: "none" },
          },
        }}
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim() || isLoading}
        sx={{
          bgcolor: message.trim() && !isLoading ? "primary.main" : "#e0e0e0",
          color: "#fff",
          p: 1.5,
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <SendIcon />
        )}
      </IconButton>
    </Box>
  );
};

export default ChatForm;
