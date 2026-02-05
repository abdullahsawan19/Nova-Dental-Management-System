import React from "react";
import { Form } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Signup = () => {
  return (
    <>
      <Form>
        <Input label="Name" type="text" name="name" placeholder="Your Name" />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
          // value={formData.password}
          // onChange={handleChange}
        />{" "}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="********"
          // value={formData.password}
          // onChange={handleChange}
        />
        <Input
          label="Phone Number"
          type="text"
          name="phone"
          placeholder="Your Phone Number"
        />
        <Button type="submit">Signup</Button>
      </Form>
    </>
  );
};

export default Signup;
