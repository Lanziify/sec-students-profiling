import { REG } from "./Regex";

export const Validation = {
  validateLogin: (values) => {
    const errorMessage = {};

    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!REG.email.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    }
    return errorMessage;
  },
  validateRegister: (values) => {
    const errorMessage = {};

    if (!values.displayName) {
      errorMessage.displayName = "Name is required";
    } else if (!REG.name.test(values.displayName)) {
      errorMessage.displayName = "Please enter your valid name";
    }
    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!REG.email.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    }
    return errorMessage;
  },
};
