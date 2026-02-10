import { Form, useActionData, useFetcher } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AddDocForm() {
  //   const actionData = fetcher.data;

  const error = useActionData();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <Form method="post" className="form" replace>
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
          {isSubmitting ? "Adding..." : "Add Doctor"}
        </Button>{" "}
      </Form>
    </>
  );
}
