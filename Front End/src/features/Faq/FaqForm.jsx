import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { Box, TextField, Button, Stack, CircularProgress } from "@mui/material";

const FaqForm = ({ onSuccess }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      onSuccess();
    }
  }, [fetcher.state, fetcher.data, onSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("intent", "createFaq");
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2.5}>
        <TextField
          name="questionEn"
          label="Question (English)"
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          name="questionAr"
          label="السؤال (بالعربي)"
          required
          fullWidth
          variant="outlined"
          dir="rtl"
        />
        <TextField
          name="answerEn"
          label="Answer (English)"
          required
          fullWidth
          multiline
          rows={3}
          variant="outlined"
        />
        <TextField
          name="answerAr"
          label="الإجابة (بالعربي)"
          required
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          dir="rtl"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{ mt: 2, borderRadius: 2, fontWeight: "bold" }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save FAQ"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default FaqForm;
