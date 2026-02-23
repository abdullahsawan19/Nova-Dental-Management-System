export const getFriendlyErrorMessage = (errorMsg) => {
  if (!errorMsg || typeof errorMsg !== "string")
    return "Something went wrong. Please try again.";

  const lowerError = errorMsg.toLowerCase();

  if (lowerError.includes("invalid email or password")) {
    return "Invalid email or password. Please check your credentials.";
  }
  if (lowerError.includes("account is deactivated")) {
    return "Your account is deactivated. Please contact support.";
  }
  if (lowerError.includes("please provide email and password")) {
    return "Please enter both email and password.";
  }

  if (
    lowerError.includes("email already exists") ||
    lowerError.includes(
      "duplicate key error collection: test.users index: email_1",
    )
  ) {
    return "This email is already registered. Please log in.";
  }
  if (
    lowerError.includes("phone number already exists") ||
    lowerError.includes(
      "duplicate key error collection: test.users index: phone_1",
    )
  ) {
    return "This phone number is already registered.";
  }
  if (
    lowerError.includes(
      "duplicate key error collection: test.users index: name_1",
    )
  ) {
    return "This name is already taken. Please choose another.";
  }

  if (lowerError.includes("passwords are not the same")) {
    return "Passwords do not match!";
  }

  if (
    lowerError.includes("password") &&
    (lowerError.includes("validator failed") || lowerError.includes("strong"))
  ) {
    return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 number.";
  }
  if (
    lowerError.includes("email") &&
    (lowerError.includes("validator failed") || lowerError.includes("invalid"))
  ) {
    return "Please provide a valid email address.";
  }
  if (
    lowerError.includes("shorter than the minimum allowed length") ||
    lowerError.includes("minlength")
  ) {
    return "Name must be at least 3 characters long.";
  }

  return errorMsg;
};
