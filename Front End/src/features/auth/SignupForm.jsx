import {
  Form,
  useActionData,
  useNavigation,
  Link,
  useSearchParams,
} from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Signup = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <>
      <Form method="post" className="form" replace>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm mb-4">
            {typeof error === "string" ? error : "Signup failed"}
          </div>
        )}
        <Input label="Name" type="text" name="name" placeholder="Your Name" />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
        />{" "}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="********"
        />
        <Input
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          placeholder="********"
        />
        <Input
          label="Phone Number"
          type="text"
          name="phone"
          placeholder="Your Phone Number"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>{" "}
      </Form>
      <p className="mt-4 text-center text-sm text-gray-600">
        you have an account?{" "}
        <Link
          to={`/login?redirectTo=${redirectTo}`}
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default Signup;
