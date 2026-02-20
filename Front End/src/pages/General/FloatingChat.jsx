import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Fab,
  IconButton,
  Slide,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import chatServices from "../../services/chatServices";
import ChatForm from "../../features/chat/chatForm";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI assistant for DentalCare Clinic. How can I help you today?",
    },
  ]);

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (userText) => {
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await chatServices.chatWithAI(userText, history);
      const aiReply = response.data.reply;

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: userText }] },
        { role: "model", parts: [{ text: aiReply }] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, connection issue. Try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 90,
            right: { xs: 10, md: 30 },
            width: { xs: "calc(100% - 20px)", sm: 380 },
            height: 500,
            maxHeight: "80vh",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: "#fff",
                  color: "primary.main",
                  width: 35,
                  height: 35,
                }}
              >
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  lineHeight={1.2}
                >
                  AI Assistant
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  DentalCare Clinic
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              sx={{ color: "#fff" }}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              bgcolor: "background.default",
            }}
          >
            {messages.map((msg, index) => {
              const isAi = msg.sender === "ai";
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isAi ? "flex-start" : "flex-end",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {isAi && (
                    <Avatar
                      sx={{ bgcolor: "primary.light", width: 28, height: 28 }}
                    >
                      <SmartToyIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      maxWidth: "75%",
                      bgcolor: isAi ? "background.paper" : "primary.main",
                      color: isAi ? "text.primary" : "#fff",
                      p: 1.5,
                      borderRadius: 2,
                      borderBottomLeftRadius: isAi ? 0 : 8,
                      borderBottomRightRadius: isAi ? 8 : 0,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            {isLoading && (
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Avatar
                  sx={{ bgcolor: "primary.light", width: 28, height: 28 }}
                >
                  <SmartToyIcon sx={{ fontSize: 16 }} />
                </Avatar>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Typing...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} style={{ height: "1px" }} />
          </Box>

          <ChatForm onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Paper>
      </Slide>

      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: 10, md: 30 },
          zIndex: 9999,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        {isOpen ? <CloseIcon /> : <ForumRoundedIcon />}
      </Fab>
    </>
  );
};

export default FloatingChat;
