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
        // 🌟 خلفية المربع اللي شايل الفورم كله
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
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
            bgcolor: "background.default",
            "& fieldset": { border: "none" },
            "& input": { color: "text.primary" },
          },
        }}
      />
      <IconButton
        type="submit"
        disabled={!message.trim() || isLoading}
        sx={{
          bgcolor:
            message.trim() && !isLoading
              ? "primary.main"
              : "action.disabledBackground",
          color: message.trim() && !isLoading ? "#fff" : "action.disabled",
          p: 1.5,
          "&:hover": {
            bgcolor:
              message.trim() && !isLoading
                ? "primary.dark"
                : "action.disabledBackground",
          },
          borderRadius: "50%",
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
