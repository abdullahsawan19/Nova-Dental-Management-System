import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { getFriendlyErrorMessage } from "../../utils/errorHandler";

const Login = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const displayError = error ? getFriendlyErrorMessage(error) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 450,
        mx: "auto",
        p: { xs: 2, md: 3 },
        bgcolor: "background.paper",
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        mt: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="900"
        textAlign="center"
        gutterBottom
        color="text.primary"
      >
        Welcome Back
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Login to access your appointments and medical records.
      </Typography>

      {displayError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {displayError}
        </Alert>
      )}

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Stack spacing={3}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            required
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            sx={{ py: 1.5, fontSize: "1rem" }}
          >
            {isSubmitting ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={20} color="inherit" />
                <span>Signing in...</span>
              </Stack>
            ) : (
              "Login"
            )}
          </Button>
        </Stack>
      </Form>

      <Divider sx={{ my: 4, borderColor: "divider" }}>
        <Typography variant="caption" color="text.disabled">
          NEW HERE?
        </Typography>
      </Divider>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Don't have an account?{" "}
        <Link
          to={`/signup?redirectTo=${redirectTo}`}
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Create account
        </Link>
      </Typography>
    </Paper>
  );
};

export default Login;
