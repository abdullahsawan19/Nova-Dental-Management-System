import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className="form" replace>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm mb-4">
            {typeof error === "string" ? error : "Login failed"}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="********"
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </Button>
      </Form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};
export default Login;
