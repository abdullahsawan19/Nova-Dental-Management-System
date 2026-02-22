import {
  Form,
  useActionData,
  useNavigation,
  Link,
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
import { useSelector } from "react-redux";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Signup = () => {
  const { activeBranch } = useSelector((state) => state.branches || {});
  const branchName = activeBranch?.name;
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

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
        Create Account
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Join {branchName || "ClinicPro"} today and manage your health easily.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {typeof error === "string"
            ? error
            : "Signup failed, please check your data"}
        </Alert>
      )}

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Stack spacing={2.5}>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            required
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              required
            />
            <Input
              label="Confirm"
              type="password"
              name="passwordConfirm"
              placeholder="********"
              required
            />
          </Stack>
          <Input
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="01xxxxxxxxx"
            required
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            sx={{ py: 1.5, mt: 1, fontSize: "1rem" }}
          >
            {isSubmitting ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={20} color="inherit" />
                <span>Creating Account...</span>
              </Stack>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Stack>
      </Form>

      <Divider sx={{ my: 4, borderColor: "divider" }}>
        <Typography variant="caption" color="text.disabled">
          OR
        </Typography>
      </Divider>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Already have an account?{" "}
        <Link
          to={`/login?redirectTo=${redirectTo}`}
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login here
        </Link>
      </Typography>
    </Paper>
  );
};

export default Signup;
